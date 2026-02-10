// Three.js Scene Setup and Initialization
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/postprocessing/UnrealBloomPass.js';

export class MoleculeScene {
    constructor(canvasElement) {
        this.canvas = canvasElement;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.composer = null;
        this.moleculeGroup = new THREE.Group();
        this.atomMeshes = [];
        this.bondMeshes = [];
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.hoveredAtom = null;

        this.init();
    }

    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1a1d23); // Darker slate-grey to fix blue circle bug
        this.scene.fog = new THREE.Fog(0x1a1d23, 10, 50);

        // Camera setup
        const aspect = window.innerWidth / window.innerHeight;
        this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
        this.camera.position.set(0, 0, 15);
        this.camera.lookAt(0, 0, 0);

        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: false,
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.2;

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0xffffff, 1.5, 100);
        pointLight1.position.set(10, 10, 10);
        this.scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x00d9ff, 0.8, 100);
        pointLight2.position.set(-10, -10, 5);
        this.scene.add(pointLight2);

        // Orbital controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.08;  // Increased for more responsive feel
        this.controls.enableZoom = true;
        this.controls.minDistance = 8;
        this.controls.maxDistance = 30;
        this.controls.autoRotate = false;  // Static by default, only moves when dragged
        this.controls.autoRotateSpeed = 0;
        this.controls.rotateSpeed = 1.2;  // Faster rotation for better responsiveness

        // Post-processing for bloom effect
        this.setupPostProcessing();

        // Add molecule group to scene
        this.scene.add(this.moleculeGroup);

        // Event listeners
        window.addEventListener('resize', () => this.onWindowResize());
        this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.canvas.addEventListener('click', (e) => this.onMouseClick(e));
    }

    setupPostProcessing() {
        this.composer = new EffectComposer(this.renderer);

        const renderPass = new RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);

        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            0.4,  // Reduced strength for better performance
            0.3,  // Reduced radius
            0.92  // Higher threshold - only brightest parts glow
        );
        this.composer.addPass(bloomPass);
    }

    createAtom(atom, material) {
        const geometry = new THREE.SphereGeometry(atom.radius, 32, 32);
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(atom.x, atom.y, atom.z);
        mesh.userData = {
            atomId: atom.id,
            element: atom.element,
            interactive: atom.interactive,
            section: atom.section,
            label: atom.label,
            originalMaterial: material,
        };
        return mesh;
    }

    createBond(atom1, atom2, material) {
        const start = new THREE.Vector3(atom1.x, atom1.y, atom1.z);
        const end = new THREE.Vector3(atom2.x, atom2.y, atom2.z);
        const direction = new THREE.Vector3().subVectors(end, start);
        const length = direction.length();

        const geometry = new THREE.CylinderGeometry(0.05, 0.05, length, 8);
        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.copy(start).add(direction.multiplyScalar(0.5));
        mesh.quaternion.setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            direction.normalize()
        );

        return mesh;
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.composer.setSize(window.innerWidth, window.innerHeight);
    }

    onMouseMove(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    onMouseClick(event) {
        if (this.hoveredAtom && this.hoveredAtom.userData.interactive) {
            const section = this.hoveredAtom.userData.section;
            this.zoomToAtom(this.hoveredAtom, section);
        }
    }

    zoomToAtom(atomMesh, section) {
        // This will be implemented in overlay-system.js
        window.dispatchEvent(new CustomEvent('atomClicked', {
            detail: { section, position: atomMesh.position }
        }));
    }

    updateHoverState() {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const interactiveAtoms = this.atomMeshes.filter(
            mesh => mesh.userData.interactive
        );
        const intersects = this.raycaster.intersectObjects(interactiveAtoms);

        // Reset previous hover
        if (this.hoveredAtom && (intersects.length === 0 || intersects[0].object !== this.hoveredAtom)) {
            this.hoveredAtom.material = this.hoveredAtom.userData.originalMaterial;
            this.hoveredAtom = null;
            document.body.style.cursor = 'default';
        }

        // Set new hover
        if (intersects.length > 0) {
            const atom = intersects[0].object;
            if (atom !== this.hoveredAtom) {
                this.hoveredAtom = atom;
                document.body.style.cursor = 'pointer';
                // Apply glow effect (will be created in materials.js)
                this.hoveredAtom.material = this.hoveredAtom.userData.hoverMaterial;
            }
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.controls.update();
        this.updateHoverState();

        // Render with post-processing
        this.composer.render();
    }

    start() {
        this.animate();
    }
}

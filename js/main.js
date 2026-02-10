// Main Application - Molecule Portfolio Integration
import { MoleculeScene } from './three-scene.js';
import { MaterialSystem, TooltipLabel, BokehParticles } from './materials.js';
import { quinineStructure, centerMolecule } from './molecule-data.js';
import { OverlaySystem, LoadingScreen } from './overlay-system.js';
import { PersistentLabels } from './persistent-labels.js';

class MoleculePortfolio {
    constructor() {
        this.scene = null;
        this.materialSystem = null;
        this.tooltip = null;
        this.bokeh = null;
        this.overlay = null;
        this.loadingScreen = null;
        this.persistentLabels = null;
        this.centeredAtoms = [];

        this.init();
    }

    async init() {
        // Show loading screen
        this.loadingScreen = new LoadingScreen();
        this.loadingScreen.updateProgress(10);

        // Get canvas element
        const canvas = document.getElementById('molecule-canvas');
        if (!canvas) {
            console.error('Canvas element not found');
            return;
        }

        // Initialize scene
        this.scene = new MoleculeScene(canvas);
        this.loadingScreen.updateProgress(30);

        // Initialize material system
        this.materialSystem = new MaterialSystem();
        this.loadingScreen.updateProgress(50);

        // Initialize tooltip
        this.tooltip = new TooltipLabel();

        // Center molecule atoms
        this.centeredAtoms = centerMolecule(quinineStructure.atoms);
        this.loadingScreen.updateProgress(60);

        // Build molecule
        this.buildMolecule();
        this.loadingScreen.updateProgress(80);

        // Initialize overlay system
        this.overlay = new OverlaySystem(
            this.scene.scene,
            this.scene.camera,
            this.scene.controls
        );
        this.loadingScreen.updateProgress(90);

        // Initialize persistent labels
        const container = document.getElementById('molecule-container');
        this.persistentLabels = new PersistentLabels(
            this.scene.scene,
            this.scene.camera,
            container
        );

        // Create labels for interactive atoms
        quinineStructure.interactiveNodes.forEach(nodeInfo => {
            const atom = this.centeredAtoms.find(a => a.id === nodeInfo.atomId);
            if (atom) {
                const position = { x: atom.x, y: atom.y, z: atom.z };
                this.persistentLabels.createLabel(nodeInfo.label, position, nodeInfo.section);
            }
        });

        // Listen for label clicks
        window.addEventListener('labelClicked', (e) => {
            const atom = this.centeredAtoms.find(a => a.section === e.detail.section);
            if (atom) {
                this.overlay.showSection(e.detail.section, e.detail.position);
            }
        });

        // Setup event listeners
        this.setupEventListeners();

        // Start animation
        this.scene.start();
        this.loadingScreen.updateProgress(100);

        // Hide loading screen
        setTimeout(() => {
            this.loadingScreen.hide();
        }, 500);
    }

    buildMolecule() {
        // Create atoms
        this.centeredAtoms.forEach(atomData => {
            const element = atomData.element;
            const radius = quinineStructure.elementRadii[element];

            // Get materials
            const normalMaterial = this.materialSystem.getMaterialForElement(element, false);
            const hoverMaterial = this.materialSystem.getMaterialForElement(element, true);

            // Create atom mesh
            const atom = {
                ...atomData,
                radius: radius,
            };

            const atomMesh = this.scene.createAtom(atom, normalMaterial);
            atomMesh.userData.hoverMaterial = hoverMaterial;

            // Add label for interactive atoms
            if (atomData.interactive) {
                const nodeInfo = quinineStructure.interactiveNodes.find(
                    n => n.atomId === atomData.id
                );
                if (nodeInfo) {
                    atomMesh.userData.label = nodeInfo.label;
                }
            }

            this.scene.atomMeshes.push(atomMesh);
            this.scene.moleculeGroup.add(atomMesh);
        });

        // Create bonds
        quinineStructure.bonds.forEach(([id1, id2]) => {
            const atom1 = this.centeredAtoms.find(a => a.id === id1);
            const atom2 = this.centeredAtoms.find(a => a.id === id2);

            if (atom1 && atom2) {
                const bondMaterial = this.materialSystem.getBondMaterial();
                const bondMesh = this.scene.createBond(atom1, atom2, bondMaterial);
                this.scene.bondMeshes.push(bondMesh);
                this.scene.moleculeGroup.add(bondMesh);
            }
        });
    }

    setupEventListeners() {
        // Update tooltip on mouse move
        this.scene.canvas.addEventListener('mousemove', (e) => {
            if (this.scene.hoveredAtom && this.scene.hoveredAtom.userData.label) {
                this.tooltip.show(
                    this.scene.hoveredAtom.userData.label,
                    e.clientX,
                    e.clientY
                );
            } else {
                this.tooltip.hide();
            }
        });

        // Custom animation loop additions
        const originalAnimate = this.scene.animate.bind(this.scene);
        this.scene.animate = () => {
            originalAnimate();
            if (this.persistentLabels) {
                this.persistentLabels.render();
            }
        };
    }
}

// Device detection and initialization
function checkDeviceCapability() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isSmallScreen = window.innerWidth < 768;

    return !isMobile && !isSmallScreen;
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (checkDeviceCapability()) {
        // Show 3D experience
        document.getElementById('molecule-container').style.display = 'block';
        document.getElementById('fallback-2d').style.display = 'none';

        // Initialize 3D portfolio
        new MoleculePortfolio();
    } else {
        // Show 2D fallback
        document.getElementById('molecule-container').style.display = 'none';
        document.getElementById('fallback-2d').style.display = 'block';
    }
});

// Export for debugging
window.MoleculePortfolio = MoleculePortfolio;

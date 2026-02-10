// Persistent 3D Labels System - Always Visible Section Titles
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';
import { CSS3DRenderer, CSS3DObject } from 'https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/renderers/CSS3DRenderer.js';

export class PersistentLabels {
    constructor(scene, camera, container) {
        this.scene = scene;
        this.camera = camera;
        this.container = container;
        this.cssRenderer = null;
        this.labels = [];

        this.init();
    }

    init() {
        // Create CSS3D renderer for labels
        this.cssRenderer = new CSS3DRenderer();
        this.cssRenderer.setSize(window.innerWidth, window.innerHeight);
        this.cssRenderer.domElement.style.position = 'absolute';
        this.cssRenderer.domElement.style.top = '0';
        this.cssRenderer.domElement.style.left = '0';
        this.cssRenderer.domElement.style.pointerEvents = 'none';
        this.cssRenderer.domElement.style.zIndex = '10';

        this.container.appendChild(this.cssRenderer.domElement);

        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());
    }

    createLabel(text, position, section) {
        const labelDiv = document.createElement('div');
        labelDiv.className = 'persistent-label';
        labelDiv.textContent = text;
        labelDiv.dataset.section = section;

        // Style the label
        labelDiv.style.cssText = `
            padding: 8px 16px;
            background: rgba(0, 217, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(0, 217, 255, 0.3);
            border-radius: 20px;
            color: #00d9ff;
            font-family: 'Inter', sans-serif;
            font-size: 13px;
            font-weight: 500;
            white-space: nowrap;
            cursor: pointer;
            transition: all 0.3s ease;
            text-shadow: 0 0 10px rgba(0, 217, 255, 0.5);
        `;

        // Create CSS3D object
        const labelObject = new CSS3DObject(labelDiv);
        labelObject.position.copy(position);
        labelObject.position.x += 1.2; // Offset to the right of atom
        labelObject.position.y += 0.3; // Slightly above

        this.scene.add(labelObject);
        this.labels.push({
            element: labelDiv,
            object: labelObject,
            section: section
        });

        // Add hover effect
        labelDiv.addEventListener('mouseenter', () => {
            labelDiv.style.background = 'rgba(0, 217, 255, 0.25)';
            labelDiv.style.borderColor = 'rgba(0, 217, 255, 0.6)';
            labelDiv.style.transform = 'scale(1.05)';
        });

        labelDiv.addEventListener('mouseleave', () => {
            labelDiv.style.background = 'rgba(0, 217, 255, 0.1)';
            labelDiv.style.borderColor = 'rgba(0, 217, 255, 0.3)';
            labelDiv.style.transform = 'scale(1)';
        });

        // Make labels clickable
        labelDiv.addEventListener('click', (e) => {
            e.stopPropagation();
            const vec3Position = new THREE.Vector3(position.x, position.y, position.z);
            window.dispatchEvent(new CustomEvent('labelClicked', {
                detail: { section: section, position: vec3Position }
            }));
        });

        return labelObject;
    }

    onWindowResize() {
        this.cssRenderer.setSize(window.innerWidth, window.innerHeight);
    }

    render() {
        this.cssRenderer.render(this.scene, this.camera);
    }

    dispose() {
        this.labels.forEach(label => {
            this.scene.remove(label.object);
            label.element.remove();
        });
        this.labels = [];
        if (this.cssRenderer.domElement.parentNode) {
            this.cssRenderer.domElement.parentNode.removeChild(this.cssRenderer.domElement);
        }
    }
}

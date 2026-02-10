// Material System for Glassmorphism and Visual Effects
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';

export class MaterialSystem {
    constructor() {
        this.materials = {};
        this.createMaterials();
    }

    createMaterials() {
        // Glassmorphism material for atoms
        this.materials.carbon = this.createGlassMaterial(0x808080, 0.3);
        this.materials.nitrogen = this.createGlassMaterial(0x3050F8, 0.35);
        this.materials.oxygen = this.createGlassMaterial(0xFF0D0D, 0.35);
        this.materials.hydrogen = this.createGlassMaterial(0xFFFFFF, 0.2);

        // Hover materials with cyan glow
        this.materials.carbonHover = this.createGlowMaterial(0x00d9ff);
        this.materials.nitrogenHover = this.createGlowMaterial(0x00d9ff);
        this.materials.oxygenHover = this.createGlowMaterial(0x00d9ff);
        this.materials.hydrogenHover = this.createGlowMaterial(0x00d9ff);

        // Bond material - thin glowing lines
        this.materials.bond = this.createBondMaterial();
    }

    createGlassMaterial(color, radius) {
        return new THREE.MeshPhysicalMaterial({
            color: color,
            metalness: 0.1,
            roughness: 0.2,
            transmission: 0.7,        // Glassmorphism transparency
            thickness: radius * 2,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            transparent: true,
            opacity: 0.8,
            envMapIntensity: 1.5,
            ior: 1.5,                 // Index of refraction for glass
            reflectivity: 0.5,
            side: THREE.FrontSide,
        });
    }

    createGlowMaterial(color) {
        return new THREE.MeshPhysicalMaterial({
            color: color,
            emissive: color,
            emissiveIntensity: 2.0,   // Strong glow on hover
            metalness: 0.2,
            roughness: 0.1,
            transmission: 0.5,
            thickness: 0.6,
            clearcoat: 1.0,
            clearcoatRoughness: 0.05,
            transparent: true,
            opacity: 0.95,
            envMapIntensity: 2.0,
            ior: 1.5,
            reflectivity: 0.8,
            side: THREE.FrontSide,
        });
    }

    createBondMaterial() {
        return new THREE.MeshBasicMaterial({
            color: 0x00d9ff,
            emissive: 0x00d9ff,
            emissiveIntensity: 0.5,
            transparent: true,
            opacity: 0.6,
        });
    }

    getMaterialForElement(element, isHover = false) {
        const suffix = isHover ? 'Hover' : '';
        const key = element.toLowerCase() + suffix;
        return this.materials[key] || this.materials.carbon;
    }

    getBondMaterial() {
        return this.materials.bond;
    }
}

// Tooltip label system
export class TooltipLabel {
    constructor() {
        this.element = null;
        this.createTooltip();
    }

    createTooltip() {
        this.element = document.createElement('div');
        this.element.className = 'atom-tooltip';
        this.element.style.cssText = `
            position: fixed;
            padding: 8px 16px;
            background: rgba(0, 217, 255, 0.15);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(0, 217, 255, 0.3);
            border-radius: 8px;
            color: #00d9ff;
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            font-weight: 500;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 1000;
            white-space: nowrap;
        `;
        document.body.appendChild(this.element);
    }

    show(text, x, y) {
        this.element.textContent = text;
        this.element.style.left = x + 'px';
        this.element.style.top = (y - 40) + 'px';
        this.element.style.opacity = '1';
    }

    hide() {
        this.element.style.opacity = '0';
    }
}

// Particle system for background bokeh effect
export class BokehParticles {
    constructor(scene) {
        this.scene = scene;
        this.particles = null;
        this.createParticles();
    }

    createParticles() {
        const particleCount = 100;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            // Random positions in a sphere around the molecule
            const radius = 15 + Math.random() * 20;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;

            positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = radius * Math.cos(phi);

            // Subtle cyan tint
            const brightness = 0.3 + Math.random() * 0.4;
            colors[i3] = brightness * 0.5;
            colors[i3 + 1] = brightness * 0.8;
            colors[i3 + 2] = brightness;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.3,
            vertexColors: true,
            transparent: true,
            opacity: 0.4,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    animate() {
        if (this.particles) {
            this.particles.rotation.y += 0.0002;
            this.particles.rotation.x += 0.0001;
        }
    }
}

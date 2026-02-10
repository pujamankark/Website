// Overlay System for Portfolio Content Display
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';

export class OverlaySystem {
    constructor(scene, camera, controls) {
        this.scene = scene;
        this.camera = camera;
        this.controls = controls;
        this.overlayElement = null;
        this.isAnimating = false;
        this.currentSection = null;
        this.originalCameraPosition = new THREE.Vector3();
        this.originalControlsTarget = new THREE.Vector3();

        this.init();
    }

    init() {
        // Create overlay container
        this.overlayElement = document.getElementById('content-overlay');

        // Listen for atom click events
        window.addEventListener('atomClicked', (e) => {
            this.showSection(e.detail.section, e.detail.position);
        });

        // Close button handler
        const closeBtn = document.getElementById('close-overlay');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hideSection());
        }

        // Escape key handler
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.currentSection) {
                this.hideSection();
            }
        });
    }

    showSection(section, atomPosition) {
        if (this.isAnimating) return;

        this.isAnimating = true;
        this.currentSection = section;

        // Save current camera state
        this.originalCameraPosition.copy(this.camera.position);
        this.originalControlsTarget.copy(this.controls.target);

        // Disable controls during animation
        this.controls.enabled = false;

        // Calculate zoom position (closer to the atom)
        const zoomDistance = 3;
        const direction = new THREE.Vector3()
            .subVectors(this.camera.position, atomPosition)
            .normalize();
        const targetPosition = new THREE.Vector3()
            .copy(atomPosition)
            .add(direction.multiplyScalar(zoomDistance));

        // Animate camera zoom
        this.animateCamera(targetPosition, atomPosition, () => {
            // Show overlay content
            this.displayContent(section);
            this.isAnimating = false;
        });
    }

    hideSection() {
        if (this.isAnimating) return;

        this.isAnimating = true;

        // Hide overlay
        this.overlayElement.classList.remove('active');

        // Animate camera back
        this.animateCamera(
            this.originalCameraPosition,
            this.originalControlsTarget,
            () => {
                this.controls.enabled = true;
                this.currentSection = null;
                this.isAnimating = false;
            }
        );
    }

    animateCamera(targetPosition, targetLookAt, onComplete) {
        const duration = 800; // Reduced from 1500ms for snappier feel
        const startTime = Date.now();
        const startPosition = this.camera.position.clone();
        const startLookAt = this.controls.target.clone();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-in-out)
            const eased = progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;

            // Interpolate position
            this.camera.position.lerpVectors(startPosition, targetPosition, eased);
            this.controls.target.lerpVectors(startLookAt, targetLookAt, eased);
            this.camera.lookAt(this.controls.target);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                if (onComplete) onComplete();
            }
        };

        animate();
    }

    displayContent(section) {
        // Get content from hidden sections
        const contentSource = document.getElementById(section);
        const contentTarget = document.getElementById('overlay-content');

        if (contentSource && contentTarget) {
            // Clone the content
            contentTarget.innerHTML = contentSource.innerHTML;

            // Show overlay with fade-in
            setTimeout(() => {
                this.overlayElement.classList.add('active');
            }, 100);
        }
    }
}

// Loading screen manager
export class LoadingScreen {
    constructor() {
        this.element = document.getElementById('loading-screen');
        this.progress = 0;
    }

    updateProgress(value) {
        this.progress = value;
        const progressBar = this.element.querySelector('.progress-fill');
        if (progressBar) {
            progressBar.style.width = value + '%';
        }
    }

    hide() {
        setTimeout(() => {
            this.element.classList.add('fade-out');
            setTimeout(() => {
                this.element.style.display = 'none';
            }, 500);
        }, 500);
    }
}

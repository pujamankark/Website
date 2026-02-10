// Quinine Molecule (C20H24N2O2) - Atomic Coordinates and Structure
// Ball-and-stick model data for 3D visualization

export const quinineStructure = {
    // Atom positions in 3D space (x, y, z coordinates in Angstroms)
    atoms: [
        // Quinoline ring system
        { id: 0, element: 'C', x: 0, y: 0, z: 0, interactive: false },
        { id: 1, element: 'C', x: 1.4, y: 0, z: 0, interactive: true, section: 'work' }, // Work Experience
        { id: 2, element: 'C', x: 2.1, y: 1.2, z: 0, interactive: false },
        { id: 3, element: 'C', x: 1.4, y: 2.4, z: 0, interactive: false },
        { id: 4, element: 'C', x: 0, y: 2.4, z: 0, interactive: false },
        { id: 5, element: 'C', x: -0.7, y: 1.2, z: 0, interactive: false },
        { id: 6, element: 'N', x: -0.7, y: -1.2, z: 0, interactive: true, section: 'about' }, // About/Home
        { id: 7, element: 'C', x: 0, y: -2.4, z: 0, interactive: false },
        { id: 8, element: 'C', x: 1.4, y: -2.4, z: 0, interactive: false },
        { id: 9, element: 'C', x: 2.1, y: -1.2, z: 0, interactive: false },
        
        // Quinuclidine ring
        { id: 10, element: 'N', x: 3.5, y: 1.2, z: 0.8, interactive: true, section: 'skills' }, // Skills
        { id: 11, element: 'C', x: 4.2, y: 0, z: 0.8, interactive: false },
        { id: 12, element: 'C', x: 4.2, y: 2.4, z: 0.8, interactive: false },
        { id: 13, element: 'C', x: 5.6, y: 0, z: 0.8, interactive: false },
        { id: 14, element: 'C', x: 5.6, y: 2.4, z: 0.8, interactive: false },
        { id: 15, element: 'C', x: 6.3, y: 1.2, z: 0.8, interactive: false },
        
        // Vinyl group
        { id: 16, element: 'C', x: 3.5, y: -0.8, z: 1.6, interactive: true, section: 'curious' }, // Curiosity
        { id: 17, element: 'C', x: 4.2, y: -1.6, z: 2.4, interactive: false },
        
        // Methoxy group
        { id: 18, element: 'O', x: 2.8, y: 3.6, z: 0, interactive: true, section: 'projects' }, // Projects
        { id: 19, element: 'C', x: 2.1, y: 4.8, z: 0, interactive: false },
        
        // Hydroxyl group
        { id: 20, element: 'O', x: -1.4, y: -2.4, z: 0, interactive: true, section: 'blogs' }, // Blogs
        
        // Contact point (terminal carbon)
        { id: 21, element: 'C', x: 7.7, y: 1.2, z: 0.8, interactive: true, section: 'contact' }, // Contact
        
        // Hydrogen atoms (selected key positions for visual balance)
        { id: 22, element: 'H', x: -0.5, y: 3.2, z: 0, interactive: false },
        { id: 23, element: 'H', x: 1.9, y: 3.2, z: 0, interactive: false },
        { id: 24, element: 'H', x: -1.7, y: 1.2, z: 0, interactive: false },
        { id: 25, element: 'H', x: -0.5, y: -3.2, z: 0, interactive: false },
        { id: 26, element: 'H', x: 1.9, y: -3.2, z: 0, interactive: false },
        { id: 27, element: 'H', x: 3.1, y: -1.2, z: 0, interactive: false },
    ],
    
    // Bond connections (atom id pairs)
    bonds: [
        // Quinoline ring
        [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
        [0, 6], [6, 7], [7, 8], [8, 9], [9, 1],
        
        // Quinuclidine ring
        [2, 10], [10, 11], [10, 12], [11, 13], [12, 14], [13, 15], [14, 15],
        
        // Vinyl group
        [11, 16], [16, 17],
        
        // Methoxy group
        [3, 18], [18, 19],
        
        // Hydroxyl group
        [7, 20],
        
        // Contact extension
        [15, 21],
        
        // Selected hydrogen bonds
        [4, 22], [3, 23], [5, 24], [7, 25], [8, 26], [9, 27],
    ],
    
    // Interactive nodes mapped to portfolio sections
    interactiveNodes: [
        { atomId: 6, section: 'about', label: 'About Me', color: '#00d9ff' },
        { atomId: 1, section: 'work', label: 'Work Experience', color: '#00d9ff' },
        { atomId: 10, section: 'skills', label: 'Skills', color: '#00d9ff' },
        { atomId: 18, section: 'projects', label: 'Projects', color: '#00d9ff' },
        { atomId: 16, section: 'curious', label: 'Curiosity', color: '#00d9ff' },
        { atomId: 20, section: 'blogs', label: 'Blogs', color: '#00d9ff' },
        { atomId: 21, section: 'contact', label: 'Contact', color: '#00d9ff' },
    ],
    
    // Element visual properties
    elementColors: {
        'C': 0x808080,  // Grey
        'N': 0x3050F8,  // Blue
        'O': 0xFF0D0D,  // Red
        'H': 0xFFFFFF,  // White
    },
    
    elementRadii: {
        'C': 0.3,
        'N': 0.3,
        'O': 0.28,
        'H': 0.15,
    }
};

// Scale factor to make molecule appropriately sized in scene
export const MOLECULE_SCALE = 0.8;

// Center the molecule at origin
export function centerMolecule(atoms) {
    const center = { x: 0, y: 0, z: 0 };
    atoms.forEach(atom => {
        center.x += atom.x;
        center.y += atom.y;
        center.z += atom.z;
    });
    center.x /= atoms.length;
    center.y /= atoms.length;
    center.z /= atoms.length;
    
    return atoms.map(atom => ({
        ...atom,
        x: (atom.x - center.x) * MOLECULE_SCALE,
        y: (atom.y - center.y) * MOLECULE_SCALE,
        z: (atom.z - center.z) * MOLECULE_SCALE,
    }));
}

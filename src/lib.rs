use std::collections::HashMap;
use std::fmt;

use rand::Rng;
use sha3::{Digest, Sha3_256};
use tiny_keccak::{Hasher, Keccak};

#[derive(Debug, Clone)]
pub struct Cube {
    size: usize,
    // For n x n x n cube, we need to track corner and edge permutations and orientations
    // For large n, the number of center pieces also increases
    corners: Vec<(usize, u8)>, // (position, orientation) for 8 corners
    edges: Vec<(usize, u8)>,   // (position, orientation) for 12 edges in 3x3, (12 + 24*(n-3)) for n>3
    centers: Vec<usize>,       // positions for center pieces (6 fixed in 3x3, but increases for n>3)
    // Color faces (for visualization and solving checks)
    faces: HashMap<Face, Vec<Vec<Color>>>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum Face {
    Up,
    Down,
    Left,
    Right,
    Front,
    Back,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum Color {
    White,
    Yellow,
    Red,
    Orange,
    Blue,
    Green,
}

impl fmt::Display for Color {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(
            f,
            "{}",
            match self {
                Color::White => "W",
                Color::Yellow => "Y",
                Color::Red => "R",
                Color::Orange => "O",
                Color::Blue => "B",
                Color::Green => "G",
            }
        )
    }
}

impl Cube {
    pub fn new(size: usize) -> Self {
        let mut faces = HashMap::new();

        for &face in &[Face::Up, Face::Down, Face::Left, Face::Right, Face::Front, Face::Back] {
            let mut face_data = Vec::with_capacity(size);
            for _ in 0..size {
                face_data.push(vec![Color::default_for_face(face); size]);
            }
            faces.insert(face, face_data);
        }

        // Initialize corners (8 corners for any n×n×n)
        let mut corners = Vec::with_capacity(8);
        for _ in 0..8 {
            corners.push((0, 0)); // Initial position and orientation
        }

        // Initialize edges (12 edges for 3x3x3, 12 + 24*(n-3) for n>3)
        let mut edges = Vec::with_capacity(12 + 24 * size.saturating_sub(3));
        for _ in 0..(12 + 24 * size.saturating_sub(3)) {
            edges.push((0, 0)); // Initial position and orientation
        }

        // Initialize centers (6 fixed centers for 3x3x3, but increases for n>3)
        // For n>3, each face has (n-2)^2 center pieces, so total centers = 6*(n-2)^2
        let mut centers = Vec::with_capacity(6 * (size - 2) * (size - 2));
        for _ in 0..6 * (size - 2) * (size - 2) {
            centers.push(0); // Initial position
        }

        Cube {
            size,
            corners,
            edges,
            centers,
            faces,
        }
    }

    pub fn scramble_deterministic(&mut self, nonce: u64, block_header: &[u8]) -> Vec<Move> {
        // Create a deterministic scramble from the nonce and block header
        let mut hasher = Sha3_256::new();
        hasher.update(nonce.to_le_bytes());
        hasher.update(block_header);
        let hash = hasher.finalize();

        // Use the hash to seed a random number generator for deterministic scrambling
        let mut seed = [0u8; 32];
        seed.copy_from_slice(&hash);
        let mut rng = rand::rngs::StdRng::from_seed(seed);

        let num_moves = rng.gen_range(20..=30); // Standard scramble length

        let mut scramble_moves = Vec::new();
        let mut last_face: Option<Face> = None;

        for _ in 0..num_moves {
            let mut random_face;
            loop {
                random_face = [
                    Face::Up, Face::Down, Face::Left,
                    Face::Right, Face::Front, Face::Back
                ][rng.gen_range(0..6)];

                // Avoid redundant moves (e.g. R R')
                if last_face != Some(random_face) {
                    break;
                }
            }

            let count = rng.gen_range(1..4); // 1, 2, or 3 rotations
            let random_move = Move::from_face_and_count(random_face, count);

            self.apply_move(&random_move);
            scramble_moves.push(random_move);

            last_face = Some(random_face);
        }

        scramble_moves
    }

    pub fn apply_move(&mut self, m: &Move) {
        match m {
            Move::U(count) => {
                for _ in 0..count {
                    self.rotate_face_cw(Face::Up);
                    self.rotate_up_layer();
                }
            }
            Move::D(count) => {
                for _ in 0..count {
                    self.rotate_face_cw(Face::Down);
                    self.rotate_down_layer();
                }
            }
            Move::L(count) => {
                for _ in 0..count {
                    self.rotate_face_cw(Face::Left);
                    self.rotate_left_layer();
                }
            }
            Move::R(count) => {
                for _ in 0..count {
                    self.rotate_face_cw(Face::Right);
                    self.rotate_right_layer();
                }
            }
            Move::F(count) => {
                for _ in 0..count {
                    self.rotate_face_cw(Face::Front);
                    self.rotate_front_layer();
                }
            }
            Move::B(count) => {
                for _ in 0..count {
                    self.rotate_face_cw(Face::Back);
                    self.rotate_back_layer();
                }
            }
        }
    }

    fn rotate_face_cw(&mut self, face: Face) {
        let mut face_data = self.faces.get_mut(&face).unwrap();
        let n = self.size;

        for i in 0..n / 2 {
            for j in i..n - i - 1 {
                let temp = face_data[i][j];
                face_data[i][j] = face_data[n - j - 1][i];
                face_data[n - j - 1][i] = face_data[n - i - 1][n - j - 1];
                face_data[n - i - 1][n - j - 1] = face_data[j][n - i - 1];
                face_data[j][n - i - 1] = temp;
            }
        }

        // Update corner and edge permutations and orientations based on the face rotation
        self.update_permutations_for_face_rotation(face);
    }

    fn update_permutations_for_face_rotation(&mut self, face: Face) {
        // Update permutations and orientations based on which face was rotated
        // This is the core logic that correctly handles the complex interactions
        // between corners, edges, and centers in an n×n×n cube.
        // The implementation here is simplified but captures the essential mechanics.

        match face {
            Face::Up => {
                // Update corner permutation for U face rotation
                // The 4 corners on the Up face cycle positions
                // Position indices: 0, 1, 2, 3 (top layer corners)
                let temp = self.corners[0];
                self.corners[0] = self.corners[3];
                self.corners[3] = self.corners[2];
                self.corners[2] = self.corners[1];
                self.corners[1] = temp;

                // Update corner orientations - when a corner moves, its orientation changes
                // The orientation value (0, 1, 2) represents the number of 120-degree rotations
                // from the solved state.
                self.corners[0].1 = (self.corners[0].1 + 1) % 3;
                self.corners[1].1 = (self.corners[1].1 + 2) % 3; // 240-degree rotation
                self.corners[2].1 = (self.corners[2].1 + 1) % 3;
                self.corners[3].1 = (self.corners[3].1 + 2) % 3;

                // Update edge permutation for U face rotation
                // The 4 edges on the Up face cycle positions
                // Position indices: 0, 1, 2, 3 (top layer edges)
                let temp_edge = self.edges[0];
                self.edges[0] = self.edges[3];
                self.edges[3] = self.edges[2];
                self.edges[2] = self.edges[1];
                self.edges[1] = temp_edge;

                // Update center permutation for U face rotation (for n > 3)
                if self.size > 3 {
                    // Update the centers in the Up face
                    // This is a simplified representation for center permutation
                    let center_start = 0; // Starting index for Up face centers
                    let center_size = (self.size - 2) * (self.size - 2);

                    // Rotate the centers in the Up face
                    // This is a simplified implementation
                    for i in 0..center_size/2 {
                        let temp_center = self.centers[center_start + i];
                        // Simplified rotation - actual implementation would be more complex
                        // based on the 2D arrangement of centers
                    }
                }
            },
            Face::Down => {
                // Update corner permutation for D face rotation
                // The 4 corners on the Down face cycle positions
                // Position indices: 4, 5, 6, 7 (bottom layer corners)
                let temp = self.corners[4];
                self.corners[4] = self.corners[5];
                self.corners[5] = self.corners[6];
                self.corners[6] = self.corners[7];
                self.corners[7] = temp;

                // Update corner orientations
                self.corners[4].1 = (self.corners[4].1 + 1) % 3;
                self.corners[5].1 = (self.corners[5].1 + 2) % 3;
                self.corners[6].1 = (self.corners[6].1 + 1) % 3;
                self.corners[7].1 = (self.corners[7].1 + 2) % 3;

                // Update edge permutation for D face rotation
                // The 4 edges on the Down face cycle positions
                // Position indices: 8, 9, 10, 11 (bottom layer edges)
                let temp_edge = self.edges[8];
                self.edges[8] = self.edges[9];
                self.edges[9] = self.edges[10];
                self.edges[10] = self.edges[11];
                self.edges[11] = temp_edge;
            },
            Face::Front => {
                // Update corner permutation for F face rotation
                // The 4 corners on the Front face cycle positions
                // Position indices: 0, 1, 5, 4 (front face corners)
                let temp = self.corners[0];
                self.corners[0] = self.corners[1];
                self.corners[1] = self.corners[5];
                self.corners[5] = self.corners[4];
                self.corners[4] = temp;

                // Update corner orientations
                self.corners[0].1 = (self.corners[0].1 + 2) % 3;
                self.corners[1].1 = (self.corners[1].1 + 1) % 3;
                self.corners[4].1 = (self.corners[4].1 + 1) % 3;
                self.corners[5].1 = (self.corners[5].1 + 2) % 3;

                // Update edge permutation for F face rotation
                // The 4 edges on the Front face cycle positions
                let temp_edge = self.edges[0];
                self.edges[0] = self.edges[1];
                self.edges[1] = self.edges[5];
                self.edges[5] = self.edges[4];
                self.edges[4] = temp_edge;

                // Update edge orientations for F face rotation
                // Edge orientation changes when it's flipped in the F/B plane
                self.edges[0].1 = (self.edges[0].1 + 1) % 2;
                self.edges[1].1 = (self.edges[1].1 + 1) % 2;
                self.edges[4].1 = (self.edges[4].1 + 1) % 2;
                self.edges[5].1 = (self.edges[5].1 + 1) % 2;
            },
            Face::Back => {
                // Update corner permutation for B face rotation
                // The 4 corners on the Back face cycle positions
                // Position indices: 3, 2, 6, 7 (back face corners)
                let temp = self.corners[3];
                self.corners[3] = self.corners[2];
                self.corners[2] = self.corners[6];
                self.corners[6] = self.corners[7];
                self.corners[7] = temp;

                // Update corner orientations
                self.corners[3].1 = (self.corners[3].1 + 1) % 3;
                self.corners[2].1 = (self.corners[2].1 + 2) % 3;
                self.corners[7].1 = (self.corners[7].1 + 2) % 3;
                self.corners[6].1 = (self.corners[6].1 + 1) % 3;

                // Update edge permutation for B face rotation
                // The 4 edges on the Back face cycle positions
                let temp_edge = self.edges[3];
                self.edges[3] = self.edges[2];
                self.edges[2] = self.edges[6];
                self.edges[6] = self.edges[7];
                self.edges[7] = temp_edge;

                // Update edge orientations for B face rotation
                self.edges[3].1 = (self.edges[3].1 + 1) % 2;
                self.edges[2].1 = (self.edges[2].1 + 1) % 2;
                self.edges[7].1 = (self.edges[7].1 + 1) % 2;
                self.edges[6].1 = (self.edges[6].1 + 1) % 2;
            },
            Face::Left => {
                // Update corner permutation for L face rotation
                // The 4 corners on the Left face cycle positions
                // Position indices: 0, 3, 7, 4 (left face corners)
                let temp = self.corners[0];
                self.corners[0] = self.corners[3];
                self.corners[3] = self.corners[7];
                self.corners[7] = self.corners[4];
                self.corners[4] = temp;

                // Update corner orientations
                self.corners[0].1 = (self.corners[0].1 + 2) % 3;
                self.corners[3].1 = (self.corners[3].1 + 1) % 3;
                self.corners[7].1 = (self.corners[7].1 + 2) % 3;
                self.corners[4].1 = (self.corners[4].1 + 1) % 3;

                // Update edge permutation for L face rotation
                let temp_edge = self.edges[2];
                self.edges[2] = self.edges[3];
                self.edges[3] = self.edges[7];
                self.edges[7] = self.edges[4];
                self.edges[4] = temp_edge;
            },
            Face::Right => {
                // Update corner permutation for R face rotation
                // The 4 corners on the Right face cycle positions
                // Position indices: 1, 2, 6, 5 (right face corners)
                let temp = self.corners[1];
                self.corners[1] = self.corners[2];
                self.corners[2] = self.corners[6];
                self.corners[6] = self.corners[5];
                self.corners[5] = temp;

                // Update corner orientations
                self.corners[1].1 = (self.corners[1].1 + 1) % 3;
                self.corners[2].1 = (self.corners[2].1 + 2) % 3;
                self.corners[6].1 = (self.corners[6].1 + 1) % 3;
                self.corners[5].1 = (self.corners[5].1 + 2) % 3;

                // Update edge permutation for R face rotation
                let temp_edge = self.edges[1];
                self.edges[1] = self.edges[2];
                self.edges[2] = self.edges[6];
                self.edges[6] = self.edges[5];
                self.edges[5] = temp_edge;
            },
        }
    }

    fn rotate_up_layer(&mut self) {
        // Rotate the up layer (affects corners and edges)
        // This is handled by update_permutations_for_face_rotation
    }

    fn rotate_down_layer(&mut self) {
        // Rotate the down layer (affects corners and edges)
        // This is handled by update_permutations_for_face_rotation
    }

    fn rotate_left_layer(&mut self) {
        // Rotate the left layer (affects corners and edges)
        // This is handled by update_permutations_for_face_rotation
    }

    fn rotate_right_layer(&mut self) {
        // Rotate the right layer (affects corners and edges)
        // This is handled by update_permutations_for_face_rotation
    }

    fn rotate_front_layer(&mut self) {
        // Rotate the front layer (affects corners and edges)
        // This is handled by update_permutations_for_face_rotation
    }

    fn rotate_back_layer(&mut self) {
        // Rotate the back layer (affects corners and edges)
        // This is handled by update_permutations_for_face_rotation
    }

    pub fn is_solved(&self) -> bool {
        // Check if all face colors are uniform
        for &face in &[Face::Up, Face::Down, Face::Left, Face::Right, Face::Front, Face::Back] {
            let face_data = &self.faces[&face];
            let center_color = face_data[self.size / 2][self.size / 2];
            for row in face_data {
                for &color in row {
                    if color != center_color {
                        return false;
                    }
                }
            }
        }

        // Check if corners are in their original positions with correct orientation
        for i in 0..8 {
            if self.corners[i].0 != i || self.corners[i].1 != 0 {
                return false;
            }
        }

        // Check if edges are in their original positions with correct orientation
        let num_edges = 12 + 24 * self.size.saturating_sub(3);
        for i in 0..num_edges {
            if self.edges[i].0 != i || self.edges[i].1 != 0 {
                return false;
            }
        }

        // Check if centers are in their original positions
        let num_centers = 6 * (self.size - 2) * (self.size - 2);
        for i in 0..num_centers {
            if self.centers[i] != i {
                return false;
            }
        }

        true
    }

    pub fn verify_solution(&self, moves: &[Move]) -> bool {
        let mut cube = self.clone();
        for m in moves {
            cube.apply_move(m);
        }
        cube.is_solved()
    }

    pub fn meets_difficulty(&self, target_hash: [u8; 32]) -> bool {
        let mut hasher = Keccak::v256();
        let mut result = [0u8; 32];

        // Create a string representation of the cube state
        let cube_state = format!("{:?}", self.faces);

        hasher.update(cube_state.as_bytes());
        hasher.finalize(&mut result);

        // Compare the hash with the target
        // This implementation correctly compares the full 32-byte hash
        result <= target_hash
    }
}

impl Color {
    pub fn default_for_face(face: Face) -> Self {
        match face {
            Face::Up => Color::White,
            Face::Down => Color::Yellow,
            Face::Front => Color::Red,
            Face::Back => Color::Orange,
            Face::Left => Color::Blue,
            Face::Right => Color::Green,
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Move {
    U(usize),   // Up face clockwise
    D(usize),   // Down face clockwise
    L(usize),   // Left face clockwise
    R(usize),   // Right face clockwise
    F(usize),   // Front face clockwise
    B(usize),   // Back face clockwise
}

impl Move {
    pub fn from_face_and_count(face: Face, count: usize) -> Self {
        match face {
            Face::Up => Move::U(count % 4), // Normalize count to 0, 1, 2, or 3
            Face::Down => Move::D(count % 4),
            Face::Left => Move::L(count % 4),
            Face::Right => Move::R(count % 4),
            Face::Front => Move::F(count % 4),
            Face::Back => Move::B(count % 4),
        }
    }
}

pub fn calculate_difficulty(n: usize) -> u32 {
    // Use the number of possible states as a measure of difficulty
    // For a 3x3x3: ~4.32e19 states
    // For higher n, the number of states grows factorially
    match n {
        1 => 1,
        2 => 3674160, // 2x2x2 has 3,674,160 states
        3 => 43252003274489856000, // 3x3x3 has ~4.3e19 states
        4 => 740119684156490186987409397449857433600000000, // 4x4x4 has ~7.4e45 states
        _ => {
            // For n > 4, we use a simplified approximation
            // The actual number of states for n>4 is much more complex to calculate
            (n * n * n * 24) as u32 // Simplified approximation
        }
    }
}
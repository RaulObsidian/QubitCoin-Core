// QbitCoin (QBC) - Constants based on Whitepaper Specifications
// Implementation of the Tiered Security Architecture as defined in the QbitCoin Whitepaper

// Tier 1: Users (The 3K Standard)
// Structure: 3x3x3 Cube
// State Space: 4.3 x 10^19
export const TIER_1_CUBE_SIZE = 3;
export const TIER_1_STATE_SPACE = 4.3e19;

// Tier 2: Enterprises (The 4K Vault)
// Structure: 4x4x4 Cube
// State Space: 7.4 x 10^45
export const TIER_2_CUBE_SIZE = 4;
export const TIER_2_STATE_SPACE = 7.4e45;

// Tier 3: Institutional (The 5K Reserve)
// Structure: 5x5x5 Cube
// State Space: 2.8 x 10^74
export const TIER_3_CUBE_SIZE = 5;
export const TIER_3_STATE_SPACE = 2.8e74;

// Tier 4: Military (The 6K Fortress)
// Structure: 6x6x6 Cube
// State Space: 1.57 x 10^116 (More than atoms in the observable universe)
export const TIER_4_CUBE_SIZE = 6;
export const TIER_4_STATE_SPACE = 1.57e116;

// S48 Group Constants (As described in the whitepaper)
// The symmetric group S48 describes all possible permutations of 48 elements
// corresponding to the movable pieces of a cryptographically modified 6x6x6 Rubik's Cube
export const S48_GROUP_ORDER = 1.57e116;  // Approximate order of S48
export const GOD_NUMBER_UPPER_BOUND = 116; // As per "God's Number" research

// Post-Quantum Cryptography Constants
export const POST_QUANTUM_SECURITY_LEVEL = 5; // Highest NIST security level
export const DILITHIUM_SECURITY_STRENGTH = 256; // Bit security equivalent
export const KYBER_SECURITY_PARAMETER = 1024; // NIST standard parameter

// Tokenomics Constants
export const MAX_SUPPLY = 21_000_000; // Immutable and fixed as per whitepaper
export const HALVING_INTERVAL = 210_000; // Blocks, approximately 4 years
export const INITIAL_REWARD = 50; // QBC per block for Era 1

// Network Parameters
export const DEFAULT_DIFFICULTY_ADJUSTMENT_INTERVAL = 2_016; // Blocks
export const TARGET_BLOCK_TIME = 600; // Seconds (10 minutes)
export const CONFIRMATION_THRESHOLD = 6; // Blocks for transaction confirmation
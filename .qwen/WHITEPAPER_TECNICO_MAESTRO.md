# QBITCOIN (QBC) - TECHNICAL IMPLEMENTATION SPECIFICATION
# SOURCE: Official Whitepaper v2.0 (Institutional Edition)

## 1. CORE CRYPTOGRAPHY (POST-QUANTUM)

### 1.1 Digital Signatures: Crystals-Dilithium
* **Requirement:** Replace ECDSA entirely.
* **Algorithm:** Crystals-Dilithium (NIST Standard).
* **Security Level:** Level 3 (Equivalent to AES-192).
* **Key Specs:**
    * Public Key Size: ~1.3 KB
    * Signature Size: ~2.4 KB
* **Implementation Goal:** All transactions must be signed using Dilithium. The public key derived from the private key must use lattice-based logic, not elliptic curves.

### 1.2 Key Encapsulation / Encryption: Crystals-Kyber
* **Requirement:** Secure communication channels between nodes (P2P Handshake).
* **Algorithm:** Crystals-Kyber (NIST Standard).
* **Function:** Key Encapsulation Mechanism (KEM).
* **Feature:** Forward Secrecy. Even if a private key is compromised in the future, past sessions must remain undecryptable.
* **Implementation Goal:** Node-to-node communication must perform a Kyber handshake to derive symmetric encryption keys.

---

## 2. CONSENSUS MECHANISM: RUBIKPOW (PROOF OF USEFUL WORK)

### 2.1 Mathematical Foundation: Permutation Group $S_{48}$
* **Core Concept:** The puzzle is based on the non-abelian permutation group $S_{48}$, representing a cryptographically modified 6x6x6 Rubik's Cube.
* **State Space:** $1.57 \times 10^{116}$ unique configurations.
* **Asymmetry:**
    * **Mining (Proving):** NP-Hard. Finding the shortest path (sequence of moves) to solve a scrambled state.
    * **Verifying:** $O(1)$ (Polynomial/Instant). Applying the moves to check if the cube returns to the solved state.

### 2.2 Difficulty Adjustment & Cube Sizes (Tiered Security)
The difficulty is not just "hash zeros", but the complexity of the permutation group (Cube Size).
* **Level 1 (User/IoT):** 3x3x3 Cube ($4.3 \times 10^{19}$ states).
* **Level 2 (Enterprise):** 4x4x4 Cube ($7.4 \times 10^{45}$ states).
* **Level 3 (Institutional):** 5x5x5 Cube ($2.8 \times 10^{74}$ states).
* **Level 4 (Military/Genesis):** 6x6x6 Cube ($1.57 \times 10^{116}$ states).

### 2.3 Mining Process
1.  **Scramble:** The network provides a deterministic "scramble" (based on the previous block hash).
2.  **Solve:** Miners must find a sequence of moves (operators) that restores the cube to a specific low-entropy state (or solved state).
3.  **Proof:** The block header must contain the sequence of moves.

---

## 3. NETWORK TOPOLOGY

### 3.1 Node Types
* **Light Nodes:** Verify proofs ($O(1)$) only.
* **Archival Nodes:** Store full history.
* **Prover Miners:** Specialized hardware (ASIC/GPU) for solving permutations.

---

## 4. TOKENOMICS (HARD CODED LIMITS)

* **Max Supply:** 21,000,000 QBC (Immutable).
* **Block Time:** Target 2.5 seconds (via DAG structure in Tier 1) to ~10 mins (Tier 4).
* **Reward Distribution:**
    * 60% to Miners.
    * 30% to DAO Treasury (Locked for R&D).
    * 10% to Validator Nodes (Staking).
* **Halving:** Every 210,000 blocks (approx. 4 years).

---

## 5. AUDIT & SECURITY COMPLIANCE

* **Code Quality:** Rust (Memory Safe).
* **Framework:** Substrate (Polkadot SDK).
* **Compliance:** MiCA (EU) & SEC (Commodity).
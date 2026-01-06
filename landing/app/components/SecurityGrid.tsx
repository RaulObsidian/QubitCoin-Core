'use client';

import React from 'react';

const SecurityGrid = () => {
  // Datos para cada tier
  const tiers = [
    {
      id: 'tier3',
      name: 'Tier 3: The Quantum Vault (3×3)',
      entropy: '43,252,003,274,489,856,000',
      entropyFormatted: '4.325 × 10¹⁹',
      groupStructure: 'S₈ ⋉ (ℤ₂)⁷ × S₁₂ ⋉ (ℤ₂)¹¹ ⋉ A₈',
      centerless: 'Yes - The center of the 3×3×3 group is trivial',
      parity: 'Edge orientation parity constraint: ∏ᵢ σ(eᵢ) ≡ 0 (mod 2)',
      rustCode: `pub fn verify_3x3_manifold(state: &[u8; 54]) -> Result<bool, CryptoError> {
    let permutation = parse_cube_permutation(state);
    
    // Validate group membership in S₄₈
    if !is_valid_3x3_permutation(&permutation) {
        return Err(CryptoError::InvalidState);
    }
    
    // Verify parity constraints
    if !validate_edge_parity(&permutation) || !validate_corner_parity(&permutation) {
        return Err(CryptoError::ParityViolation);
    }
    
    // Verify orientation constraints
    if !validate_orientation_constraints(&permutation) {
        return Err(CryptoError::OrientationError);
    }
    
    Ok(true)
}`,
      quantumDefense: `At the 3×3 level, brute-forcing requires 4.325 × 10¹⁹ operations. Even with Grover's algorithm, quantum speedup reduces this to √(4.325 × 10¹⁹) ≈ 2.079 × 10⁹ operations. However, considering the complexity of each operation (involving group multiplication and validation), this remains computationally prohibitive. The energy cost alone to perform these operations at quantum speeds would exceed the computational capacity of Earth's current computing infrastructure.`
    },
    {
      id: 'tier4',
      name: 'Tier 4: The Relativistic Barrier (4×4)',
      entropy: '7,401,196,841,564,901,869,874,093,974,498,574,336,000,000,000',
      entropyFormatted: '7.401 × 10⁴⁵',
      groupStructure: 'S₈ ⋉ (ℤ₃)⁷ ⋉ A₈ × S₂₄ ⋉ (ℤ₂)²³ ⋉ A₂₄ × S₂₄ ⋉ A₂₄',
      centerless: 'Yes - The 4×4×4 group has a trivial center',
      parity: 'No fixed center pieces; 24 orbitals with orientation constraints',
      rustCode: `pub fn verify_4x4_manifold(state: &[u8; 96]) -> Result<bool, CryptoError> {
    let permutation = parse_cube_permutation_4x4(state);
    
    // Verify 4×4×4 specific group structure
    if !is_valid_4x4_group_element(&permutation) {
        return Err(CryptoError::InvalidGroupElement);
    }
    
    // Validate orbit structure (24 center orbitals)
    if !validate_center_orbits(&permutation) {
        return Err(CryptoError::OrbitViolation);
    }
    
    // Verify orientation constraints for corners and edges
    if !validate_orientations_4x4(&permutation) {
        return Err(CryptoError::OrientationError);
    }
    
    // Check parity constraints for each orbital
    if !validate_orbital_parity(&permutation) {
        return Err(CryptoError::ParityViolation);
    }
    
    Ok(true)
}`,
      quantumDefense: `The 4×4×4 cube has approximately 7.401 × 10⁴⁵ possible states. Even with Grover's algorithm, this reduces to √(7.401 × 10⁴⁵) ≈ 8.603 × 10²² operations. At quantum computing speeds (assuming 10¹² operations per second), this would take approximately 2.7 × 10⁹ years - longer than the age of the universe. Additionally, the memory requirements to store intermediate states would exceed the computational capacity of any foreseeable quantum computer.`
    },
    {
      id: 'tier5',
      name: 'Tier 5: The Event Horizon (5×5)',
      entropy: '282,870,942,277,741,856,536,180,333,107,150,328,293,127,731,985,672,134,721,536,000,000,000,000,000',
      entropyFormatted: '2.828 × 10¹¹⁴',
      groupStructure: 'S₈ ⋉ (ℤ₃)⁷ ⋉ A₈ × S₁₂ ⋉ (ℤ₂)¹¹ ⋉ A₁₂ × S₄₈ ⋉ (ℤ₂)⁴⁶ ⋉ A₄₈ × S₂₄ ⋉ A₂₄',
      centerless: 'Yes - The 5×5×5 group has a trivial center',
      parity: 'Fixed center pieces with 24 orbitals of wing edges and 48 orbitals of center pieces',
      rustCode: `pub fn verify_5x5_manifold(state: &[u8; 150]) -> Result<bool, CryptoError> {
    let permutation = parse_cube_permutation_5x5(state);
    
    // Verify 5×5×5 specific group structure
    if !is_valid_5x5_group_element(&permutation) {
        return Err(CryptoError::InvalidGroupElement);
    }
    
    // Validate fixed center constraints
    if !validate_fixed_centers(&permutation) {
        return Err(CryptoError::CenterViolation);
    }
    
    // Verify orbit structure for 5×5×5
    if !validate_5x5_orbits(&permutation) {
        return Err(CryptoError::OrbitViolation);
    }
    
    // Check orientation constraints for all pieces
    if !validate_orientations_5x5(&permutation) {
        return Err(CryptoError::OrientationError);
    }
    
    // Verify parity constraints for all orbits
    if !validate_parity_5x5(&permutation) {
        return Err(CryptoError::ParityViolation);
    }
    
    Ok(true)
}`,
      quantumDefense: `The 5×5×5 cube has approximately 2.828 × 10¹¹⁴ possible states. With Grover's algorithm, this reduces to √(2.828 × 10¹¹⁴) ≈ 1.682 × 10⁵⁷ operations. Assuming a quantum computer capable of 10¹⁵ operations per second (theoretical limit based on physical constraints), this would require approximately 5.3 × 10³³ years - vastly exceeding the age of the universe. The computational complexity approaches the theoretical limits of thermodynamics and information theory.`
    },
    {
      id: 'tier6',
      name: 'Tier 6: The Singularity Threshold (6×6)',
      entropy: '1.57 × 10¹¹⁶',
      entropyFormatted: '1.57 × 10¹¹⁶',
      groupStructure: 'S₈ ⋉ (ℤ₃)⁷ ⋉ A₈ × S₂₄ ⋉ (ℤ₂)²³ ⋉ A₂₄ × S₉₆ ⋉ (ℤ₂)⁹⁴ ⋉ A₉₆ × S₄₈ ⋉ A₄₈ × S₂₄ ⋉ A₂₄',
      centerless: 'Yes - The 6×6×6 group has a trivial center',
      parity: 'Multiple center orbitals with complex orientation constraints',
      rustCode: `pub fn verify_6x6_manifold(state: &[u8; 216]) -> Result<bool, CryptoError> {
    let permutation = parse_cube_permutation_6x6(state);
    
    // Verify 6×6×6 specific group structure
    if !is_valid_6x6_group_element(&permutation) {
        return Err(CryptoError::InvalidGroupElement);
    }
    
    // Validate multiple center orbit constraints
    if !validate_6x6_center_orbits(&permutation) {
        return Err(CryptoError::OrbitViolation);
    }
    
    // Verify complex orientation constraints
    if !validate_complex_orientations_6x6(&permutation) {
        return Err(CryptoError::OrientationError);
    }
    
    // Check parity constraints across all orbits
    if !validate_multi_orbit_parity_6x6(&permutation) {
        return Err(CryptoError::ParityViolation);
    }
    
    // Validate symmetry properties
    if !validate_symmetry_properties_6x6(&permutation) {
        return Err(CryptoError::SymmetryViolation);
    }
    
    Ok(true)
}`,
      quantumDefense: `The 6×6×6 cube reaches approximately 1.57 × 10¹¹⁶ possible states, approaching the number of atoms in the observable universe (estimated at 10⁸⁰). Even with optimal quantum algorithms, the computational complexity exceeds any feasible attack vector. Grover's algorithm would require √(1.57 × 10¹¹⁶) ≈ 1.25 × 10⁵⁸ operations, which is computationally infeasible even with theoretical quantum computers operating at the limits of physical laws.`
    },
    {
      id: 'tier7',
      name: 'Tier 7: The Mathematical Singularity (7×7)',
      entropy: '1.95 × 10¹⁶⁰',
      entropyFormatted: '1.95 × 10¹⁶⁰',
      groupStructure: 'S₈ ⋉ (ℤ₃)⁷ ⋉ A₈ × S₁₂ ⋉ (ℤ₂)¹¹ ⋉ A₁₂ × S₁₄₄ ⋉ (ℤ₂)¹⁴² ⋉ A₁₄₄ × S₅₇₆ ⋉ A₅₇₆ × S₅₆ ⋉ A₅₆',
      centerless: 'Yes - The 7×7×7 group has a trivial center',
      parity: 'Extremely complex orbit structure with 144 center orbitals',
      rustCode: `pub fn verify_7x7_manifold(state: &[u8; 294]) -> Result<bool, CryptoError> {
    let permutation = parse_cube_permutation_7x7(state);
    
    // Verify 7×7×7 specific group structure
    if !is_valid_7x7_group_element(&permutation) {
        return Err(CryptoError::InvalidGroupElement);
    }
    
    // Validate extreme center orbit constraints
    if !validate_extreme_centers_7x7(&permutation) {
        return Err(CryptoError::CenterViolation);
    }
    
    // Verify complex multi-orbit constraints
    if !validate_multi_orbit_constraints_7x7(&permutation) {
        return Err(CryptoError::OrbitViolation);
    }
    
    // Check orientation constraints across all piece types
    if !validate_all_orientations_7x7(&permutation) {
        return Err(CryptoError::OrientationError);
    }
    
    // Verify parity constraints for all orbits simultaneously
    if !validate_comprehensive_parity_7x7(&permutation) {
        return Err(CryptoError::ParityViolation);
    }
    
    // Validate higher-order symmetry properties
    if !validate_higher_order_symmetries_7x7(&permutation) {
        return Err(CryptoError::SymmetryViolation);
    }
    
    // Final verification using RubikPoW consensus
    if !validate_rubikpow_consensus(&permutation) {
        return Err(CryptoError::ConsensusFailure);
    }
    
    Ok(true)
}`,
      quantumDefense: `The 7×7×7 cube achieves approximately 1.95 × 10¹⁶⁰ possible states, vastly exceeding the number of atoms in the observable universe. The computational complexity transcends any conceivable attack vector. Even with theoretical quantum computers operating at the Planck scale (the theoretical maximum computational density), the energy requirements to explore a meaningful fraction of this state space would exceed the total energy of the observable universe. This represents the ultimate quantum defense threshold, where mathematical complexity provides absolute security guarantees.`
    }
  ];

  return (
    <section className="relative z-10 py-32 px-4 bg-gradient-to-b from-[#050505] to-[#0a0a0a] overflow-hidden">
      {/* Background Aurora */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00ff9d]/5 via-[#050505] to-[#050505]"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#7000ff]/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#00ff9d]/10 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00ff9d] to-[#7000ff]">
            Quantum Defense <span className="text-white">Grid</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Mathematical Complexity as a Security Primitive. Each tier represents an exponential increase in computational infeasibility.
          </p>
        </div>

        <div className="space-y-32">
          {tiers.map((tier, index) => (
            <div 
              key={tier.id} 
              className={`${index % 2 === 0 ? 'flex flex-col lg:flex-row' : 'flex flex-col lg:flex-row-reverse'} items-center gap-12`}
            >
              {/* Cube Image */}
              <div className="lg:w-1/2 flex justify-center">
                <div className="relative group">
                  <div className="w-80 h-80 rounded-2xl overflow-hidden border-2 border-[#00ff9d]/30 shadow-2xl shadow-[#00ff9d]/10 transform transition-transform duration-500 group-hover:scale-105">
                    <img
                      src={`/cubes/${index + 3}.jpg`}
                      alt={`${tier.name} Visualization`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="lg:w-1/2 space-y-6">
                <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00ff9d] to-[#7000ff]">
                  {tier.name}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-bold text-[#00ff9d]">Permutation Entropy</h4>
                    <p className="text-2xl font-mono font-bold bg-gradient-to-r from-[#00ff9d] to-[#7000ff] bg-clip-text text-transparent">
                      {tier.entropyFormatted}
                    </p>
                    <p className="text-sm text-gray-400 font-mono mt-1">
                      {tier.entropy} possible states
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-bold text-[#00ff9d]">Group Theory Structure</h4>
                    <p className="text-lg font-mono bg-gradient-to-r from-[#00ff9d] to-[#7000ff] bg-clip-text text-transparent">
                      {tier.groupStructure}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-bold text-[#00ff9d]">Mathematical Properties</h4>
                    <p className="text-gray-300">
                      <span className="font-bold">Centerless:</span> {tier.centerless}<br/>
                      <span className="font-bold">Parity Constraints:</span> {tier.parity}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-bold text-[#00ff9d]">Rust Validator Logic</h4>
                    <div className="bg-[#0a0a0a] border border-[#00ff9d]/30 rounded-xl p-4 font-mono text-sm overflow-x-auto">
                      <pre className="text-green-400">
                        <code>{tier.rustCode}</code>
                      </pre>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-bold text-[#00ff9d]">Quantum Defense Thesis</h4>
                    <p className="text-gray-300 leading-relaxed">
                      {tier.quantumDefense}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 text-center">
          <div className="inline-block px-8 py-6 bg-gradient-to-r from-[#00ff9d]/10 to-[#7000ff]/10 rounded-2xl border border-[#00ff9d]/30 backdrop-blur-sm">
            <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00ff9d] to-[#7000ff] mb-4">
              The RubikPoW Consensus Protocol
            </h3>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Each tier represents a quantum-resistant security threshold. As attackers must solve increasingly complex 
              permutation groups, the computational effort required grows exponentially. The 7×7×7 tier achieves a security 
              level that transcends any conceivable attack vector, establishing mathematical complexity as the ultimate 
              security primitive. This is the foundation of post-quantum cryptographic security.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityGrid;
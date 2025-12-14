//! # Pallet RubikPoW
//!
//! This pallet implements the RubikPoW (Rubik Proof of Work) consensus mechanism
//! for the QubitCoin blockchain, based on the permutation group theory of n×n×n Rubik's cubes.

#![cfg_attr(not(feature = "std"), no_std)]

pub use pallet::*;

#[frame_support::pallet]
pub mod pallet {
	use frame_support::{
		dispatch::DispatchResult,
		pallet_prelude::*,
		sp_runtime::traits::{Hash, SaturatedConversion},
		traits::{Currency, ExistenceRequirement},
		PalletId,
	};
	use frame_system::pallet_prelude::*;
	use sha3::{Sha3_256, Digest};
	use sp_runtime::SaturatedConversion;
	use sp_std::vec::Vec;

	use crate::rubikpow::Cube;
	use crate::rubikpow::Move;
	use crate::rubikpow::calculate_difficulty;

	#[pallet::pallet]
	pub struct Pallet<T>(_);

	/// Configuration trait for the RubikPoW pallet
	#[pallet::config]
	pub trait Config: frame_system::Config {
		/// The overarching event type
		type RuntimeEvent: From<Event<Self>> + IsType<<Self as frame_system::Config>::RuntimeEvent>;
		
		/// The currency mechanism
		type Currency: Currency<Self::AccountId>;

		/// The pallet ID for reward purposes
		#[pallet::constant]
		type PalletId: Get<PalletId>;
	}

	/// Current difficulty level (based on cube size)
	#[pallet::storage]
	#[pallet::getter(fn difficulty)]
	pub type Difficulty<T: Config> = StorageValue<_, u32, ValueQuery>;

	/// Mapping of block numbers to their corresponding cube size requirements
	#[pallet::storage]
	#[pallet::getter(fn cube_size_for_block)]
	pub type CubeSizeByBlock<T: Config> = StorageMap<_, Blake2_128Concat, T::BlockNumber, u32, ValueQuery>;

	/// Storage for the most recent block hash that was successfully mined using RubikPoW
	#[pallet::storage]
	#[pallet::getter(fn last_mined_block)]
	pub type LastMinedBlock<T: Config> = StorageValue<_, T::Hash, ValueQuery>;

	/// Event for the RubikPoW pallet
	#[pallet::event]
	#[pallet::generate_deposit(pub(super) fn deposit_event)]
	pub enum Event<T: Config> {
		/// A new block has been successfully mined using RubikPoW
		BlockMined {
			miner: T::AccountId,
			cube_size: u32,
			block_number: T::BlockNumber,
		},
		/// A successful solution was submitted and verified
		SolutionVerified {
			miner: T::AccountId,
			moves_count: u32,
		},
		/// Reward issued to the miner
		RewardIssued {
			miner: T::AccountId,
			amount: u32,
		},
	}

	/// Errors for the RubikPoW pallet
	#[pallet::error]
	pub enum Error<T> {
		/// Invalid cube size specified
		InvalidCubeSize,
		/// The submitted solution is invalid
		InvalidSolution,
		/// Difficulty target not met
		DifficultyNotMet,
		/// Invalid nonce provided
		InvalidNonce,
		/// Block number mismatch
		BlockNumberMismatch,
	}

	#[pallet::call]
	impl<T: Config> Pallet<T> {
		/// Submit a solution for the current block using RubikPoW
		#[pallet::call_index(0)]
		#[pallet::weight(10_000 + T::DbWeight::get().reads_writes(2, 2))]
		pub fn submit_solution(
			origin: T::Origin,
			cube_size: u32,
			moves: Vec<Move>,
			nonce: u64,
		) -> DispatchResult {
			let miner = ensure_signed(origin)?;

			// Validate cube size (must be between 3 and 6 for initial implementation)
			ensure!(cube_size >= 3 && cube_size <= 11, Error::<T>::InvalidCubeSize);

			// Get current block number
			let current_block = frame_system::Pallet::<T>::block_number();

			// Create cube of specified size
			let mut cube = Cube::new(cube_size as usize);

			// Construct block header data for deterministic scrambling
			let block_header = current_block.encode();

			// Apply the deterministic scramble based on nonce and block header
			let scramble_moves = cube.scramble_deterministic(nonce, &block_header);

			// Verify the solution by applying the submitted moves to the scrambled cube
			if !cube.verify_solution(&moves) {
				return Err(Error::<T>::InvalidSolution.into());
			}

			// Check if the cube state meets the current difficulty target
			// Calculate target based on current difficulty
			let difficulty = Self::difficulty();
			let target_hash = Self::calculate_target_hash(difficulty);

			if !cube.meets_difficulty(target_hash) {
				return Err(Error::<T>::DifficultyNotMet.into());
			}

			// Update storage
			CubeSizeByBlock::<T>::insert(current_block, cube_size);
			LastMinedBlock::<T>::put(frame_system::Pallet::<T>::block_hash(current_block));

			// Issue reward to miner
			let reward = Self::calculate_reward(cube_size);
			Self::issue_reward(&miner, reward);

			// Emit events
			Self::deposit_event(Event::BlockMined {
				miner: miner.clone(),
				cube_size,
				block_number: current_block,
			});
			
			Self::deposit_event(Event::SolutionVerified {
				miner: miner.clone(),
				moves_count: moves.len() as u32,
			});
			
			Self::deposit_event(Event::RewardIssued {
				miner,
				amount: reward,
			});

			Ok(())
		}

		/// Internal function to issue reward to the miner
		fn issue_reward(miner: &T::AccountId, reward_amount: u32) {
			use frame_support::traits::Currency;
			// In a real implementation, this would transfer actual tokens
			// For now, we just log the event
			let _ = T::Currency::deposit_creating(miner, reward_amount.saturated_into());
		}

		/// Calculate the target hash based on difficulty
		fn calculate_target_hash(difficulty: u32) -> [u8; 32] {
			// A simplified implementation - in reality, this would be more sophisticated
			let mut target = [255u8; 32]; // Start with maximum target
			if difficulty > 0 {
				// Reduce the target based on difficulty
				let reduction = difficulty.min(255);
				target[0] = 255u8.saturating_sub(reduction as u8);
			}
			target
		}

		/// Calculate reward based on cube size (larger cubes = more reward)
		fn calculate_reward(cube_size: u32) -> u32 {
			// Base reward of 10 units plus bonus for larger cube sizes
			10 + (cube_size * 5)  // Example: 3x3 = 25, 4x4 = 30, 5x5 = 35, etc.
		}
	}

	/// Implementation block with helper functions
	impl<T: Config> Pallet<T> {

		/// Initialize the pallet with default values
		pub fn initialize(difficulty: u32) {
			<Difficulty<T>>::put(difficulty);
		}

		/// Update difficulty based on mining statistics
		pub fn adjust_difficulty() {
			// TODO: Implement dynamic difficulty adjustment
			// based on the time it took to mine recent blocks
		}
	}
}
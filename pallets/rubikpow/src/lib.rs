#![cfg_attr(not(feature = "std"), no_std)]

use frame_support::{
    dispatch,
    pallet_prelude::*,
    traits::{Currency, ExistenceRequirement},
};
use frame_system::pallet_prelude::*;
use sp_runtime::traits::Hash;
use sp_std::vec::Vec;

pub use pallet::*;

#[frame_support::pallet]
pub mod pallet {
    use super::*;
    use qbitcoin_core::{Cube, Move, calculate_difficulty};

    #[pallet::pallet]
    pub struct Pallet<T>(_);

    #[pallet::config]
    pub trait Config: frame_system::Config {
        type RuntimeEvent: From<Event<Self>> + IsType<<Self as frame_system::Config>::RuntimeEvent>;
        type Currency: Currency<Self::AccountId>;
    }

    #[pallet::storage]
    #[pallet::getter(fn difficulty)]
    pub type Difficulty<T: Config> = StorageValue<_, u32, ValueQuery>;

    #[pallet::storage]
    #[pallet::getter(fn last_nonce)]
    pub type LastNonce<T: Config> = StorageValue<_, u64, ValueQuery>;

    #[pallet::storage]
    #[pallet::getter(fn block_number)]
    pub type BlockNumber<T: Config> = StorageValue<_, u32, ValueQuery>;

    #[pallet::event]
    #[pallet::generate_deposit(pub(super) fn deposit_event)]
    pub enum Event<T: Config> {
        BlockMined { miner: T::AccountId, cube_size: u32 },
        Reward { miner: T::AccountId, amount: u32 },
        DifficultyAdjustment { new_difficulty: u32 },
    }

    #[pallet::error]
    pub enum Error<T> {
        InvalidSolution,
        CubeTooSmall,
        CubeTooLarge,
        InvalidNonce,
        DifficultyTooLow,
    }

    #[pallet::call]
    impl<T: Config> Pallet<T> {
        #[pallet::call_index(0)]
        #[pallet::weight(10_000 + T::DbWeight::get().writes(1))] // Adjust weight based on complexity
        pub fn submit_solution(
            origin: OriginFor<T>,
            cube_size: u32,
            moves: Vec<Move>,
            nonce: u64,
        ) -> DispatchResult {
            let who = ensure_signed(origin)?;

            ensure!(cube_size >= 2, Error::<T>::CubeTooSmall);
            ensure!(cube_size <= 16, Error::<T>::CubeTooLarge); // Limit cube size for performance

            // Ensure nonce is unique and increasing
            let last_nonce = Self::last_nonce();
            ensure!(nonce > last_nonce, Error::<T>::InvalidNonce);
            <LastNonce<T>>::put(nonce);

            // Create cube and scramble it with the nonce
            let mut cube = Cube::new(cube_size as usize);
            let block_header = Self::get_current_block_header();
            let scramble = cube.scramble_deterministic(nonce, &block_header);

            // Verify solution
            ensure!(cube.verify_solution(&moves), Error::<T>::InvalidSolution);

            // Check if the cube state meets the current difficulty target
            let difficulty = Self::difficulty();
            let target_hash = Self::calculate_target_hash(difficulty);
            ensure!(cube.meets_difficulty(target_hash), Error::<T>::InvalidSolution);

            let reward = Self::calculate_reward(cube_size);
            let new_difficulty = Self::adjust_difficulty(difficulty, cube_size);

            <Difficulty<T>>::put(new_difficulty);
            <BlockNumber<T>>::put(Self::block_number() + 1);

            // Issue reward (simplified - in reality, would use T::Currency)
            // For now, we just deposit an event.
            Self::deposit_event(Event::BlockMined { miner: who.clone(), cube_size });
            Self::deposit_event(Event::Reward { miner: who, amount: reward });
            Self::deposit_event(Event::DifficultyAdjustment { new_difficulty });

            Ok(())
        }

        #[pallet::call_index(1)]
        #[pallet::weight(10_000 + T::DbWeight::get().writes(1))]
        pub fn set_difficulty(origin: OriginFor<T>, new_difficulty: u32) -> DispatchResult {
            ensure_root(origin)?;
            ensure!(new_difficulty > 0, Error::<T>::DifficultyTooLow);
            <Difficulty<T>>::put(new_difficulty);
            Self::deposit_event(Event::DifficultyAdjustment { new_difficulty });
            Ok(())
        }
    }

    impl<T: Config> Pallet<T> {
        fn calculate_reward(cube_size: u32) -> u32 {
            // Reward based on cube size and difficulty
            let base_reward = 1000;
            base_reward * cube_size
        }

        fn adjust_difficulty(current_difficulty: u32, cube_size: u32) -> u32 {
            // Difficulty adjustment based on cube size and target block time
            // This is a simplified implementation
            let adjustment_factor = (cube_size * 100) / (current_difficulty.max(1));
            current_difficulty.saturating_add(adjustment_factor)
        }

        fn calculate_target_hash(difficulty: u32) -> [u8; 32] {
            // Calculate the target hash based on the difficulty
            // This is a simplified implementation
            let mut target = [0u8; 32];
            let difficulty_bytes = difficulty.to_le_bytes();
            target[..4].copy_from_slice(&difficulty_bytes);
            target
        }

        fn get_current_block_header() -> Vec<u8> {
            // Get the current block header as a byte vector
            // This is a simplified implementation
            Self::block_number().to_le_bytes().to_vec()
        }

        #[pallet::hooks]
        impl<T: Config> Hooks<BlockNumberFor<T>> for Pallet<T> {
            fn on_finalize(_n: BlockNumberFor<T>) {
                // Adjust difficulty every 2016 blocks (similar to Bitcoin)
                if Self::block_number() % 2016 == 0 {
                    let current_difficulty = Self::difficulty();
                    let new_difficulty = Self::adjust_difficulty(current_difficulty, 3); // Using 3 as a default cube size for adjustment
                    <Difficulty<T>>::put(new_difficulty);
                    Self::deposit_event(Event::DifficultyAdjustment { new_difficulty });
                }
            }
        }
    }
}
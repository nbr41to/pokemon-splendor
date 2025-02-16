import { generatePokemon } from '@/utils/generatePokemon';
import { create } from 'zustand';

type State = {
  slots: [Pokemon | null, Pokemon | null, Pokemon | null, Pokemon | null];
};
type Actions = {
  providePokemon: () => void;
  removePokemon: (index: number) => void;
};
export const useEv1PokemonSlots = create<State & Actions>((set) => ({
  slots: [
    generatePokemon(1),
    generatePokemon(1),
    generatePokemon(1),
    generatePokemon(1),
  ],
  providePokemon: () =>
    set((state) => {
      // null のindex 全てにポケモンを追加
      const slots = state.slots.slice();
      for (const index in slots) {
        if (slots[index] === null) {
          slots[index] = generatePokemon(1);
        }
      }

      return { slots: slots as State['slots'] };
    }),
  removePokemon: (index) =>
    set((state) => {
      const slots = state.slots.slice();
      slots[index] = null;
      return { slots: slots as State['slots'] };
    }),
}));
export const useEv2PokemonSlots = create<State & Actions>((set) => ({
  slots: [
    generatePokemon(2),
    generatePokemon(2),
    generatePokemon(2),
    generatePokemon(2),
  ],
  providePokemon: () =>
    set((state) => {
      // null のindex 全てにポケモンを追加
      const slots = state.slots.slice();
      for (const index in slots) {
        if (slots[index] === null) {
          slots[index] = generatePokemon(2);
        }
      }
      return { slots: slots as State['slots'] };
    }),
  removePokemon: (index) =>
    set((state) => {
      const slots = state.slots.slice();
      slots[index] = null;
      return { slots: slots as State['slots'] };
    }),
}));
export const useEv3PokemonSlots = create<State & Actions>((set) => ({
  slots: [
    generatePokemon(3),
    generatePokemon(3),
    generatePokemon(3),
    generatePokemon(3),
  ],
  providePokemon: () =>
    set((state) => {
      // null のindex 全てにポケモンを追加
      const slots = state.slots.slice();
      for (const index in slots) {
        if (slots[index] === null) {
          slots[index] = generatePokemon(3);
        }
      }
      return { slots: slots as State['slots'] };
    }),
  removePokemon: (index) =>
    set((state) => {
      const slots = state.slots.slice();
      slots[index] = null;
      return { slots: slots as State['slots'] };
    }),
}));

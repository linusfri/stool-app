import { StateCreator } from 'zustand';

export interface Item {
  id: string;
  uri: string;
}

export interface ItemsState {
  items: Item[];
  addItem: (uri: string) => void;
  removeItem: (id: string) => void;
  clearItems: () => void;
}

const createItemsSlice: StateCreator<ItemsState> = (set) => ({
  items: [],
  addItem: (uri) =>
    set((state) => ({
      items: [...state.items, { id: `${state.items.length}-${Date.now()}`, uri }],
    })),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  clearItems: () => set({ items: [] }),
});

export default createItemsSlice;

import { create } from "zustand";

export const useQuantityStore = create((set) => ({
  total: 0,
  setTotal: (quantity) =>
    set(() => ({
      total: quantity,
    })),
}));

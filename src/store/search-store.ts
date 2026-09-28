import { create } from "zustand";

interface SearchStore {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  searchQuery: "",

  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },

  clearSearch: () => {
    set({ searchQuery: "" });
  },
}));

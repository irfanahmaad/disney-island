import create from 'zustand'

export const useIslandStore = create((set) => ({
  active: 0,
  rotation: 0,
  setActive: (active) => set(() => ({ active })),
  setRotation: (rotation) => set(() => ({ rotation })),
}))

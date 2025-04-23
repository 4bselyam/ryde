import { DriverStore, LocationStore, MarkerData } from '@/types/type'
import { create } from 'zustand'

export const useLocationStore = create<LocationStore>((set) => ({
  userAddress: '',
  userLatitude: 0,
  userLongitude: 0,
  destinationAddress: '',
  destinationLatitude: 0,
  destinationLongitude: 0,
  setUserLocation: ({ latitude, longitude, address }) =>
    set({ userLatitude: latitude, userLongitude: longitude, userAddress: address }),
  setDestinationLocation: ({ latitude, longitude, address }) =>
    set({ destinationLatitude: latitude, destinationLongitude: longitude, destinationAddress: address }),
}))

export const useDriverStore = create<DriverStore>((set) => ({
  drivers: [] as MarkerData[],
  selectedDriver: null,
  setSelectedDriver: (driverId: number) => set({ selectedDriver: driverId }),
  clearSelectedDriver: () => set({ selectedDriver: null }),
  setDrivers: (drivers: MarkerData[]) => set({ drivers }),
}))

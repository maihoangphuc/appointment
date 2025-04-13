import { Contact } from '@/types/data/contact';
import { ServicePackage } from '@/types/data/service';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AppointmentState {
  // Step management
  currentStep: number;

  // Contact selection
  contact: Contact | null;

  // Vehicle details auto
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleType: string;

  // Vehicle details manual
  vehicleYearManual: string;
  vehicleMakeManual: string;
  vehicleModelManual: string;
  vehicleTypeManual: string;

  // Manual or auto
  isManual: boolean;

  // Package selection
  selectedPackages: ServicePackage[];

  // Appointment date and time
  selectedDate: string;
  selectedTime: string;
  estimatedEndDate: string;
  estimatedEndTime: string;

  // Actions auto
  setCurrentStep: (step: number) => void;
  setContact: (contact: Contact | null) => void;
  setVehicleYear: (year: string) => void;
  setVehicleMake: (make: string) => void;
  setVehicleModel: (model: string) => void;
  setVehicleType: (type: string) => void;

  // Actions manual
  setVehicleYearManual: (year: string) => void;
  setVehicleMakeManual: (make: string) => void;
  setVehicleModelManual: (model: string) => void;
  setVehicleTypeManual: (type: string) => void;

  // Actions manual or auto
  setIsManual: (isManual: boolean) => void;

  // Reset vehicle details auto
  resetVehicleDetails: () => void;

  // Reset vehicle details manual
  resetVehicleDetailsManual: () => void;

  // Package actions
  setSelectedPackages: (packages: ServicePackage[]) => void;
  addPackage: (pkg: ServicePackage) => void;
  removePackage: (packageId: string) => void;

  // Appointment date/time actions
  setSelectedDate: (date: string) => void;
  setSelectedTime: (time: string) => void;
  setEstimatedEndDate: (date: string) => void;
  setEstimatedEndTime: (time: string) => void;

  // Reset the entire appointment state
  resetAppointmentState: () => void;
}

export const useAppointmentStore = create<AppointmentState>()(
  persist(
    (set) => ({
      // Step management
      currentStep: 1,
      setCurrentStep: (step) => set({ currentStep: step }),

      // Contact selection
      contact: null,
      setContact: (contact) => set({ contact }),

      // Vehicle details auto
      vehicleYear: '',
      vehicleMake: '',
      vehicleModel: '',
      vehicleType: '',

      // Vehicle details manual
      vehicleYearManual: '',
      vehicleMakeManual: '',
      vehicleModelManual: '',
      vehicleTypeManual: '',

      // Manual or auto
      isManual: false,

      // Package selection
      selectedPackages: [],

      // Appointment date and time
      selectedDate: '',
      selectedTime: '',
      estimatedEndDate: '',
      estimatedEndTime: '',

      // Actions auto
      setVehicleYear: (year) => set({ vehicleYear: year }),
      setVehicleMake: (make) => set({ vehicleMake: make }),
      setVehicleModel: (model) => set({ vehicleModel: model }),
      setVehicleType: (type) => set({ vehicleType: type }),

      // Actions manual
      setVehicleYearManual: (year: string) => set({ vehicleYearManual: year }),
      setVehicleMakeManual: (make: string) => set({ vehicleMakeManual: make }),
      setVehicleModelManual: (model: string) => set({ vehicleModelManual: model }),
      setVehicleTypeManual: (type: string) => set({ vehicleTypeManual: type }),

      // Manual or auto
      setIsManual: (isManual) => set({ isManual }),

      // Reset vehicle details - both auto and manual fields
      resetVehicleDetails: () => set({
        vehicleYear: '',
        vehicleMake: "",
        vehicleModel: "",
        vehicleType: "",
        vehicleYearManual: "",
        vehicleMakeManual: "",
        vehicleModelManual: "",
        vehicleTypeManual: "",
        isManual: false,
      }),

      // Reset just manual vehicle details
      resetVehicleDetailsManual: () => set({
        vehicleYearManual: "",
        vehicleMakeManual: "",
        vehicleModelManual: "",
        vehicleTypeManual: "",
      }),

      // Package actions
      setSelectedPackages: (packages) => set({ selectedPackages: packages }),
      addPackage: (pkg) => set((state) => ({
        selectedPackages: [...state.selectedPackages, pkg]
      })),
      removePackage: (packageId) => set((state) => ({
        selectedPackages: state.selectedPackages.filter(pkg => pkg.id !== packageId)
      })),

      // Appointment date/time actions
      setSelectedDate: (date) => set({ selectedDate: date }),
      setSelectedTime: (time) => set({ selectedTime: time }),
      setEstimatedEndDate: (date) => set({ estimatedEndDate: date }),
      setEstimatedEndTime: (time) => set({ estimatedEndTime: time }),

      // Reset the entire appointment state
      resetAppointmentState: () => set({
        currentStep: 1,
        contact: null,
        vehicleYear: '',
        vehicleMake: '',
        vehicleModel: '',
        vehicleType: '',
        vehicleYearManual: '',
        vehicleMakeManual: '',
        vehicleModelManual: '',
        vehicleTypeManual: '',
        isManual: false,
        selectedPackages: [],
        selectedDate: '',
        selectedTime: '',
        estimatedEndDate: '',
        estimatedEndTime: ''
      })
    }),
    {
      name: 'appointment-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

import { Appointment } from "@/types/data/appointments";
import { Contact } from "@/types/data/contact";
import { ServicePackage } from "@/types/data/service";
import { VehicleMake, VehicleModel, VehicleType, VehicleYear } from "@/types/data/vehicle";

export const mockAppointments: Appointment[] = [
  {
    id: "1",
    clientName: "Thomas Smith",
    clientEmail: "thomas@example.com",
    service: "Window Tinting",
    serviceDetails: "Front 2 Windows",
    date: "2025-01-15",
    time: "10:00 AM",
    vehicle: "Toyota Corolla",
    vehicleYear: "2020",
    status: "Completed",
    notes: "Standard tint package",
  },
  {
    id: "2",
    clientName: "Alice Johnson",
    clientEmail: "alice@example.com",
    service: "Paint Protection",
    serviceDetails: "Full Vehicle",
    date: "2025-01-16",
    time: "11:30 AM",
    vehicle: "BMW 3 Series",
    vehicleYear: "2022",
    status: "Scheduled",
  },
  {
    id: "3",
    clientName: "Robert Davis",
    clientEmail: "robert@example.com",
    service: "Ceramic Coating",
    serviceDetails: "Full Vehicle",
    date: "2025-01-17",
    time: "2:00 PM",
    vehicle: "Tesla Model 3",
    vehicleYear: "2023",
    status: "In Progress",
    notes: "Premium ceramic package",
  },
  {
    id: "4",
    clientName: "Sarah Miller",
    clientEmail: "sarah@example.com",
    service: "Paint Protection",
    serviceDetails: "Front End",
    date: "2025-01-18",
    time: "9:00 AM",
    vehicle: "Ford F-150",
    vehicleYear: "2021",
    status: "Scheduled",
  },
  {
    id: "5",
    clientName: "Michael Brown",
    clientEmail: "michael@example.com",
    service: "Vinyl Wrap",
    serviceDetails: "Full Vehicle",
    date: "2025-01-19",
    time: "1:30 PM",
    vehicle: "Honda Civic",
    vehicleYear: "2019",
    status: "Cancelled",
    notes: "Carbon fiber pattern",
  },
];

export const contacts: Contact[] = [
  { id: '1', label: 'Thomas Smith', value: 'thomas-smith', email: 'abc@gmail.com', phone: '(+1) 561-555-7689' },
  { id: '2', label: 'John Doe', value: 'john-doe', email: 'john@example.com', phone: '(+1) 555-123-4567' },
  { id: '3', label: 'Jane Smith', value: 'jane-smith', email: 'jane@example.com', phone: '(+1) 555-987-6543' },
];

export const vehicleMakes: VehicleMake[] = [
  { id: '1', label: 'Toyota', value: 'toyota' },
  { id: '2', label: 'Honda', value: 'honda' },
  { id: '3', label: 'Ford', value: 'ford' },
  { id: '4', label: 'BMW', value: 'bmw' },
  { id: '5', label: 'Mercedes', value: 'mercedes' },
];

export const vehicleModels: VehicleModel[] = [
  { id: '1', makeId: '1', label: 'Camry', value: 'camry' },
  { id: '2', makeId: '1', label: 'Corolla', value: 'corolla' },
  { id: '3', makeId: '2', label: 'Accord', value: 'accord' },
  { id: '4', makeId: '2', label: 'Civic', value: 'civic' },
  { id: '5', makeId: '3', label: 'F-150', value: 'f-150' },
  { id: '6', makeId: '3', label: 'Mustang', value: 'mustang' },
  { id: '7', makeId: '4', label: '3 Series', value: '3-series' },
  { id: '8', makeId: '4', label: '5 Series', value: '5-series' },
  { id: '9', makeId: '5', label: 'C-Class', value: 'c-class' },
  { id: '10', makeId: '5', label: 'E-Class', value: 'e-class' },
];

export const vehicleTypes: VehicleType[] = [
  { id: '1', label: 'Sedan', value: 'sedan' },
  { id: '2', label: 'SUV', value: 'suv' },
  { id: '3', label: 'Truck', value: 'truck' },
  { id: '4', label: 'Coupe', value: 'coupe' },
  { id: '5', label: 'Hatchback', value: 'hatchback' },
];

export const vehicleYears: VehicleYear[] = Array.from({ length: 30 }, (_, i) => ({
  id: String(i + 1),
  value: String(2024 - i),
  label: String(2024 - i),
}));

export const servicePackages: ServicePackage[] = [
  { id: '1', name: 'This Is A Product Name', value: 'this-is-a-product-name', service: 'Service name', price: 100.00, estimatedTime: '2 hours', image: '/car-icon.png' },
  { id: '2', name: 'Film Option', value: 'film-option', service: 'Window Tinting', price: 100.00, estimatedTime: '2 hours', image: '/film-icon.png' },
]; 
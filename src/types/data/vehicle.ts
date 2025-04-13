export interface VehicleMake {
  id: string;
  label: string;
  value: string;
}

export interface VehicleModel {
  id: string;
  makeId: string;
  label: string;
  value: string;
}

export interface VehicleType {
  id: string;
  label: string;
  value: string;
}

export interface VehicleYear {
  id: string;
  value: string;
  label: string;
} 
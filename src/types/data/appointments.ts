export interface Appointment {
	id: string;
	clientName: string;
	clientEmail: string;
	service: string;
	serviceDetails: string;
	date: string;
	time: string;
	vehicle: string;
	vehicleYear: string;
	status: string;
	notes?: string;
}

interface DateOption {
  day: string;
  date: number;
  selected: boolean;
  onClick?: () => void;
}

interface TimeOption {
  time: string;
  selected: boolean;
  onClick?: () => void;
}

export interface AppointmentScheduleProps {
  dates: DateOption[];
  times: TimeOption[];
  estimatedEndDate: string;
  estimatedEndTime: string;
}
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UIDateRangePickerProps } from "@/types/ui/dateRangePicker";
import { Button } from "./button";

export const DateRangePicker: React.FC<UIDateRangePickerProps> = ({
  value,
  onChange,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {value
            ? `${value.from.toLocaleDateString()} - ${value.to.toLocaleDateString()}`
            : "Chọn khoảng thời gian"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="range"
          selected={value}
          onSelect={(range) => {
            if (range?.from && range?.to) {
              onChange({ from: range.from, to: range.to });
            }
          }}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
};

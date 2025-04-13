export interface DateRange {
  from: Date;
  to: Date;
}

export interface UIDateRangePickerProps {
  value?: DateRange;
  onChange: (range: DateRange) => void;
} 
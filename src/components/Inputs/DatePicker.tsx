interface DatePickerProps {
  label: string;
  value: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export const DatePicker = ({ label, value, onChange }: DatePickerProps) => (
  <div className="flex flex-col">
    <label htmlFor="delivery-deadline">Wunschtermin Lieferung</label>
    <input
      value={value}
      onChange={onChange}
      type="date"
      id="delivery-deadline"
      name="trip-start"
      lang="de"
      className="border-1 border-abipulli-grey-border rounded-sm py-1.5 px-3 w-38"
    />
  </div>
);

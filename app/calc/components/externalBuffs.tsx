import { Buff, BUFF_FIELDS } from "@/types/buff";

type BuffInputProps = {
  value: Buff;
  onChange: (next: Buff) => void;
};

export const BuffInput = ({ value, onChange }: BuffInputProps) => {
  const handleChange = (key: keyof Buff, newValue: number) => {
    onChange({
      ...value,
      [key]: newValue,
    });
  };

  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6 mt-2">
      {BUFF_FIELDS.map(({ key, label }) => (
        <div key={key} className="flex flex-col">
          <label
            htmlFor={key}
            className="mb-1 text-xs font-medium opacity-70"
          >
            {label}
          </label>

          <input
            id={key}
            type="number"
            value={value[key]}
            onChange={(e) => handleChange(key, Number(e.target.value))}
            className="
              mt-auto
              rounded-md border opacity-70
              px-2 py-1 text-sm
              focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-300
            "
          />
        </div>
      ))}
    </div>
  );
};

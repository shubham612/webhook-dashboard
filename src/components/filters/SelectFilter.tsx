interface Props {
    value: string;
  
    onChange: (value: string) => void;
  
    options: string[];
  
    placeholder: string;
  }
  
  export default function SelectFilter({
    value,
    onChange,
    options,
    placeholder,
  }: Props) {
    return (
      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="border rounded-lg px-4 py-2 bg-white"
      >
        <option value="">
          {placeholder}
        </option>
  
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    );
  }
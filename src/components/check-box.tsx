import { Check } from "lucide-react";

interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}
export function Checkbox({
  checked = false,
  onChange,
  className = "",
}: CheckboxProps) {
  return (
    <div className={`relative ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="peer sr-only"
      />
      <div
        className="
            h-4 w-4 
            rounded-sm 
            border border-gray-300
            bg-white
            cursor-pointer
            transition-all
            duration-200
            peer-checked:bg-blue-600 
            peer-checked:border-blue-600
            peer-focus:ring-2 
            peer-focus:ring-blue-500/20
            peer-focus:ring-offset-2
            hover:border-gray-400
            peer-checked:hover:bg-blue-700
            peer-checked:hover:border-blue-700
            flex items-center justify-center
          "
        onClick={() => onChange?.(!checked)}
      >
        {checked && <Check className="h-3 w-3 text-white stroke-[3]" />}
      </div>
    </div>
  );
}

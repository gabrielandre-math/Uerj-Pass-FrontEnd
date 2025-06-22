// src/components/attendee-list.tsx
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
  Check,
} from "lucide-react";

interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

function Checkbox({
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

export function AttendeeList() {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedItems(Array.from({ length: 8 }, (_, i) => i));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (index: number, checked: boolean) => {
    if (checked) {
      setSelectedItems((prev) => [...prev, index]);
    } else {
      setSelectedItems((prev) => prev.filter((i) => i !== index));
      setSelectAll(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-semibold text-foreground tracking-tight leading-tight">
          Participantes
        </h1>

        <div
          className="
          group flex items-center w-72
          px-3 py-2
          bg-background
          border border-gray-200         
          rounded-md
          shadow-sm
          transition
          focus-within:border-gray-300   
          focus-within:ring-1
          focus-within:ring-gray-200     
          focus-within:ring-offset-2
          focus-within:ring-offset-background
        "
        >
          <Search className="h-5 w-5 text-gray-400 group-focus-within:text-gray-600" />

          <input
            type="text"
            className="
            ml-2 flex-1
            bg-transparent
            border-none outline-none
            text-sm text-foreground
            placeholder:text-gray-400     
          "
            placeholder="Buscar participante..."
          />
        </div>
      </div>
      <div className="border border-gray-200/50 rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200/50">
              <th
                style={{ width: 48 }}
                className="py-3 px-4 text-sm font-semibold text-left"
              >
                <Checkbox checked={selectAll} onChange={handleSelectAll} />
              </th>
              <th className="py-3 px-4 text-sm font-semibold text-left">
                Código
              </th>
              <th className="py-3 px-4 text-sm font-semibold text-left">
                Participante
              </th>
              <th className="py-3 px-4 text-sm font-semibold text-left">
                Data de inscrição
              </th>
              <th className="py-3 px-4 text-sm font-semibold text-left">
                Data do check-in
              </th>
              <th
                style={{ width: 64 }}
                className="py-3 px-4 text-sm font-semibold text-left"
              ></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/50">
            {Array.from({ length: 8 }).map((_, idx) => (
              <tr
                key={idx}
                className="
                    hover:bg-muted/10
                    transition-colors
                    "
              >
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  <Checkbox
                    checked={selectedItems.includes(idx)}
                    onChange={(checked) => handleSelectItem(idx, checked)}
                  />
                </td>
                <td className="px-4 py-3 text-sm text-foreground">12345</td>
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-foreground">
                      Gabriel André
                    </span>
                    <span className="text-xs text-muted-foreground">
                      gabrieldevpyc@gmail.com
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-foreground">
                  7 dias atrás
                </td>
                <td className="px-4 py-3 text-sm text-foreground">
                  3 dias atrás
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="bg-gray-200/10 border border-gray-200 rounded-md p-1.5 hover:bg-gray-200/20 transition-colors">
                    <MoreHorizontal className="h-4 w-4 text-gray-900/30" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="py-3 px-4 text-sm text-gray-700" colSpan={3}>
                Mostrando 10 de 228 itens
              </td>
              <td
                className="py-3 px-4 text-sm text-gray-700 text-right"
                colSpan={3}
              >
                <div className="inline-flex items-center gap-8">
                  <span>Página 1 de 24</span>

                  <div className="flex gap-1.5">
                    <button className="bg-gray-600/10 border border-gray-200 rounded-md p-1.5 hover:bg-gray-600/20 transition-colors">
                      <ChevronsLeft className="h-4 w-4 text-gray-900/30" />
                    </button>
                    <button className="bg-gray-600/10 border border-gray-200 rounded-md p-1.5 hover:bg-gray-600/20 transition-colors">
                      <ChevronLeft className="h-4 w-4 text-gray-900/30" />
                    </button>
                    <button className="bg-gray-300/10 border border-gray-200 rounded-md p-1.5 hover:bg-gray-300/20 transition-colors">
                      <ChevronRight className="h-4 w-4 text-gray-900/30" />
                    </button>
                    <button className="bg-gray-300/10 border border-gray-200 rounded-md p-1.5 hover:bg-gray-300/20 transition-colors">
                      <ChevronsRight className="h-4 w-4 text-gray-900/30" />
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

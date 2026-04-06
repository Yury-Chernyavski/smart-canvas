"use client";

import { COLOR_PALETTE } from "@/constants/color-palette";
import { FC } from "react";

interface ColorPaletteProps {
  selected?: string | null;
  onChange?: (hex: string) => void;
}

export const ColorPalette: FC<ColorPaletteProps> = ({ selected, onChange }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-3 mb-3">
      {COLOR_PALETTE.map((color) => (
        <button
          key={color.hex}
          type="button"
          onClick={() => onChange?.(color.hex)}
          title={color.name}
          className={`
            w-10 h-10 rounded transition-all duration-200
            hover:shadow-md hover:scale-110
            ${selected === color.hex
              ? "ring-2 ring-offset-2 ring-gray-800 shadow-lg"
              : "shadow-sm hover:shadow-md"
            }
          `}
          style={{ backgroundColor: color.hex }}
          aria-label={`Select ${color.name} color`}
        />
      ))}
    </div>
  );
};

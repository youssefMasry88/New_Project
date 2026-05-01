import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { IconChevronDown } from "@tabler/icons-react";

const options = [
  "Default Sorting",
  "Price: Low to High",
  "Price: High to Low",
  "Newest Arrivals",
];


export default function SortDropdown({onSortChange}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Default Sorting");

  return (
    <div className="flex justify-end mb-6 relative">
      
      {/* Button */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 cursor-pointer text-sm text-primary"
      >
        <span>Sort by: {selected}</span>

        <Motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <IconChevronDown size={18} />
        </Motion.div>
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <Motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-8 right-0 bg-white shadow-lg rounded-lg p-2 w-48 z-50"
          >
            {options.map((item) => (
              <div
                key={item}
                onClick={() => {
                  setSelected(item);
                  setOpen(false);
                    onSortChange(item);
                }}
                className="px-3 py-2 text-sm hover:bg-primary/10 rounded cursor-pointer"
              >
                {item}
              </div>
            ))}
          </Motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
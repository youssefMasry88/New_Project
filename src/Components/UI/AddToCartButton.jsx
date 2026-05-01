import { IconPlus } from "@tabler/icons-react";

export default function AddToCartButton({ product, onAdd }) {
  return (
    <button
      onClick={(e) => {
  e.stopPropagation();
  onAdd(product);
}}
      className="absolute w-12 h-12 bottom-3 right-2 bg-primary/10 rounded-full flex items-center justify-center shadow-md opacity-0 
      translate-x-6 cursor-pointer group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 hover:bg-primary"
    >
      <IconPlus
        stroke={2}
        className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300"
      />
    </button>
  );
}
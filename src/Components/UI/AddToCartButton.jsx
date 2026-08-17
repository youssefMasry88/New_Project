import { IconPlus } from "@tabler/icons-react";

export default function AddToCartButton({ product, onAdd }) {
  return (
    <button
onClick={(e) => {
  e.stopPropagation();
  onAdd(product);
}}
className={`absolute w-12 h-12 bottom-3 right-2 rounded-full flex items-center justify-center transition-all duration-300
${
  product.stock === 0
    ? "bg-gray-300 cursor-not-allowed opacity-60"
    : "bg-primary/10 cursor-pointer group-hover:opacity-100 group-hover:translate-x-0 hover:bg-primary"
}`}
    >
      <IconPlus
        stroke={2}
        className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300"
      />
    </button>
  );
}

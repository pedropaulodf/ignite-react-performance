import { memo, useState, lazy, Suspense } from "react";
import { AddProductToWishlistProps } from "./AddProductToWishlist";
// import { AddProductToWishlist } from "./AddProductToWishlist";

// No next é este:
// import dynamic from "next/dynamic";
// const AddProductToWishlist = dynamic<AddProductToWishlistProps>(() => {
//  return import("./AddProductToWishlist"),then(mod => mod.AddProductToWishlist)
//});

// No react é o lazy
// E suporta apenas export DEFAULT da função
// Não precisa passar a tipagem, já vem dentro

const AddProductToWishlist = lazy(() => import("./AddProductToWishlist"));

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    title: string;
    priceFormatted: string;
  };
  onAddToWishlist: (id: number) => void;
}

// shallow compare -> comparação rasa
// shallow compare = se o componente for igual, não compara seus filhos

// {} === {} // false
// igualdade referencial

export function ProductItemComponent({
  product,
  onAddToWishlist,
}: ProductItemProps) {
  const [isAddingToWisthlist, setIsAddingToWisthlist] = useState(false);

  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        margin: "4px 0",
        padding: "4px 10px",
        borderRadius: "6px",
      }}
    >
      {product.title} - <strong>{product.priceFormatted}</strong>
      {/* <button onClick={() => onAddToWishlist(product.id)} 
      style={{marginLeft: 6}}>Add to Wishlist</button> */}
      <button onClick={() => setIsAddingToWisthlist(true)}>
        Adicionar aos favoritos
      </button>
      {isAddingToWisthlist && (
        <Suspense fallback={<></>}>
          <AddProductToWishlist
            onAddToWishlist={() => onAddToWishlist(product.id)}
            onRequestClose={() => setIsAddingToWisthlist(false)}
          />
        </Suspense>
      )}
    </div>
  );
}

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    // Esse Object.is vai verificar de forma profunda os dois objetos
    return Object.is(prevProps.product, nextProps.product);
  }
);

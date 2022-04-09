import { ProductItem } from "./ProductItem";
import { List, AutoSizer, ListRowRenderer } from "react-virtualized";

interface SearchResultsProps {
  totalPrice: number;
  results: Array<{
    id: number;
    price: number;
    title: string;
    priceFormatted: string;
  }>;
  onAddToWishlist: (id: number) => void;
}

export function SearchResults({
  results,
  totalPrice,
  onAddToWishlist,
}: SearchResultsProps) {
  // Guarda o cálculo na memória e usa o mesmo resultado no componente filho <ComponenteTeste/>

  // const totalPrice = useMemo(() => {
  //   return results.reduce((acc, product) => {
  //     return acc + product.price;
  //   }, 0);
  // }, [results]);

  const rowRenderer: ListRowRenderer = ({ key, index, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem
          product={results[index]}
          onAddToWishlist={onAddToWishlist}
        />
      </div>
    );
  };

  return (
    <div>
      <h2>{totalPrice}</h2>

      {/* <ComponenteTeste data={totalPrice} /> */}

      <List
        // height={height}
        height={300}
        // width={width}
        width={700}
        rowHeight={40}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer}
      />

      {/* {results.map((product) => {
        return <ProductItem key={product.id} product={product} onAddToWishlist={onAddToWishlist} />;
      })} */}
    </div>
  );
}

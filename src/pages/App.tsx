import { FormEvent, useCallback, useState } from "react";
import { SearchResults } from "../components/SearchResults";

import "./App.css";

type Results = {
  totalPrice: number;
  data: any[];
};

function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Results>({
    totalPrice: 0,
    data: [],
  });

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    // Formatar na hora da busca
    const products = data.map((product: any) => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormatted: formatter.format(product.price)
      };
    });

    const totalPrice = data.reduce((acc: number, product: any) => {
      return acc + product.price;
    }, 0);

    setResults({ totalPrice, data: products });
  }

  /* CLICO BÁSICO DE RENDERIZAÇÃO DO REACT
   * 1. Criar uma nova versão do componente
   * 2. Comparar com a versão anterior
   * 3. Se houverem alterações, vai atualizar o que alterou
   */

  // ver ProductItem.tsx componente para mais infos

  // ONDE USAR o memo?
  // 1. Pure Functional Components
  // 2. Renders too often (que renderizam muitas vezes)
  // 3. Re-renders with same props (que renderizam com mesmas props)
  // 4. Medium to big/large components (que renderizam muitos filhos)

  /*
    useMemo / useCallback

    useMEMO:
    1. Cálculos pesados;
    2. Igualdade referencial (quando a gente repassa aquela informação a um componente filho)

    useCALLBACK:
    1. Usado apenas para armazenar uma função. Apenas para igualdade referencial na memória.

  */

  const addToWishlist = useCallback(async (id: number) => {
    console.log(id);
  }, []);

  return (
    <div className="container">
      <h1>Search:</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      <SearchResults
        results={results.data}
        totalPrice={results.totalPrice}
        onAddToWishlist={addToWishlist}
      />
    </div>
  );
}

export default App;

import { Container, Pagination } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import ProductCard from '../components/organisms/ProductCard';
import '../styles/pages/Products.css';


function Products() {
  const { products } = useProducts();
  const PER_PAGE = 10;
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const normalize = (text) =>
    text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const filtered = products.filter((p) =>
    normalize(`${p.name} ${p.description}`).includes(normalize(query))
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageParam = parseInt(searchParams.get('page')) || 1;
  const page = Math.min(Math.max(pageParam, 1), totalPages);

  const start = (page - 1) * PER_PAGE;
  const visibleProducts = filtered.slice(start, start + PER_PAGE);

  const goToPage = (n) => {
    setSearchParams(query ? { q: query, page: n } : { page: n });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
 return (
   <Container className="my-5">
    <div className="cards-grid">
      {visibleProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
    {filtered.length === 0 && (
      <p className="text-center text-muted mt-4">
        No se encontraron cartas para "{query}".
      </p>
    )}

    {totalPages > 1 && (
      <Pagination className="justify-content-center mt-4">
        <Pagination.Prev
          disabled={page === 1}
          onClick={() => goToPage(page - 1)}
        />
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <Pagination.Item
            key={n}
            active={n === page}
            onClick={() => goToPage(n)}
          >
            {n}
          </Pagination.Item>
        ))}
        <Pagination.Next
          disabled={page === totalPages}
          onClick={() => goToPage(page + 1)}
        />
      </Pagination>
    )}
   </Container>
 );
}


export default Products;

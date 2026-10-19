import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import banner from '/imagenes/banner 1.avif';
import logoVideo from '/videos/logo.mp4';
import { useProducts } from '../context/ProductsContext';
import ProductCard from '../components/organisms/ProductCard';
import 'swiper/css';
import 'swiper/css/pagination';
import '../styles/pages/Home.css';

function Home() {
  const { products } = useProducts();
  const destacadas = products.filter((p) => p.destacada);

  return (
    <Container className="my-5">
      <Card className="home-hero border shadow-sm mx-auto p-4 p-md-5">
        <Row className="align-items-center g-4">
          <Col md={6}>
            <h2 className="display-5 fw-bold">Compra forma segura y confiable</h2>
            <p className="fs-5 mb-0">¡Tienda de cartas pokemon chilena!</p>
          </Col>
          <Col md={6}>
            <img src={banner} alt="Cartas Pokémon" className="img-fluid rounded" />
          </Col>
        </Row>
      </Card>

      <h2 className="text-center fw-bold mt-5 mb-3">Cartas destacadas</h2>

      <Swiper
        key={destacadas.map((p) => p.id).join('-')}
        className="home-carousel my-4"
        modules={[Pagination]}
        pagination={{ clickable: true, dynamicBullets: true }}
        grabCursor
        slidesPerView="auto"
        spaceBetween={16}
      >
        {destacadas.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="text-center mb-5">
        <Button as={Link} to="/products" variant="primary" size="lg">
          Ver todo el catálogo
        </Button>
      </div>

      <div className="text-center">
        <video src={logoVideo} autoPlay loop muted playsInline className="home-video" />
      </div>
    </Container>
  );
}

export default Home;
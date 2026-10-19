import { useRef } from 'react';
import { Button } from 'react-bootstrap';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ProductCard from './ProductCard';
import '../../styles/organisms/CarruselProductos.css';

function CarruselProductos({ productos }) {
  const swiperRef = useRef(null);

  return (
    <div className="carousel my-4">
      <Button
        variant="dark"
        className="carousel-btn"
        onClick={() => swiperRef.current?.slidePrev()}
        aria-label="Cartas anteriores"
      >
        <ChevronLeft />
      </Button>

      <Swiper
        className="carousel-swiper"
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        loop
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          992: { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
        }}
      >
        {productos.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Button
        variant="dark"
        className="carousel-btn"
        onClick={() => swiperRef.current?.slideNext()}
        aria-label="Cartas siguientes"
      >
        <ChevronRight />
      </Button>
    </div>
  );
}

export default CarruselProductos;
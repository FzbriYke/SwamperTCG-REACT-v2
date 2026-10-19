import { Card } from 'react-bootstrap';
import Image from '../atoms/Image';
import Button from '../atoms/Button';
import CardBody from '../molecules/CardBody';
import { useNavigate } from 'react-router-dom';


function ProductCard({ product }) {
 const navigate = useNavigate();


 return (
   <Card className="h-100">
     <Image src={product.image} alt={product.name} className="card-img-top" />
     <Card.Body className="d-flex flex-column">
       <CardBody
         title={product.name}
         description={product.description}
         price={product.price}
       />
       <Button variant="primary" className="w-100" onClick={() => navigate(`/products/${product.id}`)}>
         Ver detalles
       </Button>
     </Card.Body>
   </Card>
 );
}


export default ProductCard;

import Text from '../atoms/Text';


function CardBody({ title, description, price, idioma, estado, stock }) {
 return (
   <>
     <Text variant="h5">{title}</Text>
     <Text variant="p">{description}</Text>
     <Text variant="p" className="fw-bold fs-5 mt-auto mb-2">
      ${price.toLocaleString('es-CL')}
     </Text>
     <div style={{display: 'none'}}>
     <Text variant="p">Idioma: {idioma}</Text>
     <Text variant="p">Estado: {estado}</Text>
     <Text variant="p">Stock: {stock}</Text>
     </div>
   </>
 );
}


export default CardBody;

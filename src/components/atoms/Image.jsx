import '../../styles/atoms/Image.css';

function Image({ src, alt, className, style }) {
 return <img src={src} alt={alt} className={className} style={style} />;
}

export default Image;

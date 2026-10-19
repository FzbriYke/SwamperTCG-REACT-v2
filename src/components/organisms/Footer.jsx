import { Container } from 'react-bootstrap';
import { Instagram } from 'react-bootstrap-icons';
import tcgmatchLogo from '/imagenes/iconoTcgmatch.png';
import '../../styles/organisms/Footer.css';

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container className="text-center">
        <p className="mb-1">SwamperTCG</p>
        <div className="d-flex justify-content-center gap-4 my-3">
          <a
            href="https://www.instagram.com/swampertcg.cl?utm_source=ig_web_button_share_sheet&psln=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            className="text-light fs-4 d-inline-block mb-2"
            aria-label="Instagram de SwamperTCG"
            >
            <Instagram/>
          </a>
          <a
            href="https://tcgmatch.cl/@swampertcg"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light fs-4 d-inline-block mb-2"
            aria-label="Instagram de SwamperTCG"
            >
            <img src={tcgmatchLogo} alt="Instagram" height="40" />
          </a>
        </div>
        <small className="text-center">
          © {new Date().getFullYear()} Todos los derechos reservados
        </small>
        

      </Container>
    </footer>
  );
}

export default Footer;
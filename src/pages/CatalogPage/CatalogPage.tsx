import { Banner } from '../../components';
import { Catalog } from '../../features/Catalog';
import { Container } from 'react-bootstrap';

function CatalogPage() {
  return (
    <Container as="main">
      <div className="row">
        <div className="col">
          <Banner />
          <Catalog hasSearch />
        </div>
      </div>
    </Container>
  );
}

export { CatalogPage };

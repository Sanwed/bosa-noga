import { Banner } from '../../components';
import { Catalog } from '../../features/Catalog';
import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

function CatalogPage() {
  return (
    <>
      <Helmet>
        <title>Каталог</title>
        <meta name="description" content="Каталог. Приобретайте товары по самым выгодным ценам" />
        <link rel="canonical" href="/catalog" />
      </Helmet>
      <Container as="main">
        <div className="row">
          <div className="col">
            <Banner />
            <Catalog hasSearch />
          </div>
        </div>
      </Container>
    </>
  );
}

export { CatalogPage };

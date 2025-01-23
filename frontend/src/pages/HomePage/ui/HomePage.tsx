import { Banner } from '../../../shared/components';
import { TopSales } from '../../../features/TopSales';
import { Catalog } from '../../../features/Catalog';

function HomePage() {
  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <Banner />
          <TopSales />
          <Catalog />
        </div>
      </div>
    </main>
  );
}

export { HomePage };

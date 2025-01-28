import {Banner} from "../../../shared/components";
import {Catalog} from "../../../features/Catalog";

function CatalogPage() {
  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <Banner/>
          <Catalog hasSearch/>
        </div>
      </div>
    </main>
  );
}

export {CatalogPage};

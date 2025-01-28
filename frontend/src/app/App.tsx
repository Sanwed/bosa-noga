import {Routes, Route} from 'react-router';
import {HomePage} from '../pages/HomePage';
import {CatalogPage} from "../pages/CatalogPage";
import {Header} from "../widgets/Header";
import {Footer} from "../widgets/Footer";

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route index element={<HomePage/>}/>
        <Route path="/catalog" element={<CatalogPage/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;

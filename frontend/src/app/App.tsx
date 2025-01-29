import {Routes, Route} from 'react-router';
import {HomePage} from '../pages/HomePage';
import {CatalogPage} from "../pages/CatalogPage";
import {InfoPage} from "../pages/InfoPage";
import {Header} from "../widgets/Header";
import {Footer} from "../widgets/Footer";
import {ContactsPage} from "../pages/ContactsPage";

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route index element={<HomePage/>}/>
        <Route path="/catalog" element={<CatalogPage/>}/>
        <Route path="/about" element={<InfoPage/>}/>
        <Route path="/contacts" element={<ContactsPage/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;

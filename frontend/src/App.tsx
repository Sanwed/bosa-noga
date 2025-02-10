import { Routes, Route } from 'react-router';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { InfoPage } from './pages/InfoPage';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import { ContactsPage } from './pages/ContactsPage';
import { ProductPage } from './pages/ProductPage';
import { CartPage, setCartState } from './pages/CartPage';
import { ErrorPage } from './pages/ErrorPage';
import { useEffect } from 'react';
import { useAppDispatch } from './hooks';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      dispatch(setCartState(JSON.parse(cartData)));
    }
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/catalog/" element={<CatalogPage />} />
        <Route path="/about/" element={<InfoPage />} />
        <Route path="/contacts/" element={<ContactsPage />} />
        <Route path="/products/:productId/" element={<ProductPage />} />
        <Route path="/cart/" element={<CartPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

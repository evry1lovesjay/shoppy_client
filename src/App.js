// import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import SingleProduct from './pages/SingleProduct';
import Login from './pages/Login';
import Cart from './pages/Cart';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Success from './pages/Success';
import { useSelector } from 'react-redux';

const App = () => {

  const user = useSelector((state)=>state.user.currentUser)

  return (
<BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/products/:category" element={<ProductList/> } />
          <Route path="/product/:id" element={<SingleProduct/> } />
          <Route path="/cart" element={<Cart/> } />
          <Route path="/login" element={user ? <Navigate replace to={"/"} /> : <Login/> } />
          <Route path="/register" element={user ? <Navigate replace to={"/"} /> : <Register/> } />
          <Route path="/success" element={<Success/> } />
        </Routes>
      </BrowserRouter>
  );
}

export default App;

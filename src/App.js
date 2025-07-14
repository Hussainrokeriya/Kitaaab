import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './Components/Navbar';
import { useFirebase } from "./Context/Firebase";
import RegisterPage from './pages/register';
import LoginPage from './pages/login';
import ListingPage from './pages/Lists';
import HomePage from './pages/Home';
import BookDetailPage from './pages/Details';
import OrdersPage from './pages/ViewOrder';
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import ViewOrderDetails from './pages/ViewOrderDetail';
import './App.css';

function App() {
  const firebase = useFirebase();
  return(
    <div>
      <NavBar/>
      <Routes>
        <Route path="/" element={firebase.isLoggedin ? <Navigate to="/HomePage" replace /> : <Navigate to="/login"replace/>}/>
        <Route path="/HomePage" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/book/list" element={<ListingPage/>}/>
        <Route path="/book/view/:bookId" element={<BookDetailPage/>}/>
        <Route path="/book/orders" element={<OrdersPage/>}/>
        <Route path="/book/orders/:bookId" element={<ViewOrderDetails/>}/>
      </Routes>
    </div>
  );
}

export default App;

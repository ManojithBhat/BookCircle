import { Routes,Route } from 'react-router-dom'

//components
import NavBar from './components/Navbar';

//pages
import HomePage from './pages/Home';
import RegisterPage from './pages/Register';
import LoginPage from "./pages/Login";
import ListingPage from './pages/List';
import BookDetailPage from './pages/Detail';
import OrdersPage from './pages/ViewOrders';
import ViewOrderDetails from './pages/ViewOrderDetail';

//css
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div>
      <NavBar></NavBar>
    <Routes>
      <Route path="/" element = {<HomePage/>} />
        <Route path="/register" element = {<RegisterPage/>}/>
        <Route path="/login" element = {<LoginPage/ >}/>
        <Route path="/book/list" element = {<ListingPage/>}/>
        <Route path="/book/view/:bookId" element = {<BookDetailPage/>}/>
        <Route path="/book/orders" element = {<OrdersPage/>}/>   
        <Route path="/book/orders/:bookId" element = {<ViewOrderDetails/>}/>   
     </Routes>
    </div>
  );
}

export default App;

//Router is a component that keeps the UI in sync with the URL. It provides the core routing functionality for applications with components like Route and Link, which are used to build the UI.
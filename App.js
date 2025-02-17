import './App.css';
import Naav from './components/Naav'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';
import Profile from './components/Profile';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Naav/>
      <Routes>

        <Route element={<PrivateComponent/>}>
        <Route path="/" element={<ProductList/>} />
        <Route path="/add" element={<AddProduct/>} />
        <Route path="/update/:id" element={<UpdateProduct/>} />
        <Route path="/logout" element={<h1>Logout Component</h1>} />
        <Route path="/profile" element={<Profile/>} />
        </Route>
        <Route path="signup" element={<SignUp/>} />
        <Route path="Login" element={<Login/>} />
        
      </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;

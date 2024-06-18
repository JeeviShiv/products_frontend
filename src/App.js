import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './componets/Home';
import Products from './componets/Products';
import Category from './componets/Category';
import AddCategory from './componets/AddCategory';
import EditCategory from './componets/EditCategory';
import AddProduct from './componets/AddProduct';
import EditProduct from './componets/EditProduct';
import ViewProduct from './componets/ViewProduct';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" exact element={ <Home />}  />
          <Route path="/addProduct" element={ <AddProduct />}  />
          <Route path="/editProduct/:id" element={<EditProduct />}  /> 
          <Route path="/viewProduct/:id" element={<ViewProduct />}  /> 
          <Route path="/products" element={ <Products />}  />
          <Route path="/editCategory/:id" element={<EditCategory />}  />
          <Route path="/addCategory" element={<AddCategory />}  />
          <Route path="/category" element={ <Category />}  />
        </Routes>
    </Router>
  );
}

export default App;

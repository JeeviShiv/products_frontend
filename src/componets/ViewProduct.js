import React, {useState, useEffect, useRef} from 'react';
import { Link, useParams } from "react-router-dom";
import Header from "./common/Header";
import Footer from "./common/Footer";
import axios from 'axios';
import { useNavigate } from "react-router";

const ViewProduct = () => {
    const navigate = useNavigate();
    let { id } = useParams();
    const initialized = useRef(false)
    const [product, setProduct] = useState([]);
    const BACKEND_URL = process.env.REACT_APP_API_URL;
    const [categoryName, setCategoryName] = useState([]);

    useEffect(() => {
        if (!initialized.current) {
        (async () => {
          try {
            const result = await axios.get(`${BACKEND_URL}/products/${id}`);
            setProduct(result.data[0]);
            setCategoryName(result.data[0].CategoryData[0].name);
          } catch (error) {
            console.error(error.response.data);
          }
        })();
        initialized.current = true  
        }
      },[]);
    return <React.Fragment>
            <Header />
            <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            </div>
            <div class="container">
            <h4 class="display-4">View Product</h4>
            <div class="col-md-8 order-md-1">
            <table class={"table table-bordered"}>
                    <tbody>
                        <tr><td>Product Name</td><td>{product.name}</td></tr>
                        <tr><td>Product Image</td><td><img alt="product" class="productPicture" src={BACKEND_URL +'/'+product.image} width="50" height="50" /></td></tr>
                        <tr><td>Product Code</td><td>{product.code}</td></tr>
                        <tr><td>Product Category</td><td>{categoryName}</td></tr>
                        <tr><td>Product salePrice</td><td>{product.salePrice}</td></tr>
                        <tr><td>Product mrpPrice</td><td>{product.mrpPrice}</td></tr>
                        <tr><td>Product quantity</td><td>{product.quantity}</td></tr>
                        <tr><td>Product Color</td><td>{product.color}</td></tr>
                        <tr><td>Product Status</td><td>{product.status}</td></tr>
                        <tr><td colSpan={2}>
                          <Link to={`/editProduct/${id}`}>
                          <button className="alert alert-info">Edit Product</button>
                          </Link>
                          </td></tr>
                    </tbody>
                </table>
            </div>
            </div>
            <Footer />
            </React.Fragment>
}
export default ViewProduct;
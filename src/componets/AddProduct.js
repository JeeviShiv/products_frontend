import React, {useState, useEffect, useRef} from 'react';
import Header from "./common/Header";
import Footer from "./common/Footer";
import axios from 'axios';
import { useForm } from "react-hook-form"
import ProductForm from './ProductForm';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const AddProduct = () => {
    const schema = yup.object({
      name: yup.string().required("Product name is required"),
      code: yup.string().required("Product code is required"),
      category: yup.string().required("Product category is required"),
      color: yup.string().required("Product color is required"),
      picture: yup.mixed().test("file", "You need to provide a file", (value) => {
        if (value.length > 0) {  
          return true;
        }
        return false;
        }),
      quantity: yup.number().typeError("Product quantity is required"),
      mrpPrice: yup.number().typeError("Product  MRP Price is required"),
      salePrice: yup.number().typeError("Product Sale Price should be valid number"),
      status: yup.string().required("Product status is required"),
    });

    const initialized = useRef(false)
    const BACKEND_URL = process.env.REACT_APP_API_URL;
    const { register, handleSubmit, formState: {errors}, reset, clearErrors, setError} = useForm({mode: "onChange",resolver: yupResolver(schema)
    });
    const [notification, setNotification] = useState([]);
    const [notificationClass, setNotificationClass] = useState('displayNone');
    const [photo, setPhoto] = useState();
    const [previousPhoto, setPreviousPhoto] = useState();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const BACKEND_URL = process.env.REACT_APP_API_URL;
        if (!initialized.current) {
        (async () => {
          try {
            const results = await axios.get(`${BACKEND_URL}/category`);
            console.log(results);
            setCategories(results.data);
            setPreviousPhoto('image.png');
          } catch (error) {
            console.error(error.response.data);
          }
        })();
        initialized.current = true  
        }
      },[]);

    async function handleImage(e) {
        if(e.target.files[0]?.name){
            setPhoto(e.target.files[0])
            clearErrors("picture")
        }
        else{
            setError("picture", {
                type: "manual",
                message: "Please select your picture",
              })
        }
        e.preventDefault();
    }
    const saveData = async(data) => {
      const formData = new FormData();
      formData.append('picture', photo);
      formData.append('code', data.code);
      formData.append('name',data.name);
      formData.append('category',data.category);
      formData.append('color',data.color);
      formData.append('quantity',data.quantity);
      formData.append('mrpPrice',data.mrpPrice);
      formData.append('salePrice',data.salePrice);
      formData.append('status',data.status);
      const { data: result} = await axios.post(`${BACKEND_URL}/products`, formData, { headers: {'Content-Type':'multipart/form-data'}});
      console.log(result);
      if(result?.success){
          reset();
          setNotification(result.success);
          setNotificationClass('alert alert-success');
        }else if(result?.error){
          setNotification(result.error);
          setNotificationClass('alert alert-danger');
        }
    }
    const onSubmit = async(data) => {
        await saveData(data);
    }
    return <React.Fragment>
            <Header />
            <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            </div>
            <div class="container">
              <h4 class="display-4">Add Product</h4>
              <div class="col-md-8 order-md-1">
                <div className={notificationClass}>{notification}</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ProductForm 
                        errors={errors} 
                        onHandleImage={(e) => handleImage(e)}
                        registerCode={{...register("code")}}
                        registerName={{...register("name")}}
                        registerCategory={{...register("category")}}
                        registerQuantity={{...register("quantity")}}
                        registerMrpPrice={{...register("mrpPrice")}}
                        registerSaleprice={{...register("salePrice")}}
                        registerColor={{...register("color")}}
                        registerPicture={{...register("picture")}}
                        registerStatus={{...register("status")}}
                        categories={categories}
                    />
                </form>
              </div>
            </div>
            <Footer />
            </React.Fragment>
}
export default AddProduct;
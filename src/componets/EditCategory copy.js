import React, {useState, useEffect, useRef} from 'react';
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form"
import Header from "./common/Header";
import Footer from "./common/Footer";
import axios from 'axios';
import CategoryForm from './CategoryForm';

const EditCategory = () => {
    let { id } = useParams();
    const initialized = useRef(false)
    const initialState = { name: "", username: "", emailId: "", profilePicture: "" };
    const [category, setCategory] = useState([initialState]);
    const BACKEND_URL = process.env.REACT_APP_API_URL;
    const { register, handleSubmit, formState: {errors}, reset, clearErrors, setError} = useForm({mode: "onTouched"});
    const [notification, setNotification] = useState([]);
    const [notificationClass, setNotificationClass] = useState('displayNone');
    const [photo, setPhoto] = useState();
    const [previousPhoto, setPreviousPhoto] = useState();

    
    useEffect(() => {
        const BACKEND_URL = process.env.REACT_APP_API_URL;
        if (!initialized.current) {
        (async () => {
          try {
            const result = await axios.get(`${BACKEND_URL}/category/${id}`);
            if(result.data?.error){
              setNotification(result.data.error);
              setNotificationClass('alert alert-danger');
            }
            else{
              let defaultValues = {};
              defaultValues.name = result.data[0].name;
              defaultValues.image = result.data[0].image;
              defaultValues.status = result.data[0].status;
              reset({ ...defaultValues });
              setCategory(result.data[0]);
              setPreviousPhoto(result.data[0].image);
            }
          } catch (error) {
            console.error(error.response.data);
          }
        })();
        initialized.current = true  
        }
      },[]);
   
    async function handleImage(e) {
        if(e.target.files[0]?.name){
          clearErrors("picture")
          setPhoto(e.target.files[0])
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
      if(photo){
        formData.append('picture', photo);
      }else{
        formData.append('picture', previousPhoto);
      }
      formData.append('name',data.name);
      formData.append('status',data.status);
      formData.append('id',id);
      const { data: result} = await axios.patch(`${BACKEND_URL}/category`, formData, { headers: {'Content-Type':'multipart/form-data'}});
      console.log(result);
      setCategory(result.data);
      if(result?.success){
          let defaultValues = {};
          defaultValues.name = result.data.name;
          defaultValues.image = result.data.image;
          defaultValues.status = result.data.status;
          reset({ ...defaultValues });
          setNotification(result.success);
          setNotificationClass('alert alert-success');
          setPreviousPhoto(result.data.image);

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
            <h4 class="display-4">Edit Category</h4>
            <div class="col-md-8 order-md-1">
            <div className={notificationClass}>{notification}</div>
            <form onSubmit= {handleSubmit(onSubmit)}>
                <div class="col-md-12 mb-3">
                    {previousPhoto ? (<img className="formImage" src={BACKEND_URL +'/'+category.image} alt="categoryImage" />):''}
                    <input type="hidden" defaultValue={previousPhoto} name="previousImage" />
                </div>
                <CategoryForm errors={errors} 
                              onHandleImage={(e) => handleImage(e)}
                              registerName={ 
                                        {...register("name", {required: "Please enter your Category Name"})}}
                              registerPicture={{...register("picture", (previousPhoto) ? '' : {required: "Please select your file"})}}
                              registerStatus={{...register("status", {required: "Please select your Category Status"})}}
                            />
            </form>
            </div>
            </div>
            <Footer />
            </React.Fragment>
}
export default EditCategory;
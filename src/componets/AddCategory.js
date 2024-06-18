import React, {useState, useEffect} from 'react';
import Header from "./common/Header";
import Footer from "./common/Footer";
import axios from 'axios';
import { useForm } from "react-hook-form"

const AddCategory = () => {
    const BACKEND_URL = process.env.REACT_APP_API_URL;
    const { register, handleSubmit, formState: {errors}, reset, clearErrors, setError} = useForm({mode: "onTouched",
    });
    const [notification, setNotification] = useState([]);
    const [notificationClass, setNotificationClass] = useState('displayNone');
    const [photo, setPhoto] = useState();

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
      formData.append('name',data.name);
      formData.append('status',data.status);
      const { data: result} = await axios.post(`${BACKEND_URL}/category`, formData, { headers: {'Content-Type':'multipart/form-data'}});
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
            <h4 class="display-4">Add Category</h4>
            <div class="col-md-8 order-md-1">
            <div className={notificationClass}>{notification}</div>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div class="col-md-12 mb-3">
                <label for="name">Category name</label>
                <input {...register("name", {required: "Please enter your Category Name"})} 
                      className="form-control" />
                <div class="errorMessage">{errors.name?.message}</div>
            </div>

            <div class="col-md-12 mb-3">
            <label for="picture" > 
            Choose File
            </label>
            <input type='hidden' value={photo}/>
            <input type="file" class="form-control" id="picture" accept="image/*" {...register("picture", {required: "Please select your file"})} onChange={handleImage}/>
                <div class="errorMessage">{errors.picture?.message}</div>
            </div>
            <div class="col-md-12 mb-3">
                <label for="status">Category Status</label>
                <select {...register("status", {required: "Please select your Category Status"})} className="form-control" >
                    <option value="">Select...</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
                <div class="errorMessage">{errors.status?.message}</div>
            </div>
                    <button class="btn btn-primary btn-lg btn-block" type="submit">Submit</button>
                </form>
                </div>
            </div>
            <Footer />
            </React.Fragment>
}
export default AddCategory;
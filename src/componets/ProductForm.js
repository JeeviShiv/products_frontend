const ProductForm = ({ errors, onHandleImage, registerName, registerPicture, registerStatus, registerCode, 
                        registerCategory, registerQuantity, registerMrpPrice, registerSaleprice, 
                        registerColor,categories  }) => {
    return ( <>
                <div class="col-md-12 mb-3">
                    <label for="code">Product Code</label>
                    <input  {...registerCode} 
                        className="form-control" />
                    <div class="errorMessage">{errors.code?.message}</div>
                </div>
                <div class="col-md-12 mb-3">
                    <label for="name">Product Name</label>
                    <input  {...registerName} 
                        className="form-control" />
                    <div class="errorMessage">{errors.name?.message}</div>
                </div>
                <div class="col-md-12 mb-3">
                    <label for="category">Product Category</label>
                    <select {...registerCategory} className="form-control">
                        <option value="">--Select Category--</option>
                        {console.log(categories)}
                        {categories.map(category => (<option value={category._id}>{category.name}</option>))}  
                    </select>
                    <div class="errorMessage">{errors.category?.message}</div>
                </div>
                <div class="col-md-12 mb-3">
                    <label for="quantity">Quantity</label>
                    <input {...registerQuantity} 
                        className="form-control" />
                    <div class="errorMessage">{errors.quantity?.message}</div>
                </div>
                <div class="col-md-12 mb-3">
                    <label for="mrpPrice">MRP Price</label>
                    <input {...registerMrpPrice} 
                        className="form-control" />
                    <div class="errorMessage">{errors.mrpPrice?.message}</div>
                </div>
                <div class="col-md-12 mb-3">
                    <label for="salePrice">Sale Price</label>
                    <input {...registerSaleprice} 
                        className="form-control" />
                    <div class="errorMessage">{errors.salePrice?.message}</div>
                </div>
                <div class="col-md-12 mb-3">
                    <label for="color">Product Color</label>
                    <input {...registerColor} 
                        className="form-control" />
                    <div class="errorMessage">{errors.color?.message}</div>
                </div>
                <div class="col-md-12 mb-3">
                    <label for="picture" > 
                    Product Image
                    </label>
                    <input type="file" class="form-control" id="picture" accept="image/*" {...registerPicture} onChange={onHandleImage}/>
                    <div class="errorMessage">{errors.picture?.message}</div>
                </div>
                <div class="col-md-12 mb-3">
                    <label for="status">Product Status</label>
                    <select {...registerStatus} className="form-control" >
                        <option value="">Select...</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                    <div class="errorMessage">{errors.status?.message}</div>
                </div>
                <button class="btn btn-primary btn-lg btn-block" type="submit">Submit</button>
    </> );
}
 
export default ProductForm;
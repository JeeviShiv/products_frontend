const CategoryForm = ({ errors, onHandleImage, registerName, registerPicture, registerStatus}) => {
    return <> <div class="col-md-12 mb-3">
                    <label for="name">Category name</label>
                    <input {...registerName} 
                        className="form-control" />
                    <div class="errorMessage">{errors.name?.message}</div>
                </div>
                <div class="col-md-12 mb-3">
                    <label for="picture" > 
                    Choose File
                    </label>
                    <input type="file" class="form-control" id="picture" accept="image/*" {...registerPicture} onChange={onHandleImage}/>
                    <div class="errorMessage">{errors.picture?.message}</div>
                </div>
                <div class="col-md-12 mb-3">
                    <label for="status">Category Status</label>
                    <select {...registerStatus} className="form-control" >
                        <option value="">Select...</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                    <div class="errorMessage">{errors.status?.message}</div>
                </div>
                <button class="btn btn-primary btn-lg btn-block" type="submit">Submit</button>
                </>;
}
 
export default CategoryForm;
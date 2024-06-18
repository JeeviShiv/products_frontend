const Input = ({ label, type, id, register, errorMessage, value,onChange }) => {
    return <>
              <div class="col-md-12 mb-3">
                <label for={id}>{label}</label>
                <input type={type} 
                       className="form-control" 
                       id={id} 
                       defaultValue={value} 
                       {...register}
                       />
                <div class="errorMessage">
                {errorMessage}
                </div>
                </div>
    </>;
}
export default Input;
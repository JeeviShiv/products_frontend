import React, { useState, useEffect, useRef } from "react";
import Header from "./common/Header";
import Footer from "./common/Footer";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

const Category = () => {
    const BACKEND_URL = process.env.REACT_APP_API_URL;
    const columns = [{
                        name: 'S.No',
                        selector: (row, index)=> index+1,
                        sortable: true  
                    },{ 
                        name: 'Name',
                        selector: row => row.name,
                        cell: (row) => <Link to={`/editCategory/${row._id}`}>{row.name}</Link>,
                        sortable: true        
                    },{
                        name: 'Image',
                        selector: row => row.image,
                        cell: (row) => <img className="tableImage" src={BACKEND_URL+`/${row.image}`} />        
                    },{
                        name: 'Status',
                        selector: row => row.status,
                        cell:(row) => <span className={row.status==='Active'? 'badge bg-success':'badge bg-warning text-dark'}>{row.status}</span>,
                        sortable: true
                    }];

    const initialized = useRef(false)
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    function handleFilter(event){
        let filtered = products;
        if(event.target.value!=''){
          filtered = filtered.filter(row => {
            console.log(event.target.value);
            return (row.status===event.target.value) ? row : false ;
          })
          setFiltered(filtered);
        }
        else{
          setFiltered(products);
        }
        
    }
    useEffect(() => {
        if (!initialized.current) {
          (async () => {
            try {
              const result = await axios.get(`${BACKEND_URL}/category`);
              setProducts(result.data);
              setFiltered(result.data);
            } catch (error) {
              console.error(error.response.data);
            }
          })();
          initialized.current = true  
        }
        },[]);
    return <><Header />
            <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            </div>
            <div class="container">
            <div className="row">
                    <div className="col-md-10"><h4 class="display-4">Categories</h4></div>
                    <div className="col-md-2"><Link to="/addCategory" className="badge bg-primary">Add Category</Link></div>
                </div>              
                <div class="col-md-12 order-md-1">
                <div className="text-end">
                  <select onChange={handleFilter} class="form-control">
                    <option value="">--Filter by Status--</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  </div>
                <div className="tableTextSize">
                {(filtered.length=== 0) ? (<p>No data found</p>):
                  <DataTable columns={columns} data={filtered?.length ? filtered:products} pagination></DataTable>
                }
                  </div>
              </div>
            </div>
            <Footer />
           </>; 
}
export default Category;
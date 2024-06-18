import React, { useState, useEffect, useRef } from "react";
import Header from "./common/Header";
import Footer from "./common/Footer";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import Slider from '@mui/material/Slider';

const Products = () => {
    const BACKEND_URL = process.env.REACT_APP_API_URL;
    const [range, setRange] = useState([0, 10000]);
    const [nameFilter, setNameFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [rangeFilter, setRangeFilter] = useState('');
    const initialized = useRef(false)
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    
    const columns = [
        {
            name: 'S.No',
            selector: (row, index)=> index+1,
            sortable: true  
        },{
            name: 'Name',
            selector: row => row.name,
            cell: (row) => <Link to={`/viewProduct/${row._id}`}>{row.name}</Link>        
        },
        {
            name: 'Category',
            selector: (row, index ) => { return row.CategoryData[0].name } ,
            sortable: true  
        },{
            name: 'Sale price',
            selector: row => row.salePrice,
            sortable: true  
        },{
            name: 'Image',
            selector: row => row.image,
            cell: (row) => <img src={BACKEND_URL+`/${row.image}`} width="50" height="50"/>        

        },{
            name: 'Quantity',
            selector: row => row.quantity,
            sortable: true  
        },  {
            name: 'Status',
            selector: row => <span className={row.status==='Active'? 'badge bg-success':'badge bg-warning text-dark'}>{row.status}</span>,
            sortable: true
        }];
    function handleFilter(event){
        const {name, value} = event.target;
        if(name==='name'){
            (value!=='')? setNameFilter(event.target.value):setNameFilter('');
        }
        else if(name==='status'){
            (value!=='')? setStatusFilter(event.target.value):setStatusFilter('');
        }
        else if(name==='range'){
            (value!=='')? setRangeFilter(event.target.value):setRangeFilter('');
            setRange(event.target.value);
        }
        filteredData(event.target.name, event.target.value);
    }

    function filteredData(name, value){
        let filtered = products;
        if(nameFilter || name=='name'){
            var searchByName = (name=='name') ? value : nameFilter; 
            if(searchByName){
                filtered = filtered.filter(row => {
                    return row.name.toLowerCase().includes(searchByName);
               })
            }
        }
        if(statusFilter || name=='status'){
            var searchByStatus = (name=='status') ? value:statusFilter; 
            if(searchByStatus){
                filtered = filtered.filter(row => {
                    return (row.status===searchByStatus);
                })
            }
        }
        if(rangeFilter || name=='range'){
            var searchByRange = (name=='range') ? value:rangeFilter; 
            if(searchByRange){
                 setRange(searchByRange);
                 filtered = filtered.filter(row => {
                    return (row.salePrice>searchByRange[0] && row.salePrice<searchByRange[1]);
               })
            }
        }
        setFiltered(filtered);
    }
    useEffect(() => {
        if (!initialized.current) {
          (async () => {
            try {
             const result = await axios.get(`${BACKEND_URL}/products`);
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
                    <div className="col-md-10"><h4 class="display-4">Products</h4></div>
                    <div className="col-md-2"><Link to="/addProduct" className="badge bg-primary">Add Product</Link></div>
            </div>
            <div className="row">
                <div class="col-md-2">
                    <div className="leftSearchBar">
                        <h6 className="filterLeft">Filter by</h6>
                        <input type="text" name="name" onChange={handleFilter} class="form-control" placeholder="Name"/>
                        <br />
                        <select onChange={handleFilter} name="status"class="form-control">
                            <option value="">Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                        <br />
                        <span>Price range</span>
                        <Slider value = {range} min={0} max={10000} name="range" onChange = {handleFilter} valueLabelDisplay="auto"/>
                            The selected range is {range[0]} - {range[1]}
                    </div>
                </div>
                <div class="col-md-10">
                    <div className="tableTextSize">
                    {(filtered.length=== 0) ? (<p>No data found</p>):
                    <DataTable columns={columns} data={filtered?.length ? filtered:products} pagination></DataTable>
                    }

                    </div>
                </div>
            </div>
            </div>
            <Footer />
           </>; 
}
export default Products;
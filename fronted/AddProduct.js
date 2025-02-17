import React from "react";

const AddProduct = ()=>{
    const [name,setName] = React.useState('');
    const [price,setPrice] = React.useState('');
    const [category,setCategory] = React.useState('');
    const [company,setCompany] = React.useState('');
    const [error,setError] = React.useState(false);
    

    const AddProduct = async ()=>{

        console.log(!name);
        if(!name || !price || !category || !company)
            {
                setError(true);
                return false;
            }

        console.log(name,price,category,company);
        const userId = JSON.parse(localStorage.getItem('user'))._id; 
        let result = await fetch("http://localhost:9000/add-product",{
            method:'post',
            body:JSON.stringify({name,price,category,company,userId}),
            headers:{
                "Content-Type":"application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        console.log(result);
        alert("Add Successful");
    }

    return(
        <div className="product">
            <input type="text" placeholder="Enter product name" className="inputBox"
            value = {name} onChange={(e)=>{setName(e.target.value)}}/>
            {error && !name && <span className="invalid-input">Enter valid name</span>}

            <input type="text" placeholder="Enter product price" className="inputBox"
            value = {price} onChange={(e)=>{setPrice(e.target.value)}}/>
            {error && !price && <span className="invalid-input">Enter valid pcategory</span>}

            <input type="text" placeholder="Enter product category" className="inputBox"
            value = {category} onChange={(e)=>{setCategory(e.target.value)}}/>
            {error && !category && <span className="invalid-input">Enter valid category</span>}

            <input type="text" placeholder="Enter product company" className="inputBox"
            value = {company} onChange={(e)=>{setCompany(e.target.value)}}/>
            {error && !company && <span className="invalid-input">Enter valid company</span>}

            <button onClick = {AddProduct} className="appButton">Add Product</button>
        </div>
    );
};

export default AddProduct;

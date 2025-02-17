import React, { useEffect, useState } from "react";

const ProductList = ()=>{
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        getproducts();

    },[]);

    const getproducts = async ()=>{
        let result = await fetch('http://localhost:9000/product',{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setProducts(result);
    };

    const deleteProduct = async (id)=>{
        let result = await fetch(`http://localhost:9000/product/${id}`,{
            method:"delete",
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if(result)
        {
            getproducts();
        }
    }

    const searchHandle = async (event) =>{
        let key = event.target.value;

        if(key){
            let result = await fetch(`http://localhost:9000/search/${key}`,{
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            if(result){
                setProducts(result);
            }
        }else{
            getproducts();
        }
       
    }

    return(
        <div className="product-list">
            <h3>Product List</h3>
            <input type="text" className="search-product-box" placeholder="Serach Product"
            onChange={searchHandle} />
            <ul>
                <li>S .No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Cotegary</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>

            {
               products.length>0 ? products.map((item,index)=>
              <ul key={item._id}>
                <li>{index+1}</li>
                <li>{item.name}</li>
                <li>$ {item.price}</li>
                <li>{item.category}</li>
                <li>{item.company}</li>
                <li>
                    <button onClick={()=>deleteProduct(item._id)}>Delete</button>
                    <a href={"/update/"+item._id}>Update</a>
                </li>
                
              </ul>
                )
                : <h1 className="nofound">No Product Found</h1>
            }

        </div>
    );
};

export default ProductList;
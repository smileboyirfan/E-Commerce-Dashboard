import React from "react";
import { Link ,useNavigate} from "react-router-dom";

const Naav = ()=>{
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout =()=>{
        localStorage.clear();
        navigate('/signup');
    };
    return(
        <div>
             <img alt="logo" className="logo" src="https://dvm9jp3urcf0o.cloudfront.net/logo-ideas/technology-logo/Pro/mobile-shop.png"/>
          {auth ? <ul className="nav-ul">
            <li><a href="/" className="nav-link">Products</a></li>
            <li><a href="/update" className="nav-link">Update Product</a></li>
            <li><a href="/profile" className="nav-link">Profile</a></li>
            <li><a href="/add" className="nav-link">Add Products</a></li>
            <li><a onClick={logout} href="/signup">Logout ( {JSON.parse(auth).name} )</a></li>
        
            
                
            </ul>
            :
            <ul className="nav-ul nav-right">
                <li><a href="/signup">Signup</a></li>
                <li><a href="/Login" className="nav-link">Login</a></li>
            </ul>
          }  
        </div>
    );
};

export default Naav;
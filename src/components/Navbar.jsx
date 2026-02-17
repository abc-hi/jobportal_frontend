import React, {useContext, useState}  from 'react';
import {Link} from 'react-router-dom';
import {myContext} from './ContextAPI.jsx'
// import { use } from 'react';
// Notice the curly braces { } because it’s a named export.

const Navbar = () => {
const{name,setName,loggedIn,setLoggedIn} = useContext(myContext)
const handleLogout =()=>{
  setLoggedIn(false);
  setName(false)
}
    return (
      <div>
          

           
            <nav className="navbar navbar-expand-lg p-0 m-0" >
  <div className="container-fluid" style={{backgroundColor:'#253753',height:'60px'}}>
    
    <a className="navbar-brand" href="#" style={{color:'white',fontFamily: 'Roboto, sans-serif', fontWeight: 700,fontSize:'42px' }}>JobConnect</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
           <span style={{color:'white',fontFamily: 'Roboto, sans-serif', fontWeight: 400,fontSize:'22px',display:'flex', justifyContent: 'center',textAlign: 'center', width: '100%'}}>{name ? `Welcome ${name}` : ''}</span>
{/* justifycontecnt-left ot write, textalign-to make center if multiline, width-to take parent width */}
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav  ms-auto">
        <Link className="nav-link me-3" style={{color:"white",fontFamily: 'Roboto, sans-serif', fontWeight: 400,fontSize:'22px'}} to="/Register">Register</Link> 

     {loggedIn?(
     <span className="nav-link" style={{cursor:'pointer',color:'white',fontFamily: 'Roboto, sans-serif', fontWeight: 400,fontSize:'22px'}} onClick={handleLogout} >logout</span> 
     ): (
     <Link className="nav-link" style={{color:"white",fontFamily: 'Roboto, sans-serif', fontWeight: 400,fontSize:'22px'}} to="/Login">Login</Link>
     )}
       <Link className='nav-link'style={{color:"white",fontFamily: 'Roboto, sans-serif', fontWeight: 400,fontSize:'22px'}}  to='/'>Home</Link>
       
      </div>
    </div>
  </div>
</nav>
        </div>
    );
};
  
export default Navbar;
import { Link, NavLink } from "react-router-dom";
import logo from '../../public/logo.png'
import { useContext } from "react";
import { AuthContext } from "../firebase/FirebaseProvider";
import useRoll from "../hooks/useRoll";


const Navbar = () => {
  const {user, logOut} = useContext(AuthContext)
const [role] = useRoll();



  const Navbar = <>
 <NavLink to={'/'}
    style={({ isActive,}) => {
      return {
        fontWeight: isActive ? "bold" : "",
        color: isActive ? "#0047AB" : "black",
        
        
      };
    }}>Home</NavLink>

<NavLink to={'/join-as-employee'}
    style={({ isActive,}) => {
      return {
        fontWeight: isActive ? "bold" : "",
        color: isActive ? "#0047AB" : "black",
        
      };
    }}>Join as Employee</NavLink>
    <NavLink to={'/join-as-hr'}
    style={({ isActive,}) => {
      return {
        fontWeight: isActive ? "bold" : "",
        color: isActive ? "#0047AB" : "black",
        
      };
    }}>Join as HR Manager</NavLink>
    <NavLink to={"/login"}
    style={({ isActive,}) => {
      return {
        fontWeight: isActive ? "bold" : "",
        color: isActive ? "#0047AB" : "black",
        
      };
    }}>Login</NavLink>
   
  </>
  const hrRoute = <>
  <NavLink to={'/'}
     style={({ isActive,}) => {
       return {
         fontWeight: isActive ? "bold" : "",
         color: isActive ? "#0047AB" : "black",
         
         
       };
     }}>Home</NavLink>
 
 <NavLink to={'/join-as-employee'}
     style={({ isActive,}) => {
       return {
         fontWeight: isActive ? "bold" : "",
         color: isActive ? "#0047AB" : "black",
         
       };
     }}>Asset List</NavLink>
     <NavLink to={'/join-as-hr'}
     style={({ isActive,}) => {
       return {
         fontWeight: isActive ? "bold" : "",
         color: isActive ? "#0047AB" : "black",
         
       };
     }}>Add an Asset</NavLink>
     <NavLink to={"/login"}
     style={({ isActive,}) => {
       return {
         fontWeight: isActive ? "bold" : "",
         color: isActive ? "#0047AB" : "black",
         
       };
     }}>All Requst</NavLink>
    
   </>

  return (
    <div className="navbar fixed z-10 bg-[#bab1b13a] px-16">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 text-xl z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        {
          Navbar
        }
      </ul>
    </div>
    <Link to={'/'}> <img src={logo} className="w-36" /> </Link>
  </div>
  <div className="navbar-end hidden text-xl font-semibold lg:flex">
    <ul className="menu menu-horizontal px-1 text-xl flex gap-4">
     {!user? Navbar: 'user'}
    </ul>
  </div>
  {/* User Profile */}
  <div>
  {
    user && <div className="dropdown tooltip tooltip-bottom dropdown-end" data-tip={user?.displayName}>
    <div tabIndex={0} role="button"  className="btn btn-ghost btn-circle avatar">
      <div className="w-10 rounded-full">
        <img alt={user?.displayName} src={user?.photoURL} />
      </div>
    </div>
    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
      <li>
        <a className="justify-between">
          Update Profile
        </a>
      </li>
      <li><a onClick={logOut}>Logout</a></li>
    </ul>
  </div>
  }
  </div>
  <div>
    
  </div>
</div>
  );
};

export default Navbar;
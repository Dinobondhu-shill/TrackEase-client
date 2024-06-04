import { Link, NavLink } from "react-router-dom";
import logo from '../../public/logo.png'

const Navbar = () => {
  const Navbar = <>
  <NavLink to={'/'}
   style={({ isActive,}) => {
     return {
       fontWeight: isActive ? "bold" : "",
       color: isActive ? "#0047AB" : "black",
       
       
     };
   }}>Home</NavLink>
   <NavLink to={"/all-blogs"}
   style={({ isActive,}) => {
     return {
       fontWeight: isActive ? "bold" : "",
       color: isActive ? "#0047AB" : "black",
       
     };
   }}>Join as Employee</NavLink>
   <NavLink to={"/add-blog"}
   style={({ isActive,}) => {
     return {
       fontWeight: isActive ? "bold" : "",
       color: isActive ? "#0047AB" : "black",
       
     };
   }}>Join as HR Manager</NavLink>
   <NavLink to={"/featured-blog"}
   style={({ isActive,}) => {
     return {
       fontWeight: isActive ? "bold" : "",
       color: isActive ? "#0047AB" : "black",
       
     };
   }}>Login</NavLink>
   
   
   
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
    <ul className="menu menu-horizontal px-1 flex gap-4">
     {Navbar}
    </ul>
  </div>
  
</div>
  );
};

export default Navbar;
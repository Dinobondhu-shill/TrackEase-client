import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Root from "../layout/Root";
import JoinEmployee from "../pages/SignIn/JoinEmployee";
import JoinHR from "../pages/SignIn/JoinHR";
import Login from "../pages/SignIn/Login";
import AddAsset from "../pages/hrPages/AddAsset";
import AssetList from "../pages/hrPages/AssetList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children:[
      {
        path:"/",
        element:<Home></Home>
      },
      {
        path:'/join-as-employee',
        element:<JoinEmployee></JoinEmployee>
      },
      {
        path:'/join-as-hr',
        element:<JoinHR></JoinHR>
      },
      {
        path:'/login',
        element:<Login></Login>
      },
      {
        path:'/hr/add-asset',
        element:<AddAsset></AddAsset>
      },
      {
        path:'/hr/assets',
        element:<AssetList></AssetList>
      }
    ]
  },
]);
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Root from "../layout/Root";
import JoinEmployee from "../pages/SignIn/JoinEmployee";
import JoinHR from "../pages/SignIn/JoinHR";
import Login from "../pages/SignIn/Login";
import AddAsset from "../pages/hrPages/AddAsset";
import AssetList from "../pages/hrPages/AssetList";
import UpdateAsset from "../pages/hrPages/UpdateAsset";
import AddEmployee from "../pages/hrPages/AddEmployee";
import MyEmployee from "../pages/hrPages/MyEmployee";
import RequestForAsset from "../pages/Employee/RequestForAsset";
import MyTeam from "../pages/Employee/MyTeam";
import MyAsset from "../pages/Employee/MyAsset";
import AllRequest from "../pages/hrPages/AllRequest";
import PdfDownload from "../pages/Employee/PdfDownload";

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
      },
      {
        path:"/hr/assets/:id",
        element:<UpdateAsset></UpdateAsset>,
        loader:({params})=> fetch(`http://localhost:5000/assets/${params.id}`)
      },
      {
        path:"/add-employee",
        element:<AddEmployee></AddEmployee>
      },
      {
        path:'/all-request',
        element: <AllRequest></AllRequest>
      }, 
      {
        path:'/my-employee',
        element:<MyEmployee></MyEmployee>
        
      },
      {
        path:'/employee/request-for-assets',
        element:<RequestForAsset></RequestForAsset>,
      },
      {
        path: '/employee/my-team',
        element:<MyTeam></MyTeam>,
      },
      {
        path:'/my-asset-list',
        element:<MyAsset></MyAsset>
      },
      {
        path:'/print-asset-details/:id',
        element:<PdfDownload></PdfDownload>,
        loader:({params})=> fetch(`http://localhost:5000/download-pdf/${params.id}`)
      }
    ]
  },
]);
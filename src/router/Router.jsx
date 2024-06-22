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
import HrPrivateRoute from "./HrPrivateRoute";
import EmployeePrivate from "./EmployeePrivateRoute";
import Packages from "../pages/Package/Packages";
import SignUp from "../pages/SignIn/SignUp";
import ErrorPage from "../pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement:<ErrorPage></ErrorPage>,
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
        element:<SignUp></SignUp>
      },
      {
        path:'/login',
        element:<Login></Login>
      },
      {
        path:'/hr/add-asset',
        element:<HrPrivateRoute><AddAsset></AddAsset></HrPrivateRoute>
      },
      {
        path:'/hr/assets',
        element:<HrPrivateRoute><AssetList></AssetList></HrPrivateRoute>
      },
      {
        path:"/hr/assets/:id",
        element:<HrPrivateRoute><UpdateAsset></UpdateAsset></HrPrivateRoute>,
        loader:({params})=> fetch(`https://track-ease-server.vercel.app/assets/${params.id}`)
      },
      {
        path:"/add-employee",
        element:<HrPrivateRoute><AddEmployee></AddEmployee></HrPrivateRoute>
      },
      {
        path:'/all-request',
        element: <HrPrivateRoute><AllRequest></AllRequest></HrPrivateRoute>
      }, 
      {
        path:'/my-employee',
        element:<HrPrivateRoute><MyEmployee></MyEmployee></HrPrivateRoute>
        
      },
      {
        path:'/employee/request-for-assets',
        element:<EmployeePrivate><RequestForAsset></RequestForAsset></EmployeePrivate>,
      },
      {
        path: '/employee/my-team',
        element:<EmployeePrivate><MyTeam></MyTeam></EmployeePrivate>,
      },
      {
        path:'/my-asset-list',
        element:<EmployeePrivate><MyAsset></MyAsset></EmployeePrivate>
      },
      {
        path:'/print-asset-details/:id',
        element:<PdfDownload></PdfDownload>,
        loader:({params})=> fetch(`https://track-ease-server.vercel.app/download-pdf/${params.id}`)
      },
      {
        path:'/packages',
        element:<HrPrivateRoute><Packages></Packages></HrPrivateRoute>
      }
    ]
  },
]);
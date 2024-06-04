import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Root from "../layout/Root";
import JoinEmployee from "../pages/SignIn/JoinEmployee";

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
      }
    ]
  },
]);
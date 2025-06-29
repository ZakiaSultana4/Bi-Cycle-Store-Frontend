import {
    createBrowserRouter,
} from "react-router";
import App from "../App";
import Home from "@/Pages/Home";
import ProductsDetails from "@/Pages/ProductsDetails";
import CartPage from "@/Pages/CartPage";
import AllProducts from "@/Pages/AllProducts";
import LoginPreview from "@/Pages/auth/SignIn";
import SignUpPage from "@/Pages/auth/SignUpPage";
import DashboardProtected from "./Private/DashboardProtected";
import DashboardLayout from "@/layouts/DashboardLayout";
import ProfileUpdate from "@/Pages/Dashboard/ProfileUpdate";
import UserDashboardIndex from "@/Pages/Dashboard/user/UserDashboardIndex";
import AdminDashboardIndex from "@/Pages/Dashboard/admin/AdminDashboardIndex";
import AdminProducts from "@/Pages/Dashboard/admin/AdminProducts";
import OrderAdmin from "@/Pages/Dashboard/admin/OrderAdmin";
import { AllUsers } from "@/Pages/Dashboard/admin/AllUsers";
import PrivetUserRoute from "./Private/PrivetUserRoute";
import OrderPage from "@/Pages/Order/OrderPage";
import OrderResponse from "@/Pages/Order/OrderResponse";
import UserOrders from "@/Pages/Dashboard/user/UserOrders";
import About from "@/Pages/About";
import Contact from "@/Pages/Contact";





const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <div>404</div>,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/contact",
                element: <Contact/>,
            },
            {
                path: "details/:id",
                element: <PrivetUserRoute><ProductsDetails /></PrivetUserRoute>,
            },
            {
                path: "cart",
                element: <CartPage />,
            },
            {
                path: "allProducts",
                element: <AllProducts />,
            },
            {
                path: "/order",
                element: <PrivetUserRoute><OrderPage /></PrivetUserRoute>,
            },
            {
                path: "/response",
                element: <PrivetUserRoute><OrderResponse /></PrivetUserRoute>,
            },
        ],
    },
    {
        path: '/user/dashboard',
        element: <DashboardProtected role="customer"><DashboardLayout /></DashboardProtected>,
        children: [
            {
                path: "/user/dashboard",
                element: <UserDashboardIndex />,
            },
            {
                path: "/user/dashboard/viewOrders",
                element: <UserOrders />,
            },
            {
                path: "/user/dashboard/profile-setting",
                element: < ProfileUpdate />,
            }


        ]
    },
    {
        path: '/admin/dashboard',
        element: <DashboardProtected role="admin"><DashboardLayout /></DashboardProtected>,
        children: [
            {
                path: "/admin/dashboard",
                element: <AdminDashboardIndex />,
            },
            {
                path: "/admin/dashboard/products",
                element: <AdminProducts />,
            },
            {
                path: "/admin/dashboard/orders",
                element: <OrderAdmin />,
            },
            {
                path: "/admin/dashboard/customer",
                element: <AllUsers />,
            },
            {
                path: "/admin/dashboard/profile-setting",
                element: <ProfileUpdate />,
            },
        ]
    },
    {
        path: '/signup',
        element: <SignUpPage />
    },
    {
        path: '/login',
        element: <LoginPreview />
    },


    {
        //   path: "*",
        //     element: <NotFoundPage/>,
    },
]);

export default router;
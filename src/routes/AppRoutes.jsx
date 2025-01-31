import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import SubCategories from "../pages/subCategories/SubCategories";
import Product from "../pages/product/Product";
import Category from "../pages/Categories/Category";
import AddCategory from "../pages/Categories/AddCategory";
import EditCategory from "../pages/Categories/EditCategory";
import AddSubCategories from "../pages/subCategories/AddSubCategories";
import EditSubCategories from "../pages/subCategories/EditSubCategories";
import AddProduct from "../pages/product/AddProduct";
import EditProduct from "../pages/product/EditProduct";
import PrivateRoute from "./PrivateRoute";
import Register from "../pages/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />, 
    },
    {
        path: "/register",
        element: <Register />, 
    },

    {
        path: "/",
        element: <PrivateRoute><App /></PrivateRoute>,
        children: [
            { path: "dashboard", element: <Dashboard /> },
            { path: "categories", element: <Category /> },
            { path: "categories/add", element: <AddCategory /> },
            { path: "categories/edit/:id", element: <EditCategory /> },
            { path: "subcategories", element: <SubCategories /> },
            { path: "subcategories/add", element: <AddSubCategories /> },
            { path: "subcategories/edit/:id", element: <EditSubCategories /> },
            { path: "product", element: <Product /> },
            { path: "product/add", element: <AddProduct /> },
            { path: "product/update/:id", element: <EditProduct /> },
        ],
    },
]);

export default router;

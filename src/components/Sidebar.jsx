import { NavLink } from "react-router-dom";
import dashboard from "../assets/icons/Dashboard.svg";
import categoryIcon from "../assets/icons/Category.svg";
import subcategoryIcon from "../assets/icons/SubCategory.svg";
import productIcon from "../assets/icons/Products.svg";
import { ArrowIcon } from "../assets/icons/arrow";
import icon from "../assets/icons/icon.svg";
import { FaTimes } from "react-icons/fa";

const menuItems = [
    { path: "/dashboard", name: "Dashboard", icon: dashboard },
    { path: "/categories", name: "Category", icon: categoryIcon },
    { path: "/subcategories", name: "Subcategory", icon: subcategoryIcon },
    { path: "/product", name: "Products", icon: productIcon },
];

const Sidebar = ({ className = "", toggleSidebar }) => {
    return (
        <div className={`fixed  top-0 left-0 z-50 h-full bg-gray-100  shadow-2xl md:shadow-none transition-all transform ${className}`}>
            <div className="logo bg-primary px-5 py-2 border-b-2 border-primary">
                <div className="flex items-center gap-5">
                    <img src={icon} alt="icon" />
                    <h1 className="text-2xl font-primary text-white">TableSprint</h1>
                    <FaTimes className="text-white text-2xl cursor-pointer md:hidden" onClick={toggleSidebar} />
                </div>
            </div>
            <ul className="space-y-2 p-4">
                {menuItems.map((item) => (
                    <li key={item.path}>
                        <NavLink
                            onClick={toggleSidebar}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center justify-between p-2 rounded-lg w-full ${isActive ? "bg-yellow-200" : ""
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <div className="flex items-center gap-4">
                                        <img src={item.icon} alt={item.name} className="w-5 h-5" />
                                        <span className="font-primary" >{item.name}</span>
                                    </div>
                                    <ArrowIcon isActive={isActive} />
                                </>
                            )}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;

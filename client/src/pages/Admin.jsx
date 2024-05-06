import { Outlet } from "react-router-dom";
import {
  HomeIcon,
  UserCircleIcon,
  InformationCircleIcon,
  BookOpenIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import Header from "../components/admin/Header";
import Footer from "../components/admin/Footer";
import SideNav from "../components/admin/SideNav";
const icon = {
  className: "w-5 h-5 text-inherit",
};
import Dashboard from "./admin/Dashboard";
import Category from "./admin/Category";
import Product from "./admin/ProductAdmin";
import Account from "./admin/AccountAdmin";
import Order from "./admin/Order";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { User } from "./admin/User";
const routes = [
  {
    layout: "admin",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Dashboard />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "category",
        path: "/category",
        element: <Category />,
      },
      {
        icon: <BookOpenIcon {...icon} />,
        name: "product",
        path: "/product",
        element: <Product />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "account",
        path: "/account",
        element: <Account />,
      },
      {
        icon: <ClipboardDocumentListIcon {...icon} />,
        name: "order",
        path: "/order",
        element: <Order />,
      },
      {
        icon: <UserGroupIcon {...icon} />,
        name: "user",
        path: "/user",
        element: <User />,
      },
    ],
  },
];

export function Admin() {
  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <SideNav routes={routes} />
      <div className="p-4 xl:ml-80">
        <Header />

        <Outlet />
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Admin;

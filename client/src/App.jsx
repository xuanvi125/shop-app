import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AppLayout from "./pages/AppLayout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Product from "./pages/Product";
import { UpdatePasswordForm } from "./components/UpdatePasswordForm";
import ProfileForm from "./components/ProfileForm";
import Account from "./pages/Account";
import Order from "./pages/Order";
import Cart from "./pages/Cart";
import ProtectedRoute from "./utils/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import GuestRoute from "./utils/GuestRoute";
import CheckOut from "./pages/CheckOut";
import RoleRoute from "./utils/RoleRoute";
import Admin from "./pages/Admin";
import Dashboard from "./pages/admin/Dashboard";
import Category from "./pages/admin/Category";
import AddCategory from "./pages/admin/AddCategory";
import EditCategory from "./pages/admin/EditCategory";
import ProductAdmin from "./pages/admin/ProductAdmin";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import AccountAdmin from "./pages/admin/AccountAdmin";
import EditAccount from "./pages/admin/EditAccount";
import OrderAdmin from "./pages/admin/Order";
import EditOrder from "./pages/admin/EditOrder";
import { User } from "./pages/admin/User";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to={"/user/home"} />} />
          <Route path="home" element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="cart" element={<Cart />} />
          <Route path="profile/account" element={<Account />} />
          <Route path="profile/edit" element={<ProfileForm />} />
          <Route path="profile/orders" element={<Order />} />
          <Route path="cart/checkout" element={<CheckOut />} />
          <Route
            path="profile/change-password"
            element={<UpdatePasswordForm />}
          />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <RoleRoute>
                <Admin />
              </RoleRoute>
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/home" />} />
          <Route path="home" element={<Dashboard />} />
          <Route path="category" element={<Category />} />
          <Route path="category/add" element={<AddCategory />} />
          <Route path="category/:id" element={<EditCategory />} />
          <Route path="product" element={<ProductAdmin />} />
          <Route path="product/add" element={<AddProduct />} />
          <Route path="product/:id" element={<EditProduct />} />

          <Route path="account" element={<AccountAdmin />} />
          <Route path="account/:id" element={<EditAccount />} />
          <Route path="order" element={<OrderAdmin />} />
          <Route path="order/:id" element={<EditOrder />} />
          <Route path="user" element={<User />} />
        </Route>

        <Route path="/" element={<Navigate to={"/login"} replace />} />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <GuestRoute>
              <SignUp />
            </GuestRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <GuestRoute>
              <ForgotPassword />
            </GuestRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <GuestRoute>
              <ResetPassword />
            </GuestRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;

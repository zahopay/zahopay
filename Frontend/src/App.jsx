import React , { useState } from 'react'
import './App.css'
import {Route, Routes} from "react-router-dom"
import {ToastContainer} from "react-toastify"
import Login from './pages/Home/Login'
import Register from './pages/Home/Register'
import HomeLayout from './layout/HomeLayout'
import Home from "./pages/Home/Home.jsx"
import VerifyAccount from './pages/Home/VerifyAccount.jsx'
import ResetPassword from './pages/Home/ResetPassword.jsx'
import UserLayout from './layout/UserLayout.jsx'
import Dashboard from './pages/User/Dashboard/Dashboard.jsx'
import AddPaymentForm from './pages/User/paymentForm/AddPaymentForm.jsx'
import Profile from './pages/User/Dashboard/Profile.jsx'
import UserPlan from './pages/User/Plan/UserPlan.jsx'
import AllPaymentForm from './pages/User/paymentForm/AllPaymentForm.jsx'
import CheckoutPaymentPage from './pages/checkoutPage/CheckoutPaymentPage.jsx'
import PaymentCheckout from './pages/checkoutPage/CheckoutPaymentPage.jsx'
import CheckoutViewPage from './pages/checkoutPage/CheckoutViewPage.jsx'
import Administrationlayout from './admin/adminLayout/AdministrationLayout.jsx'
import AdminLogin from './admin/page/AdminLogin.jsx'
import AdminDashboardLayout from './admin/adminLayout/AdminDasnboardLayout.jsx'
import AdminDashboard from './admin/page/AdminDashboard.jsx'
import AdminAllPaymentForm from './admin/page/AdminAllPaymentForm.jsx'
import AdminAllUsers from './admin/page/AdminAllUsers.jsx'
import AdminAllPurchase from './admin/page/AdminAllPurchase.jsx'
import AllPurchase from './pages/User/Purchase/AllPurchase.jsx'
import ContactUs from './pages/Home/Contactus.jsx'
import TermsAndConditions from './policy/TermAndConditions.jsx'
import PrivacyPolicy from './policy/PrivacyPolicy.jsx'
import RefundPolicy from './policy/RefundPolicy.jsx'
import AboutUs from './policy/AboutUs.jsx'
import AdminUserPlan from './admin/page/AdminUserPlan.jsx'
import NotFoundPage from './pages/404Error.jsx'
import ProtectedRoute from './protectedRoute/ProtectedRoute.jsx'
import AdminProtectedRoute from './protectedRoute/AdminProtectedRoute.jsx'
import CheckOutNotFoundPage from './pages/checkoutPage/CheckoutNotFoundPage.jsx'

function App() {
  

  return (
    <>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="terms" element={<TermsAndConditions />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="refund" element={<RefundPolicy />} />
          <Route path="about" element={<AboutUs />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-account" element={<VerifyAccount />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* user routes  */}

        <Route element={<ProtectedRoute />}>
          <Route path="/user" element={<UserLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="add-payment-form" element={<AddPaymentForm />} />
            <Route path="all-payment-form" element={<AllPaymentForm />} />
            <Route path="plans" element={<UserPlan />} />
            <Route path="all-purchase" element={<AllPurchase />} />
          </Route>
        </Route>

        {/* admin routes  */}

        <Route path="/administrator" element={<Administrationlayout />}>
          <Route path="adminlogin" element={<AdminLogin />} />
          <Route element={<AdminProtectedRoute />}>
            <Route path="auth" element={<AdminDashboardLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route
                path="all-payment-form"
                element={<AdminAllPaymentForm />}
              />
              <Route path="all-users" element={<AdminAllUsers />} />
              <Route path="all-purchase" element={<AdminAllPurchase />} />
              <Route path="plan" element={<AdminUserPlan />} />
            </Route>
          </Route>
        </Route>

        <Route path="/checkout">
          <Route path=":id" element={<CheckoutViewPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
        
        <Route path="/404" element={<CheckOutNotFoundPage />} />
      </Routes>
    </>
  );
}

export default App

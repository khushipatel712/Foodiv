import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Customer from './components/SuperAdmin/Customer';
import Customersays from './components/SuperAdmin/Customersays';
import Endtoend from './components/SuperAdmin/Endtoend';
import Faq from './components/SuperAdmin/Faq';
import Feature from './components/SuperAdmin/Feature';
import Ideas from './components/SuperAdmin/Ideas';
import Kickstart from './components/SuperAdmin/Kickstart';
import Manage from './components/SuperAdmin/Manage';
import Navbar from './components/SuperAdmin/Navbar';
import NewsBlogImg from './components/SuperAdmin/Blog';
import Onlineweb from './components/SuperAdmin/Onlineweb';
import Ratings from './components/SuperAdmin/Ratings';
import Restaurant from './components/SuperAdmin/Restaurant';
import Seamless from './components/SuperAdmin/Seamless';
import ServeMore from './components/SuperAdmin/ServeMore';
import Setup from './components/SuperAdmin/Setup';
import System from './components/SuperAdmin/System';
import Blog from './components/SuperAdmin/Blog';
import Footer from './components/SuperAdmin/Footer';
import Register from './components/Admin/Register';
import LoginForm from './components/Admin/LoginForm';
import Header from './components/Admin/Header';
import Sidebar from './components/Admin/Sidebar';
import Dashboard from './components/Admin/Dashboard';
import AddMenuItem from './components/Admin/AddMenuItem';
import Menu from './components/Admin/Menu';
import Categories from './components/Admin/Categories';
import SubscriptionPlan from './components/Admin/SubScriptionPlan';
import Manage1 from './components/Admin/Manage';
import OrderManagement from './components/Admin/OrderManagement';
import OrderDetails from './components/Admin/OrderDetail';
import OrderTable from './components/Admin/OrderTable';
import Layout from './components/SuperAdmin/Pages/Layout';
import Home from './components/SuperAdmin/Pages/Home';
import AdminLayout from './components/Admin/Pages/AdminLayout';
import OTPForm from './components/Admin/OtpForm';
import { RegisterProvider } from './components/contexts/RegisterContext';
import AdminDetail from './components/Admin/AdminDetail';
import Notification from './components/Admin/Notification';
import SmtpSetting from './components/Admin/Smtpsetting';
import CustomerSupport from './components/Admin/CustomerSupport';
import {Provider} from 'react-redux';
import store from '../src/app/store';
import CartView from './components/User/CartView';
import Checkout from './components/User/Checkout';
import OrderConfirmation from './components/User/OrderConfirmation';
import HomePage from './components/User/Pages/HomePage';
import UserLayout from './components/User/Pages/UserLayout';
import MenuComponent from './components/User/MenuComponent';
import IndexDbItemComponent from '../src/components/User/IndexDbItemComponent';
import OrderDetails1 from './components/Admin/OrderDetail';
import PoliciesAndTerms from './components/Admin/PoliciesandTerms';
import TermsAndConditionsPage from './components/User/TermsAndConditionPage';
import PrivacyPolicyPage from './components/User/PrivacyPolicy';
import ShippingPolicyPage from './components/User/ShippingPolicy';
import CancellationPolicyPage from './components/User/CancellationPolicy';
import PrivateRoute from './components/Admin/Pages/PrivateRoutes';
import ContactUs from './components/SuperAdmin/Pages/ContactUs';
import Partners from './components/SuperAdmin/Pages/Partners';
import BlogMain from './components/SuperAdmin/Pages/BlogMain';
import BlogDetail from './components/SuperAdmin/BlogDetail';
import SystemApp from './components/SuperAdmin/SystemApp';
function App() {
  return (
   <RegisterProvider>
    <Provider store={store}>
   
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          
     <Route path="pricing" element={<SubscriptionPlan/>} /> 
     <Route path="contact-us" element={< ContactUs/>} /> 
     <Route path="partners" element={< Partners/>} /> 
     <Route path="blogs" element={< BlogMain/>} /> 
     <Route path="section" element={<SystemApp/>} /> 
     <Route path="/blog/:category/:id" element={<BlogDetail />} />
          <Route path="*" element={<Footer />} />
        </Route>

        <Route path="/:id/user/confirmation" element={<OrderConfirmation/>} />


     <Route path='/:id' element={<UserLayout/>}>
      <Route index element={<MenuComponent/>}/>
      <Route path="user/menu" element={<HomePage/>} />
      <Route path="user/checkout" element={<CartView/>} />
      <Route path='user/check' element={<Checkout/>}/>
      <Route path="terms" element={<TermsAndConditionsPage />} />
                    <Route path="privacy" element={<PrivacyPolicyPage />} />
                    <Route path="shipping" element={<ShippingPolicyPage />} />
                    <Route path="cancellation" element={<CancellationPolicyPage />} />
     </Route>

     <Route path="pricing" element={<SubscriptionPlan/>} /> 
    

     
        {/* <Route path='/:id/user/menu' element={<HomePage/>}/> */}
{/* <Route path='/:id/user/cartview' element={<CartView/>}/>
<Route path='/:id/user/checkout' element={<Checkout/>}/>
<Route path='/:id/user/confirmation' element={<OrderConfirmation/>}/> */}
<Route path="indexdb" element={<IndexDbItemComponent/>} /> 


        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<LoginForm/>}/>

        {/* <Route path="/login" element={<LoginPage />} /> */}
      <Route path="/admin" element={<PrivateRoute element={AdminLayout} />}>
        <Route index element={<PrivateRoute element={Dashboard} />} />
        <Route path="dashboard" element={<PrivateRoute element={Dashboard} />} />
        <Route path="orders/active" element={<PrivateRoute element={OrderManagement} />} />
        <Route path="order-details/:orderId" element={<PrivateRoute element={OrderDetails1} />} />
        <Route path="orders/all" element={<PrivateRoute element={OrderTable} />} />
        <Route path="menu" element={<PrivateRoute element={Menu} />} />
        <Route path="categories" element={<PrivateRoute element={Categories} />} />
        <Route path="manage" element={<PrivateRoute element={Manage1} />} />
        <Route path="subscriptions" element={<PrivateRoute element={SubscriptionPlan} />} />
        <Route path="policies" element={<PrivateRoute element={PoliciesAndTerms} />} />
        <Route path="notification" element={<PrivateRoute element={Notification} />} />
        <Route path="smtp-setting" element={<PrivateRoute element={SmtpSetting} />} />
        <Route path="support" element={<PrivateRoute element={CustomerSupport} />} />
        <Route path="menu/addmenuitem" element={<PrivateRoute element={AddMenuItem} />} />
        <Route path="menu/edit-item-menu/:menuItemId" element={<PrivateRoute element={AddMenuItem} />} />
        <Route path="account" element={<PrivateRoute element={AdminDetail} />} />
      </Route>
    
      </Routes>
    </Router>
   
    </Provider>
    </RegisterProvider>
  );
}

export default App;

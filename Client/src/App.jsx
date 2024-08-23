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
function App() {
  return (
   <RegisterProvider>
    <Provider store={store}>
   
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<Footer />} />
        </Route>


     
        <Route path='/:id/user/menu' element={<HomePage/>}/>
<Route path='/:id/user/cartview' element={<CartView/>}/>
<Route path='/:id/user/checkout' element={<Checkout/>}/>
<Route path='/:id/user/confirmation' element={<OrderConfirmation/>}/>



        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders/active" element={<OrderManagement />} />
          <Route path="orders/all" element={<OrderTable />} />
          <Route path="menu" element={<Menu />} />
          <Route path="categories" element={<Categories />} />
          <Route path="manage" element={<Manage1 />} />
          <Route path="subscriptions" element={<SubscriptionPlan />} />
          <Route path="policies" element={<Manage1 />} />
          <Route path="notification" element={<Notification />} />
          <Route path="smtp-setting" element={<SmtpSetting />} />
          <Route path="support" element={<CustomerSupport />} />
          <Route path="menu/addmenuitem" element={<AddMenuItem />} />
          <Route path="menu/edit-item-menu/:menuItemId" element={<AddMenuItem />} />
          <Route path="account" element={<AdminDetail />} />
        </Route>

    
      </Routes>
    </Router>
   
    </Provider>
    </RegisterProvider>
  );
}

export default App;

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();


const multer = require('multer');
const upload = multer();
const path=require('path')

app.use(cookieParser());

const db = require('./config/db');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const subcategoryRoutes = require('./routes/subcategoryRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');
const userRoutes = require('./routes/userRoutes');
const userOrderDetailRoutes = require('./routes/userOrderDetailRoutes');
const usePolicyRoutes = require('./routes/policyRoutes');
const supportRoutes = require('./routes/supportRoutes');
const superAdminRoutes = require('./routes/superAdminRoutes');
const conentRoutes=require('./routes/conentRoutes');
const systemRoutes=require('./routes/systemRoutes');
const headerRoutes=require('./routes/headerRoutes');
const footerRoutes=require('./routes/footerRoutes');
const onlineWebRoutes = require('./routes/onlinewebRoutes');
const manageRoutes = require('./routes/manageRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const seamlessRoutes = require('./routes/seamlessRoutes');
const setupRoutes = require('./routes/setupRoutes');
const featureRoutes = require('./routes/featureRoutes');
const serveMoreRoutes = require('./routes/servemoreRoutes');
const shareProfitRoutes = require('./routes/shareprofitRoutes');
const smoothprocessRoutes= require('./routes/smoothprocessRoutes');
const onlinefoodRoutes = require('./routes/onlineFoodRoutes');
const ratingRoutes= require('./routes/ratingRoutes');
const customerRoutes= require('./routes/customerRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const faqRoutes= require('./routes/faqRoutes')
const joinFoodivRoutes = require('./routes/joinFoodivRoutes');
const becomePartnerroutes = require('./routes/becomePartnerroutes');
const partnernetworkRoutes = require('./routes/partnerNetworkRoutes');
const blogRoutes = require('./routes/blogRoutes');
const blogDetailRoutes = require('./routes/blogDetailRoutes');


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    exposedHeaders: ['x-filename']
}));

app.use('/api', authRoutes);
app.use('/api', categoryRoutes);
app.use('/api', subcategoryRoutes);
app.use('/api', menuItemRoutes);
app.use('/api', userRoutes);
app.use('/api', userOrderDetailRoutes);
app.use('/api/policy', usePolicyRoutes);
app.use('/api/support', supportRoutes);
app.use('/api', superAdminRoutes);
app.use('/api', conentRoutes);
app.use('/api/systems', systemRoutes);
app.use('/api/headers', headerRoutes);
app.use('/api/footer', footerRoutes);
app.use('/api', onlineWebRoutes);
app.use('/api', manageRoutes);
app.use('/api', restaurantRoutes);
app.use('/api', seamlessRoutes);
app.use('/api', setupRoutes);
app.use('/api', featureRoutes);
app.use('/api', serveMoreRoutes);
app.use('/api', shareProfitRoutes);
app.use('/api', smoothprocessRoutes);
app.use('/api', onlinefoodRoutes);
app.use('/api', ratingRoutes);
app.use('/api', customerRoutes);
app.use('/api', reviewRoutes);
app.use('/api', faqRoutes);
app.use('/api', joinFoodivRoutes);
app.use('/api', becomePartnerroutes);
app.use('/api', partnernetworkRoutes);
app.use('/api', blogRoutes);
app.use('/api', blogDetailRoutes);


app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use('/public', express.static('public'));

const port = process.env.PORT || 5002;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

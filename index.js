const express = require('express');
const db = require('./database/connection');
const adminRouter = require('./modules/admin/adminRouter').Router
const customerRouter = require('./modules/customer/customerRouter').Router
const sellerRouter = require('./modules/seller/sellerRouter').Router
const uploadRouter = require('./common/commonRouter').Router
const path = require('path');

const port = process.env.PORT || 3000;



  
const app = express();
app.use(express.json());
app.use(express.static('public'));


app.use('/admin',adminRouter)
app.use('/user',customerRouter)
app.use('/seller',sellerRouter)
app.use('/common',uploadRouter)


app.listen(port, ()=>{
    console.log('Connection is set on', port);
})
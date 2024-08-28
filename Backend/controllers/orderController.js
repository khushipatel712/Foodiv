const UserOrderDetail = require('../Models/UserOrderDetail');


exports.postorderDeatils = async (req, res) => {
    try {

        console.log(req.body);
//         userInfo:Object,
//  orderDetails:Object,
//  transactionDetail:Object,
 const order=await UserOrderDetail({
    userInfo:req.body.drawewrData,
    orderDetails:req.body.drawewrData,
    
 })

        // const userOrderDetail = await UserOrderDetail.save();
        res.status(201).json({ message: "hello dev" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// exports.getOrderDetails = async (req, res) => {



// }


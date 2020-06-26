var express = require('express')
var router = express.Router()
const CustomerService = require('../services/customers.service');

// middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })
// define the home page route

//trial route to find out if it works
router.get('/trial', function (req, res) {
    res.send(process.env.SECRET_KEY);
})

//get all customers
router.get("/Cliente",async (req,res,next)=>{
    try{
        const customers= await CustomerService.getCustomers()
        console.log(customers)
        let response={
            Cve_Error:0,
            Cve_Mensaje:"no hay error",
            customers
        }
        res.status(200).json(response)
    }
    catch(e){
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
})


//pseudo get by Id
router.get("/Cliente/:id",async (req,res,next)=>{
    try{
        const customers= await CustomerService.getCustomer(req.params.id)
        console.log(customers)
        let response={
            Cve_Error:0,
            Cve_Mensaje:"no hay error",
            customers
        }
        res.status(200).json(response)
    }
    catch(e){
        console.log(e)
        let response={
            Cve_Error:-e.status,
            Cve_Mensaje:e.message,
        }
        console.log(e.message)
        res.status(500).json(response) && next(e)
    }
})

//create new customer
router.post("/Cliente",async (req,res,next)=>{
    try{
        let customerInfo=req.body
        const newCustomer= await CustomerService.addCustomer(customerInfo)
        let response={
            Cve_Error:0,
            Cve_Mensaje:"no hay error",
            customer:newCustomer
        }
        res.status(200).json(response)
    }
    catch(e){
        console.log(e)
        let response={
            Cve_Error:-e.code,
            Cve_Mensaje:e.message,
        }
        console.log(e.message)
        res.status(500).json(response)  && next(e)
        // res.sendStatus(500) && next(error)
    }
})

router.put('/Cliente/:id', async (req,res,next)=>{
    try{
        let customerInfo=req.body
        const modifiedCustomer= await CustomerService.modifyCustomer(customerInfo,req.params.id)
        let response={
            Cve_Error:0,
            Cve_Mensaje:"no hay error",
            customer:modifiedCustomer
        }
        res.status(200).json(response)
    }
    catch(e){
        console.log(e)
        let response={
            Cve_Error:-e.status,
            Cve_Mensaje:e.message,
        }
        console.log(e.message)
        res.status(500).json(response) && next(e)
    }
})

// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
})


//create new product
// router.post("/products",async (req,res,next)=>{
//     try{
//         let productInfo=req.body
//         const newProduct= await ProductService.addProduct(productInfo)
//         res.status(200).json(newProduct)
//     }
//     catch(e){
//         console.log(e.message)
//         res.sendStatus(500) && next(error)
//     }
// })
// // get product by ID
// router.get("/products/:id",async (req,res,next)=>{
//     // separation of concerns
//     try{
//         const product= await ProductService.getProduct(req.params.id)
//         console.log(product)
//         res.status(200).json(product)
//     }
//     catch(e){
//         console.log(e.message)
//         res.sendStatus(500) && next(error)
//     }
// })
// // modify product by ID
// router.put("/products/:id",async (req,res,next)=>{
//     try{
//         let productInfo=req.body
//         const modifiedProduct= await ProductService.modifyProduct(productInfo,req.params.id)
//         res.status(200).json(modifiedProduct)
//     }
//     catch(e){
//         console.log(e.message)
//         res.sendStatus(500) && next(error)
//     }
// })
// // delete product by ID
// router.delete("/products/:id",async (req,res,next)=>{
//     try{
//         const deletedProduct= await ProductService.deleteProduct(req.params.id)
//         res.status(200).json(deletedProduct)
//     }
//     catch(e){
//         console.log(e.message)
//         res.sendStatus(500) && next(error)
//     }
// })
module.exports = router
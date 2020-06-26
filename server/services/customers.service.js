var Customer=require("../Models/customer.model")
var mongoose =require("mongoose");
var ObjectId = require('mongoose').Types.ObjectId;
const createError = require('http-errors');
// class CoffeeNotFound extends Error {  
//     constructor (message) {
//       super(message)
  
//       this.name = this.constructor.name
//       this.status = 404
//     }
  
//     statusCode() {
//       return this.status
//     }
//   }
// throw new NotEnoughCoffee('Well, you may need another coffee :)')  

function isModel(obj) {
    obj = obj || {}
    return obj.prototype instanceof mongoose.Model
}

let CustomerService={
    async getCustomers(){
        console.log(isModel(Customer))
        const customers= await Customer.find()
        return customers;
    },
    async getCustomer(customerId){
        if(ObjectId.isValid(customerId)){
            if(customerId==new ObjectId(customerId)){
                console.log("es un mongo Id")
                const customer=Customer.findById(customerId)
                return customer;
            }
            else{
                //12 string 
                return {ok:'12 string'}
            }
        }
        else{
            //non 12 string
            customers= await Customer.find().sort('field Fecha_Creacion')
            if(customerId>customers.length || customerId<1){
                // return {ok:'out of boundaries'}
                let err=createError(403,'out of boundaries')
                throw err
            }
            else{
                console.log(customers[customerId-1])
                return customers[customerId-1]
                // return {ok:'something else'}
            }
        }      
    },
    async modifyCustomer(customerInfo,customerId){
        if(ObjectId.isValid(customerId)){
            if(customerId==new ObjectId(customerId)){
                console.log("es un mongo Id")
                const customer=await Customer.findByIdAndUpdate(customerId,customerInfo,{new:true})
                return customer
            }
            else{
                //12 string 
                return {ok:'12 string'}
            }
        }
        else{

        }
    },
    // deleteProduct(productId){
    //     return Product.findByIdAndDelete(productId).then((product)=>{
    //         return product
    //     })
    // },

    async addCustomer(customerInfo){
        return await Customer.create(customerInfo).then((customer)=>{
            return customer
        })
        // return await Customer.create(customerInfo).then((customer)=>{
        //     return customer
        // }).catch((e)=>{
        //     // console.log("super error")
        //     // console.log(e.message)
        //     return e
        // })
    }
}

module.exports=CustomerService;
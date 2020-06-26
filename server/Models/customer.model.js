//Dependencies
var mongoose=require("mongoose");
mongoose.set('debug', true);
var Schema = mongoose.Schema;
const emailValidator=require('email-validator');

//Schema
var customerSchema=new Schema({
    Nombre_Usuario:{
        type:String,
        required:true,
        trim:true,
        index:{unique:true},
        minlength:3,
    },
    Correo_Electronico:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        index:{unique:true},
        validate:{
            validator:emailValidator.validate,
            message:props=>`${props.value} is not a valid email address!`,
        }
    },
    Contraseña:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        index:{unique:true},
    },
    Nombre:String,
    Apellidos:String,
    Edad:String,
    Estatura:String,
    Peso:String,
    IMC:String,
    GEB:String,
    ETA:String,
    },
    {
        timestamps:{
            createdAt:'Fecha_Creacion',
            updatedAt:'Fecha_Actualizacion'
        },
        collection: 'MYCUSTOMERS' 

    }
)

//Return model
module.exports=mongoose.model("customer",customerSchema)

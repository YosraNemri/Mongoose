const mongoose= require("mongoose");
const Schema=mongoose.Schema

const personSchema= new Schema({
 name:{type:String, required:true},
 age:Number,
 email:{type:String,required:true,unique:true},
 favoriteFoods: Array,
})

module.exports=mongoose.model("Person",personSchema)
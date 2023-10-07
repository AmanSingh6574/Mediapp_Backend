
const mongoose = require("mongoose");

const DialysisSchema = new mongoose.Schema({
    DateOfTreatment : {
        type : Date ,
        default : Date.now() 
    },
    WeightBeforeDialysis : {
        type : Number
    },
    WeightAfterDialysis : {
        type : Number
    },
    Bp : {
        type : Number
    },
    PulseRte:{
        type : Number
    },
    Ufgoal : {
        type : Number
    },
    venousPressure:{
        type : Number
    },
    Bloodflow : {
        type : Number
    },
    temperature:{
        type : Number
    },
    AdminDetails : {
        type : String , 
        required : true 
    }
    

});
module.exports = mongoose.model("DialysisData" , DialysisSchema);
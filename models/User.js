
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        firstName:{
            type : String , 
            required : true ,
            trim : true 
        },
        lastName:{
            type : String , 
            required : true ,
            trim : true 
        },
        email:{
            type : String , 
            required : true ,
            trim : true 
        },
        password: {
			type: String,
			required: true,
		},
        approved: {
			type: Boolean,
			default: true,
		},  
        accountType: {
			type: String,
			enum: ["Admin", "Patient"],
			required: true,
		},
        image: {
            type: String,
            required: true,
        },
        token : {
            type:String
        },
        additionalDetails: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Profile",
		},
        userHealthDataDetails:[
           {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "DialysisData",
           }
        ],
    }
);

module.exports = mongoose.model("user" , UserSchema);
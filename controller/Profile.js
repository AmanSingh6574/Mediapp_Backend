const profile = require("../models/Profile");
const user = require("../models/User");

exports.updateProfile = async(req,res) => {
    try{

        const {dateOfBirth = "" , gender = "" , contactNumber = ""} = req.body ; 
        const id = req.user.id ; 

        const userDetails = await user.findById(id);

        const UserProfile = await profile.create({
            dateOfBirth : dateOfBirth ,
            gender : gender ,
            contactNumber : contactNumber 
        })

        userDetails.additionalDetails = UserProfile

        return res.json({
            message: "Profile updated successfully",
			data : userDetails
        })

    }catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
}


exports.deleteAccount = async (req, res) => {
	try {
	
		const id = req.user.id;
		
		const User = await user.findById(id);
		if (!User) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}
	
		await profile.findByIdAndDelete({ _id: User.additionalDetails });
		await User.findByIdAndDelete({ _id: id });
		res.status(200).json({
			success: true,
			message: "User deleted successfully",
		});
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ success: false, message: "User Cannot be deleted successfully" });
	}
};


exports.getAllUserDetails = async (req, res) => {
	try {
        // console.log("in");
		const id = req.user.id;
		const userDetails = await user.findById(id)
			.populate("additionalDetails")
			.populate("userHealthDataDetails")
			.exec();
		    console.log(userDetails);
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error,
		});
	}
};
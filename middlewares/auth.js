const jwt = require("jsonwebtoken");

//auth
exports.auth = async (req, res, next) => {
    try{

    
        const token = req.cookies.token 
                        || req.body.token 
                        || req.header("Authorization").replace("Bearer ", "");
   
        // console.log(token);
        if(!token) {
            return res.status(401).json({
                success:false,
                message:'TOken is missing',
            });
        }

     
        try{
            const decode =  jwt.verify(token, "AMAN");
            // console.log(decode);
            req.user = decode;
        }
        catch(err) {
            //verification - issue
            console.log("verification - issue")
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    }
    catch(error) {  
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
        });
    }
}
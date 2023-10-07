
const express = require("express");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoutes = require("./routes/User")
const profileRoutes = require("./routes/Profile");
const DialysisRoutes = require("./routes/DialysisData")
const app = express();
const PORT = 4000 ; 

database.connect();

app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.use("/v1/auth" , userRoutes);
app.use("/v1/profile" , profileRoutes);
app.use("/v1/Dialysis" , DialysisRoutes)


app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})


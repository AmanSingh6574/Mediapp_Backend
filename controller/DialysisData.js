const user = require("../models/User");
const dialysisSchema = require("../models/Dialysis");

exports.AddData = async (req, res) => {
    try {
      const {
        DateOfTreatment,
        WeightBeforeDialysis,
        WeightAfterDialysis,
        Bp,
        temperature,
        Bloodflow,
        venousPressure,
        Ufgoal,
        PulseRte,
        AdminDetails
      } = req.body;
  
      const Patient_id = req.body.Patient_id;
      const Admin_id = req.user.id;
  
      const User = await user
        .findById(Patient_id)
        .populate("userHealthDataDetails");
  
      const Admin = await user.findById(Admin_id);
  
      if (!User || !Admin || Admin.accountType !== "Admin") {
        return res.status(401).json({
          message: "Please provide all data or unauthorized access",
        });
      }
  
      const UpdatedialysisSchema = await dialysisSchema.create({
        DateOfTreatment,
        WeightBeforeDialysis,
        WeightAfterDialysis,
        Bp,
        temperature,
        Bloodflow,
        venousPressure,
        Ufgoal,
        PulseRte,
        AdminDetails: Admin.firstName
      });
  
      // Push the newly created dialysis entry into the user's health data array
      User.userHealthDataDetails.push(UpdatedialysisSchema);
      await User.save();
  
      return res.json({
        message: "userHealthDataDetails updated successfully",
        User_Data: User,
        Admin_Data: Admin
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  };
  

  exports.UpdateData = async (req, res) => {
    try {
      const {
        DateOfTreatment,
        WeightBeforeDialysis,
        WeightAfterDialysis,
        Bp,
        temperature,
        Bloodflow,
        venousPressure,
        Ufgoal,
        PulseRte,
        HealthData_id
      } = req.body;
  
      const Patient_id = req.body.Patient_id;
      const currentUser = req.user; // Assuming you have user information stored in req.user
  
      // Find the patient by ID
      const Patient = await user.findById(Patient_id);
  
      if (!Patient) {
        return res.status(404).json({
          message: "Patient not found",
        });
      }
  
      // Find the health data entry by ID
      const HealthData = await dialysisSchema.findById(HealthData_id);
  
      if (!HealthData) {
        return res.status(404).json({
          message: "Health data not found",
        });
      }
  
      // Check if the user performing the update is authorized
      if (
        currentUser.accountType !== "Admin"
      ) {
        return res.status(401).json({
          message: "Unauthorized to update this health data",
        });
      }
  
      // Update the health data
      const admin = await user.findById(currentUser.id);
      console.log(admin)
      if (DateOfTreatment) HealthData.DateOfTreatment = DateOfTreatment;
      if (WeightBeforeDialysis) HealthData.WeightBeforeDialysis = WeightBeforeDialysis;
      if (WeightAfterDialysis) HealthData.WeightAfterDialysis = WeightAfterDialysis;
      if (Bp) HealthData.Bp = Bp;
      if (temperature) HealthData.temperature = temperature;
      if (Bloodflow) HealthData.Bloodflow = Bloodflow;
      if (venousPressure) HealthData.venousPressure = venousPressure;
      if (Ufgoal) HealthData.Ufgoal = Ufgoal;
      if (PulseRte) HealthData.PulseRte = PulseRte;
      HealthData.AdminDetails = admin.firstName
  
      // Save the updated health data
      await HealthData.save();
  
      return res.json({
        message: "Health data updated successfully",
        Updated_Data: HealthData,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  };
  

const mongoose=require("mongoose");
const athleteSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    dob:{
        type:Date
    },
    location:{
        type:String
    },
    team:{
        type:String
    },
    gender:{
        type:String
    },
    sports:{
        type:String
    },
    about:{
        type:String
    },
    interests:{
        type:String
    },
    profileImage:{
        type:String
    },
});

const Athlete=mongoose.model("Athlete",athleteSchema);
module.exports=Athlete;

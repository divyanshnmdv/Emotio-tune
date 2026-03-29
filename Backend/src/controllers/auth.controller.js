const userModel = require("../models/user.model");
const redis = require("../config/cache")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");




async function registerUser(req, res){
   const {username,email,password} = req.body

    const isAlreadyRegistered =  await userModel.findOne({$or:
        [{username},
         {email}
        ]}).select("+password")
    
    if(isAlreadyRegistered){
        return res.status(400).json({
            message:"User Already Exists"
        })
    }

    const hash = await bcrypt.hash(password,10)

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign({
        id: user._id,
        username: user.username
    },process.env.JWT_SECRET,
    {
    expiresIn: "3d"
    })

    res.cookie("token",token)

    return res.status(201).json({
        message: "User Resistered succesfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    })


}

async function loginUser(req, res){

    const {username, email, password} = req.body

    const user = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    }).select("+password")

    if(!user){
        return res.status(400).json({
            message:"Invalid Credentials"
        })
    }
     
     const isPasswordValid = await bcrypt.compare(password, user.password)

     if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid Passowrd"
        })
     }


     const token = jwt.sign(
        {
            id : user._id,
            username: user.username
        },process.env.JWT_SECRET,
        {
            expiresIn:"3d"
        }
     )

     res.cookie("token",token)

     return res.status(200).json({
        message:"User LoggedIn Successfully",
        user
     })

     

}

async function getMe(req,res){
    const user = await userModel.findById(req.user.id)

    res.status(200).json({

        message:"User Fethched Successfully",
        user
    })
}

async function logoutUser(req,res){
    const token = req.cookies.token
    res.clearCookie("token")
    
    await redis.set(token, Date.now().toString(),"EX",60*60)
    res.status(200).json({
        message:"Logout Successfully"
    })
}



module.exports = {registerUser, loginUser,getMe, logoutUser}
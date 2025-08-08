import user from "../models/user.js";

const getUser = async(req,res,next)=>{
    const email =req.email;
    console.log(email)
    try {
        const findUser = await user.findOne({email:email});
        res.status(200).json({
            message:"success",
            status:true,
            user:{name:findUser.name,email: findUser.email},
        });
    } catch (error) {
        next(error)
    }


}
export default getUser;
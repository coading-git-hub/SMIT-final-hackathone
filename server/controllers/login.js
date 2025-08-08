import user from "../models/user.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcrypt";

const login = async(req, res, next) => {
    const{email, password} = req.body;
    try{
        const findUser =await user.findOne({email:email});
        if (!findUser){
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        const isPassMatch = await bcrypt.compare(password, findUser.password);
        if (!isPassMatch){
            const error = new Error("Incorrect password");
            error.statusCode = 401;
            throw error;
        }
        const accessToken = generateToken(findUser.email);
        res.cookie("accessToken", accessToken,{
            sameSite: "lax",
            secure: false,
            httpOnly: true,
        })
        res.status(200).json({
            message: "Login successfully",status:true})
        }
            catch(error){
next(error);
            }
}
export default login;


// import generateToken from "../utils/generateToken.js";
// import bcrypt from "bcrypt";

// const login = async (req, res, next) => {
//   const { email, password } = req.body;
//   try {
//     console.log("Login Email:", email);

//     const findUser = await user.findOne({ email: new RegExp(`^${email}$`, 'i') });

//     if (!findUser) {
//       const error = new Error("User not found");
//       error.statusCode = 404;
//       throw error;
//     }

//     const isPassMatch = await bcrypt.compare(password, findUser.password);
//     if (!isPassMatch) {
//       const error = new Error("Incorrect password");
//       error.statusCode = 401;
//       throw error;
//     }

//     const accessToken = generateToken(findUser.email);
//     res.cookie("accessToken", accessToken, {
//       sameSite: "none",
//       secure: true,
//       httpOnly: true,
//     });

//     res.status(200).json({
//       message: "Login successfully",
//       status: true,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export default login;

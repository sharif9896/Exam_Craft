import  jwt  from 'jsonwebtoken';

const authHeaderforall = async (req, res, next) =>{
    const authHeader = req.headers.authorization;
    if(!authHeader && !authHeader.startsWith('Bearer')){
        return res.status(402).json({message: "Sorry! Token must be required.."});
    }

    try{
        const token = authHeader.split(" ")[1];
        // console.log(token);
        const decode = jwt.verify(token, process.env.JWT_ADMIN);
        // console.log(decode);
        req.adminId = decode._id;
        req.adminid = decode.id;
        next();
    }catch(err){
        return res.status(400).json({message: "Error in authentication middleware!", err});
    }
}
export default authHeaderforall;
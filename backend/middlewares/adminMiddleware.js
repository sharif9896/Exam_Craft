import jwt from 'jsonwebtoken';

const authHeaderforall = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Corrected check logic
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Sorry! Token must be required.." });
    }

    try {
        const token = authHeader.split(" ")[1];
        const decode = jwt.verify(token, process.env.JWT_ADMIN);
        
        // Ensure these match your actual JWT payload structure
        req.adminId = decode._id;
        req.adminid = decode.id; 
        
        next();
    } catch (err) {
        // This triggers the red toast in your screenshot
        return res.status(401).json({ message: "Error in authentication middleware!", error: err.message });
    }
}
export default authHeaderforall;
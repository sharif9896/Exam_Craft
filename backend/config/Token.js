import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    console.log("JWT Secret:", process.env.JWT_SECRET); // Should NOT be undefined
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};
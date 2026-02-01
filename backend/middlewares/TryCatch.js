const TryCatch = (fn) => {
    try{
        return async (req, res, next) => {
            await fn(req, res, next);
        }
    }catch(err){
        return res.status(500).json({ message: "Internal Server Error!", error: err.message });
    }
};

export default TryCatch;
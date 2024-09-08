import jwt from "jsonwebtoken"

export const authorization = (req , res , next) =>{
    try {

        const authHeader = req.header("authorization");
        if (!authHeader) {
            return res.status(401).json({ message: 'Unauthorized auth',  status: false });
        }
        var token = authHeader.split(' ')[1];
        // console.log(token)
        if (!token || token === "") {
            return res.status(401).json({ message: 'Unauthorized token',  status: false });
        }

        let decodedToken = null;

        try {
            // Verify token and handle expiration
            decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                // Handle token expiration error
                return res.status(401).json({ message: 'Token expired', status: false });
            } else {
                // Handle other token errors (e.g., signature invalid)
                return res.status(401).json({ message: 'Invalid token', status: false });
            }
        }


        if (!decodedToken) {
            req.isAuth = false;
            return res.status(401).json({  msg: "Unauthorized dtokekn" , status: 0 });
        }

        if (decodedToken) {
            req.userId = decodedToken.uuid
            return next();
        };


    } catch (error) {
        console.log(error);
        return res.status(401).json({  msg: "Unauthorized" ,status: 0});
    }
}
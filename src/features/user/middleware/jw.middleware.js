
import jwt from "jsonwebtoken"

const jwtAuth = (req, res, next) => {
    // 1 . read token in header of each request
    const token = req.headers["authorization"];
    // 2 . if no token return error
    if (!token) {
        res.status(401).send("Unauthorize User");
    }

    // 3 . verify token 
    try {
        const payload = jwt.verify(token, "asjkhgbjkhabkjfguhflkh");
        req.userId = payload.userID;
        // console.log(payload);
    }
    catch (err) {

        return res.status(401).send("Unauthorised");
    }
    // 4 . call the next middleware
    next();

}

export default jwtAuth;

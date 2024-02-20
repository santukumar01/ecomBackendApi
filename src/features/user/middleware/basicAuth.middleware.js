
import { UserModel } from "../features/user/user.model.js";
// creating a middleware

// http Headers is an array

const basicAuth = (req, res, next) => {
    // 1. check if authorization header is emphty
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        res.status(404).send("No authorization detalis found");
    }

    console.log(authHeader);      // "Basic ajkshgbajklhwbvk;jnb"

    // Extacrt credenatiatianl form header
    const base64Credentials = authHeader.replace('Basic', '');
    // console.log(base64Credentials);

    //Decode Credetails 

    const decodedCred = Buffer.from(base64Credentials, 'base64').toString('utf8');

    // console.log(decodedCred); // "username : passwaord"

    const creds = decodedCred.split(':');  // return an array  

    const user = UserModel.getAll().find(u => u.email == creds[0] && u.password == creds[1]);

    if (!user) {
        res.status(401).send("Invalid credemtials");
    }
    else {
        next();
    }

}

export default basicAuth;
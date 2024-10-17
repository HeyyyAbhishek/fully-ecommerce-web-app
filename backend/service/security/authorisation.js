const jwt = require("jsonwebtoken");
require("dotenv").config();
const config = process.env;

const authorisation = (role) => {
    return (req, res, next) => {
        let user = req.signedCookies;
        const {id,username,email,isSeller} = user?.user;
        const xAccessToken = user?.user?.token;
        if (xAccessToken) {
            const decoded = jwt.verify(xAccessToken, config.TOKEN_KEY);
            user = decoded.user.account_type;
            if(isSeller === true){
                user = "seller";
            }
            if (convertToRole(user) >= convertToRole(role)) {
                return next();
            }
        }
        return res.status(401).send({
            auth: false,
            message: "You are not authorised to access this page.",
            status: 401,
            payload: null,
        });
    };
};

const convertToRole = (role) => {
    switch (role) {
        case "user":
            return 1;
        case "seller":
            return 2;
        case "admin":
            return 3;
        default:
            return 0;
    }
}

module.exports = authorisation;
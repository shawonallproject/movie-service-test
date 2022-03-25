require('dotenv').config()
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

/**User Authorization Token Verification */
exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization']
    
    if (token) {
        jwt.verify(token, secret, function (err, decoded) {
            if (!err) {
                req.user = decoded;
                next();
            }else{
                return res.status(401).send({
                    success: false,
                    message: 'Invalid token.'
                })
            }
        });
    }else {
        return res.status(401).send({
            success: false,
            message: 'No token provided.'
        })
    }
}




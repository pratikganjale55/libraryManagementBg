const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    console.log("Received token:", token, SECRET_KEY); 

    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }

    try {
        const verified = jwt.verify(token, SECRET_KEY);
        console.log("Verified user:", verified); 
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

module.exports = authMiddleware;

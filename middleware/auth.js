const jwt = require('jsonwebtoken');

function auth(req, res, next){
    const token = req.header('x-auth-token');
    const error = {result:"failed", message:' Access denied. No token provided' }
    if(!token) return res.status(401).send(error);
    try{
        const decoder = jwt.verify(token, 'jwtPrivateKey');
        req.user = decoder;
        next();
    }catch (ex) {
        res.status(401).send('Invalid Token');
    }
}

module.exports = auth;
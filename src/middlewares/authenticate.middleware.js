//npm install jsonwebtoken
import jwt from 'jsonwebtoken';
import 'dotenv/config.js'

export function authenticateToken(req, res, next) {
    //Obtenermos el jwt de la cabecera de la autorizacion
    const authHeader = req.headers['authorization'];
    console.log('authHeader', authHeader);
    
    const token = authHeader && authHeader.split(' ')[1];
    console.log('token', token);

    if(!token) return res.sendStatus(401);
    //Verificamos y decodificacmos el token
    const secret = process.env.JWT_SECRET;
    jwt.verify(token, secret, (err, user) => {
        if (err){
            console.log('error', err);
            return res.sendStatus(403);
        }
        
        console.log('user', user);
        
        req.user = user;
        next();
    });
}

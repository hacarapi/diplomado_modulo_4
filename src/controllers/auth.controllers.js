import { User } from '../models/users.js';
import logger from '../logs/logger.js';
import { comparar } from '../common/bycrypt.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
async function login(req, res) {
    try {
        const { username, password } = req.body;
        console.log(username, password);
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!(await comparar(password, user.password))) {
            return res.status(403).json({ message: 'Usuario no Autorizado' });
        }
        const secret = process.env.JWT_SECRET;
        const seconds = process.env.JWT_EXPIRES_SECONDS;
        const token = jwt.sign(
            { userId: user.id }, 
            secret, 
            { expiresIn: eval(seconds) }
        );
        res.json({ token });
    } catch (error) {
        logger.error('Error Login: ' + error);
        return res.status(500).json({ message: 'Server Error' });
    }
};

export default {
    login
};
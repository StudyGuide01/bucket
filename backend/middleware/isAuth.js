import jwt from 'jsonwebtoken';

const isAuth = async(req, res, next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message:'User not authorized',success:false})
        }
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        req.id = decode.userId;
        next();
    } catch (error) {
        console.log('errot while get token')
    }
}
export default isAuth
import jwt from 'jsonwebtoken'

export const userSignup = async (req, res, next)=>{
    try {
        
    } catch (error) {
        console.log(chalk.redBright("user-signup error:",error));
        next(error)
    }
}
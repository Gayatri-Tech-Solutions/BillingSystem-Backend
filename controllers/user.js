import userUtils from "../utils/user.js"
import bcrypt from "bcrypt"
import jwt  from "jsonwebtoken"
import prisma from "../utils/database.js"
export const login =async  (req ,res) =>{

    try{

        let {email , password }= req.body
        let response = await userUtils.login({email , password})

        let data = {
            uuid : response.uuid,
            email : response.email
        }

        let secretKey = process.env.SECRET_KEY

        let token = jwt.sign(data , secretKey)

        return res.status(200).json({
            status : true,
            data :{...response , token}
        })

    }catch(error){
        console.log(error)
        return res.status(402).json({
            status : false,
            error : error.message
        })
    }
}

export const register = async (req ,res) =>{

    console.log(req.body)
    let {email , password , name } = req.body
    try{

        let findEmail = await prisma.user.findFirst({
            where:{
                email
            }
        })
        if(findEmail){
            throw new Error("User Already Exist")
        }else{
            let encryptedPassword  = bcrypt.hashSync(password , 10)
            let response = await userUtils.register({email , name , encryptedPassword})

            delete(response.password)
            return res.status(200).json({
                status : true,
                data : response
            })
        }


    }catch(error){
        console.log(error)
        return res.status(402).json({
            status : false,
            error : error.message
        })
    }

}


export const details = async (req,res) =>{
    try{
        let uuid = req.userId
        console.log(uuid)
        let response = await prisma.user.findFirst({
            where:{
                uuid 
            }
        })
        delete response.password
        console.log("response")
        console.log(response)
        return res.status(200).json({
            status : true,
            data : response
        })
    }catch(error){
        console.log(error)
        return res.status(402).json({
            status : false,
            error : error.message
        })
    }
}
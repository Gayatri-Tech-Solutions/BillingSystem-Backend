import prisma from '../utils/database.js'
import bcrypt from "bcrypt"

const register = async({email , name , encryptedPassword}) =>{
    console.log(email , name , encryptedPassword)
    return await prisma.user.create({
        data:{
            name ,
            email ,
            password : encryptedPassword
        }
    })

}

const login = async({email , password }) =>{
    let findEmail =await prisma.user.findFirst({
        where:{
            email
        }
    })

    console.log(findEmail)



    if(findEmail){
        let comparison = bcrypt.compareSync(password , findEmail.password )

        if(comparison){
            delete findEmail.password
            return findEmail
        }else{
            throw new Error("Incorrect Password")
        }

    }else{
        throw new Error("Email Not Found")
    }
}

export default {
    register,
    login
}
import customerUtils from "../utils/customer.js"
import prisma from "../utils/database.js"

export const addNewCust = async(req ,res) =>{
    console.log(req.body)
    let { name,gst,phone,email,houseNo,locality,city,stateName,pin , countryName} = req.body
    try{
        console.log(req.body)

        let response = await customerUtils.addCustomer({name,gst,phone,email,houseNo,locality,city,stateName,pin , countryName})


        return res.status(200).json({
            status : true ,
            response
        })

    }catch(error){
        console.log(error)
        return res.status(402).json({
            status : false ,
            error : error.message
        })
    }

}


export const getAllCustomers = async(req , res)=>{
    try{
        let response = await prisma.customers.findMany({
            include:{
                address:true
            }
        })

        return res.status(200).json({
            status : true,
            response : response
        })
    }catch(error){
        console.log(error)
        return res.status(402).json({
            status : false,
            error : error
        })
    }
}
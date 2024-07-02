import { connect } from "http2"
import prisma from "./database.js"

const addCustomer = async ({name,gst,phone,email,houseNo,locality,city,stateName,pin , countryName}) =>{

    let response = await prisma.customers.create({
        data:{
            name,
            gst,
            phone,
            email
        }
    })

    console.log(response)

    return await prisma.address.create({
        data:{
            houseno : houseNo,
            locality,
            city,
            state :stateName,
            pin : parseInt(pin),
            country : countryName,
            customer:{
                connect:{
                    id : response.id
                }
            }
        }
    })

}

export default {
    addCustomer
}
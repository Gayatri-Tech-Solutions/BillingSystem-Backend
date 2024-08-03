import { connect } from "http2"
import prisma from "./database.js"

const addCustomer = async ({name,gst,phone,email,houseNo,locality,city,state,pin , country}) =>{

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
            state :state,
            pin : parseInt(pin),
            country : country,
            customer:{
                connect:{
                    id : response.id
                }
            }
        }
    })

}

const updateCustomer = async({name,gst,phone,email,houseNo,locality,city,state,pin , country}) =>{
    let customerUpdateResponse = await prisma.customers.update({
        where: { gst: gst },
        data: {
            name,
            phone,
            email
        }
    });
    // Update address details
    let addressUpdateResponse = await prisma.address.updateMany({
        where: { customerId: customerUpdateResponse.id },
        data: {
            houseno: houseNo,
            locality,
            city,
            state: state,
            pin: parseInt(pin),
            country: country
        }
    });

    console.log('Address updated:', addressUpdateResponse);
    return addressUpdateResponse

}

export default {
    addCustomer,
    updateCustomer
}
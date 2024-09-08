import { connect } from "http2"
import prisma from "./database.js"

const addCustomer = async ({ name, gst, phone, email, houseNo, locality, city, state, pin, country, id }) => {

    let response = await prisma.customers.create({

        data: {
            name,
            gst,
            phone,
            email,
            user: {
                connect: {
                    id: parseInt(id)
                }
            },
        }
    })



    return await prisma.address.create({

        data: {
            houseno: houseNo,
            locality,
            city,
            state: state,
            pin: parseInt(pin),
            country: country,
            user: {
                connect: {
                    id: parseInt(id)
                }
            },
            customer: {
                connect: {
                    id: response.id
                }
            }
        }
    })

}

const updateCustomer = async ({ name, gst, phone, email, houseNo, locality, city, state, pin, country, id }) => {

    let customerUpdateResponse = await prisma.customers.update({
        where: {
            id: parseInt(id),
        },
        data: {
            name,
            phone,
            email
        }
    });
    // Update address details
    let addressUpdateResponse = await prisma.address.updateMany({
        where: {
            customerId: customerUpdateResponse.id
        },
        data: {
            houseno: houseNo,
            locality,
            city,
            state: state,
            pin: parseInt(pin),
            country: country
        }
    });


    return addressUpdateResponse

}

export default {
    addCustomer,
    updateCustomer
}
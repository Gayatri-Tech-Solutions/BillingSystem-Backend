
import { connect } from "http2"
import customer from "./customer.js"
import prisma from "./database.js"




const generateInvoice = async ({ item, gst, billNo, status, amount, id, totalAmount, tax, customerData, userid, createdAt }) => {

    return await prisma.invoice.create({
        data: {
            item,
            totalAmount,
            tax,
            customerData,
            gst,
            billNo,
            amount,
            status,
            createdAt,
            customer: {
                connect: {
                    id: id
                }
            },
            user: {
                connect: {
                    id: parseInt(userid)
                }
            }
        },


    })
}

export default {
    generateInvoice
}
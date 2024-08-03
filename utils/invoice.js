
import { connect } from "http2"
import customer from "./customer.js"
import prisma from "./database.js"




const generateInvoice = async({item, gst, billNo, status , amount, id ,totalAmount , tax , customerData}) =>{
    console.log("data")
    // console.log(data)
    return await prisma.invoice.create({
        data:{
            item,
            totalAmount,
            tax,
            customerData,
            gst,
            billNo,
            amount,
            status ,
            customer: {
                connect: {
                  id: id
                }
              }
        },


    })
}

export default {
    generateInvoice
}
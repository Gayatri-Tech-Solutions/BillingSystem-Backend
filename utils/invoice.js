
import prisma from "./database.js"




const generateInvoice = async({data}) =>{
        console.log(data)


    return await prisma.invoice.create({
        data:data
    })
}

export default {
    generateInvoice
}
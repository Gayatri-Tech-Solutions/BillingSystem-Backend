import prisma from "../utils/database.js"
import InvoiceUtils from "../utils/invoice.js"
export const generateInvoice = async(req , res) =>{

    try{

            let billNo = 0

                req.body.type == 'BILL' ? billNo=await generateBillNumber("B") : billNo=await generateBillNumber("E")

            let data = {
                ...req.body,
                billNo
            }
            console.log(data)
            let response = await InvoiceUtils.generateInvoice({data})

            return res.status(200).json({
                status : true,
                data : billNo
            })
        }catch(error){
            console.log(error)
            return res.status(402).json({
                status : false,
                error : error
            })
        }

}

export const getInvoices = async(req , res) =>{
    try{

        let response = await prisma.invoice.findMany({
            include:{
                customer:{
                    include:{
                        address:true
                    }
                }
            }
        })

        return res.status(200).json({
            status : true,
            data : response
        })
    }catch(error){
        console.log(error)
        return res.status(402).json({
            status : false,
            error : error
        })
    }
}



async function generateBillNumber(type) {
    console.log(type)
    const today = new Date();
    const month = ('0' + (today.getMonth() + 1)); // Add leading zero if month < 10
    const year = today.getFullYear().toString().slice(-2); // Extract last two digits of the year
    let query = {}
    type == 'B' ? query.type = "BILL" : query.type = "ESTIMATE"
    const billsCountThisMonth = await prisma.invoice.count({
      where: {
        createdAt: {
          gte: new Date(today.getFullYear(), today.getMonth(), 1), // Start of current month
          lt: new Date(today.getFullYear(), today.getMonth() + 1, 0), // End of current month
        },
        ...query
      },
    });

    return `${type}${billsCountThisMonth + 1}${month}${year}`;
  }
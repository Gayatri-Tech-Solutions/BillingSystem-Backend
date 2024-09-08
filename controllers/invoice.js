import { Action } from "@prisma/client"
import customer from "../utils/customer.js"
import prisma from "../utils/database.js"
import InvoiceUtils from "../utils/invoice.js"
import { stat } from "fs"
export const generateInvoice = async (req, res) => {

    try {

        const { gst, uuid, id, item, amount, totalAmount, tax, customerData, updateLedger, createdAt } = req.body
        let { userid } = req.query
        userid = parseInt(userid)

        let billNo = 0
        let led = {}

        // if (updateLedger) {


        //     let ledgerResponse = await prisma.ledger.findMany({
        //         where: {
        //             customerId: uuid
        //         },
        //         orderBy: { createdAt: 'desc' }
        //     })

        //     let data = {}
        //     if (ledgerResponse.length > 0) {
        //         data = {
        //             prevAmount: ledgerResponse[0].newAmount,
        //             type: "Debit",
        //             newAmount: amount,
        //             total : Math.ceil(amount + ledgerResponse[0].newAmount)
        //         }
        //     } else {
        //         data = {
        //             prevAmount: 0,
        //             type: "Debit",
        //             newAmount: amount,
        //             total: amount
        //         }
        //     }

        //     led = await prisma.ledger.create({
        //         data:{
        //             ...data,
        //         customer:{
        //             connect:{
        //                 uuid : uuid
        //             }
        //         }
        //     }
        //     })
        //     console.log("led")
        //     console.log(led)
        // }
        billNo = await generateBillNumber("B", userid)

        let data = {
            gst,
            item,
            amount,
            status: 'Pending',
            billNo,
            userid,
        }
        // customerData.ledgerDetails = led.id || null
        let response = await InvoiceUtils.generateInvoice({ ...data, id, totalAmount, tax, customerData, createdAt })

        return res.status(200).json({
            status: true,
            data: "billNo"
        })
    } catch (error) {

        return res.status(402).json({
            status: false,
            error: error
        })
    }

}

export const getInvoices = async (req, res) => {
    try {
        let { page } = req.query
        let { userid } = req.query
        userid = parseInt(userid)

        let skip = (parseInt(page) - 1) * 8
        let take = 8
        let count = await prisma.invoice.count()

        let response = await prisma.invoice.findMany({
            where: {
                userId: userid
            },
            include: {
                customer: {
                    include: {
                        address: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' },
            skip: skip,
            take: take
        })
        count = Math.ceil(parseInt(count) / 8)

        return res.status(200).json({
            status: true,
            data: response,
            pageCount: count
        })
    } catch (error) {

        return res.status(402).json({
            status: false,
            error: error
        })
    }
}

export const updatedInvoiceStatus = async (req, res) => {
    try {
        let { billNo, id, status, amount } = req.body
        let { userid } = req.query
        userid = parseInt(userid)


        // let ledgerResponse = await prisma.ledger.findMany({
        //     where: {
        //         customerId: uuid
        //     },
        //     orderBy: { createdAt: 'desc' }
        // })



        let response = await prisma.invoice.update({
            where: {
                billNo,
                id,
                userId: userid
            },
            data: {
                status
            }

        })
        return res.status(200).json({
            status: true,
            data: "response"
        })

    } catch (err) {

        return res.status(400).json({
            status: false,
            error: err
        })
    }
}


export const filterResult = async (req, res) => {
    try {
        let { billNo, customerName, endDate, startDate, status, page } = req.query
        let { userid } = req.query
        userid = parseInt(userid)
        let query = {}

        let skip = (parseInt(page) - 1) * 8
        let take = 8



        if (billNo != "") {
            billNo = billNo.toUpperCase()
            query.billNo = billNo

        }
        if (customerName != "") {
            customerName = customerName.toLowerCase().trim()
            query.customer = {
                name: {
                    contains: customerName,
                }
            };


        }
        if (status != "") {
            query.status = status
        }
        if (startDate != "" && endDate != "") {
            const startdate = new Date(startDate)
            const enddate = new Date(endDate)
            const startOfDay = new Date(startdate.setUTCHours(0, 0, 0, 0));
            const endOfDay = new Date(enddate.setUTCHours(23, 59, 59, 999));
            query.createdAt = {
                gte: startOfDay,
                lte: endOfDay
            }
        } else if (startDate != "") {
            const date = new Date(startDate)
            const startOfDay = new Date(date.setUTCHours(0, 0, 0, 0));
            const endOfDay = new Date(date.setUTCHours(23, 59, 59, 999));

            query.createdAt = {
                gte: startOfDay,
                lte: endOfDay
            }
        }


        let count = await prisma.invoice.count({
            where: {
                userId: userid,
                ...query
            }
        })
        count = Math.ceil(parseInt(count) / 8)

        let response = {}
        response = await prisma.invoice.findMany({
            where: {
                ...query,
                userId: userid
            },
            include: {
                customer: true
            },
            skip: skip,
            take: take
        })
        res.status(200).json({
            status: true,
            data: response,
            pageCount: count
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            error
        })
    }
}

async function generateBillNumber(type, userId) {

    const today = new Date();
    const month = ('0' + (today.getMonth() + 1)); // Add leading zero if month < 10
    const year = today.getFullYear().toString().slice(-2); // Extract last two digits of the year

    const billsCountThisMonth = await prisma.invoice.count({
        where: {
            userId,
            createdAt: {
                gte: new Date(today.getFullYear(), today.getMonth(), 1), // Start of current month
                lt: new Date(today.getFullYear(), today.getMonth() + 1, 0), // End of current month
            },

        },
    });

    return `B${billsCountThisMonth + 1}${month}${year}`;
}
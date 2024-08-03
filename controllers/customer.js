import customerUtils from "../utils/customer.js"
import prisma from "../utils/database.js"

export const addNewCust = async (req, res) => {
    console.log(req.body)
    let { name, gst, phone, email, houseNo, locality, city, state, pin, country } = req.body
    try {
        console.log(req.body)

        let response = await customerUtils.addCustomer({ name, gst, phone, email, houseNo, locality, city, state, pin, country })


        return res.status(200).json({
            status: true,
            response
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            status: false,
            error: error.message
        })
    }

}


export const getAllCustomers = async (req, res) => {
    try {
        let { page } = req.query
        console.log("pageCount")
        console.log(page)
        let skip = (parseInt(page) - 1) * 8
        let take = 8
        let count = await prisma.customers.count()
        let response = await prisma.customers.findMany({
            include: {
                address: true
            },
            orderBy: { name: 'asc' },
            skip: skip,
            take: take
        })
        count = Math.ceil(parseInt(count) / 8)

        return res.status(200).json({
            status: true,
            response: response,
            pageCount: count
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            status: false,
            error: error
        })
    }
}

export const updateCustomer = async (req, res) => {
    try {
        console.log(req.body)
        let { name, gst, phone, email, houseNo, locality, city, state, pin, country } = req.body

        let response = await customerUtils.updateCustomer({ name, gst, phone, email, houseNo, locality, city, state, pin, country })
        return res.status(200).json({
            status: true,
            response: response
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            status: false,
            error: error
        })
    }
}


export const customerFilters = async (req, res) => {
    try {

        let { phone, customerName, gst, email, state, page } = req.query
        console.log("phone, customerName, gst, email, state")
        console.log(phone, customerName, gst, email, state)

        let response = {}
        let query = {}
        let skip = (parseInt(page) - 1) * 8
        let take = 8

        if (phone != "") {
            query.phone = { contains: phone }
        }
        if (customerName) {
            customerName = customerName.toLowerCase().trim()
            query.name = { contains: customerName }
        }
        if (gst) {
            gst = gst.toLowerCase().trim()
            query.gst = { contains: gst }
        }
        if (email) {
            email = email.toLowerCase().trim()
            query.email = { contains: email }
        }
        if (state) {
            state = state.toLowerCase().trim()
            query.address = {
                some: {
                    state: {
                        contains: state
                    }
                }
            }
        }

        let count = await prisma.customers.count({
            where:{
                ...query
            }
        })
        count = Math.ceil(parseInt(count) / 8)
        console.log("count")
        console.log(count)

        response = await prisma.customers.findMany({
            where: {
                ...query
            },
            include: {
                address: true
            },
            skip : skip,
            take : take

        })

        setTimeout(() => {
            console.log(response)
            return res.status(200).json({
                status: true,
                data: response,
                pageCount : count
            })
        }, 2000)
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            status: false,
            error: error
        })
    }
}

// setTimeout(() => {
// }, 5000);
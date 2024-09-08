import customerUtils from "../utils/customer.js"
import prisma from "../utils/database.js"

export const addNewCust = async (req, res) => {
    let { name, gst, phone, email, houseNo, locality, city, state, pin, country } = req.body
    let { id } = req.query
    try {

        let response = await customerUtils.addCustomer({ name, gst, phone, email, houseNo, locality, city, state, pin, country, id })


        return res.status(200).json({
            status: true,
            response
        })

    } catch (error) {
        return res.status(400).json({
            status: false,
            error: error.message
        })
    }

}


export const getAllCustomers = async (req, res) => {
    try {
        let { page, id } = req.query

        let skip = (parseInt(page) - 1) * 8
        let take = 8
        let count = await prisma.customers.count({
            where: {
                userId: parseInt(id)
            },
        })
        let response = await prisma.customers.findMany({
            where: {
                userId: parseInt(id)
            },
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

        return res.status(400).json({
            status: false,
            error: error
        })
    }
}

export const updateCustomer = async (req, res) => {
    try {

        let { name, gst, phone, email, houseNo, locality, city, state, pin, country } = req.body
        let { id } = req.query
        let response = await customerUtils.updateCustomer({ name, gst, phone, email, houseNo, locality, city, state, pin, country, id })
        return res.status(200).json({
            status: true,
            response: response
        })

    } catch (error) {

        return res.status(400).json({
            status: false,
            error: error
        })
    }
}


export const customerFilters = async (req, res) => {
    try {

        let { phone, customerName, gst, email, state, page } = req.query
        let { id } = req.query


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
            where: {
                userId: parseInt(id),
                ...query
            }
        })
        count = Math.ceil(parseInt(count) / 8)

        response = await prisma.customers.findMany({
            where: {
                userId: parseInt(id),
                ...query
            },
            include: {
                address: true
            },
            skip: skip,
            take: take

        })
        return res.status(200).json({
            status: true,
            data: response,
            pageCount: count
        })

    } catch (error) {
        return res.status(400).json({
            status: false,
            error: error
        })
    }
}


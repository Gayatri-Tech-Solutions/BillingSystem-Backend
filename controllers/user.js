import userUtils from "../utils/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import prisma from "../utils/database.js"
import { error } from "console"

export const login = async (req, res) => {

    try {

        let { email, password } = req.body
        let response = await userUtils.login({ email, password })

        let data = {
            uuid: response.uuid,
            email: response.email
        }

        let secretKey = process.env.SECRET_KEY
        const expiresIn = '4h'; //set time like '24h'
        let token = jwt.sign(data, secretKey, { expiresIn })

        return res.status(200).json({
            status: true,
            data: { ...response, token }
        })

    } catch (error) {

        return res.status(402).json({
            status: false,
            error: error.message
        })
    }
}

export const register = async (req, res) => {


    let { email, password, name , phone } = req.body
    try {

        let findEmail = await prisma.user.findFirst({
            where: {
                email
            }
        })
        if (findEmail) {
            throw new Error("User Already Exist")
        } else {
            let encryptedPassword = bcrypt.hashSync(password, 10)
            let response = await userUtils.register({ email, name, encryptedPassword,phone })

            delete (response.password)
            return res.status(200).json({
                status: true,
                data: response
            })
        }


    } catch (error) {

        return res.status(402).json({
            status: false,
            error: error.message
        })
    }

}


export const details = async (req, res) => {
    try {
        let uuid = req.userId
        let response = await prisma.user.findFirst({
            where: {
                uuid
            },
            include: {
                address: true
            }
        })
        if (response) {
            delete response.password
        }
        return res.status(200).json({
            status: true,
            data: response
        })
    } catch (error) {

        return res.status(402).json({
            status: false,
            error: error.message
        })
    }
}

export const forgetPassword = async (req, res) => {

    try {
        let { email, password, newPassword, type } = req.body;


        type = "reset"

        // searching user email
        let result = await prisma.user.findFirst({
            where: {
                email
            }
        });

        // IF USER EMAIL FOUND
        if (result) {
            // handling forget password request
            if (type == "forget") {
                let password = generator.generate({
                    length: 5,
                    numbers: true,
                    uppercase: false,
                    excludeSimilarCharacters: true,
                });

                let encryptedPassword = bcrypt.hashSync(password, 10);
                let response = await AdminUtils.forgetPassword({
                    email,
                    encryptedPassword,
                });

                if (response) {
                    // let response = await AdminUtils.createAdmin({ data });
                    delete response.password;
                    delete response.superadmin;

                    let recipient = email;
                    let replacement = {
                        email: email,
                        password: password,
                    };
                    let subject = "New Password for logging in";
                    let filepath = "template/password_reset.html";
                    sendmail(recipient, filepath, replacement, subject);
                } else {
                    res.status(200).json({
                        status: true,
                        data: "something went wrong",
                    });
                }
                res.status(200).json({
                    status: true,
                    data: password,
                });
            } else {
                let passMatch = bcrypt.compareSync(password, result.password)
                if (passMatch) {

                    let encryptedPassword = bcrypt.hashSync(newPassword, 10);
                    let response = await prisma.user.update({
                        where: {
                            email
                        },
                        data: {
                            password: encryptedPassword
                        }
                    })
                    res.status(200).json({
                        status: true,
                        data: response,
                    });
                } else {

                    res.status(200).json({
                        status: false,
                        data: "Password does not match "
                    })
                }
            }
        } else // If email id is not found
        {
            res.status(400).json({
                status: false,
                data: "Email Id is not registered",
            });
        }
    } catch (error) {

        res.status(400).json({
            status: false,
            message: error.message,
        });
    }
};


export const updateUserOtherData = async (req, res) => {
    try {
        let response = {}
        let queryData = {}
        let { otherData, id, name, email, phone } = req.body

        if (otherData != undefined) {
            queryData.otherData = otherData
        }
        if (name != undefined) {
            queryData.name = name
        }
        if (email != undefined) {
            queryData.email = email
        }
        if (phone != undefined) {
            queryData.phone = phone
        }

        response = await prisma.user.update({
            where: {
                id
            },
            data: queryData,
            include: {
                address: true
            }
        })
        setTimeout(() => {
            res.status(200).json({
                status: true,
                data: response
            })
        }, 5000)


    } catch (error) {

        res.status(400).json({
            status: false,
            error: error
        })
    }
}


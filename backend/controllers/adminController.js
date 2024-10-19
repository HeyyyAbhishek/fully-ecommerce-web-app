const User = require("../models/userModel");

const load_platform_users = async (req, res) => {
    try {
        let users = await User.find({}, '-password -salt'); // Exclude password and salt
        console.log(users);
        return res.status(200).send({
            ok: true,
            status: 200,
            message: "Success",
            payload: users
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            ok: false,
            status: 500,
            message: "Internal Server Error"
        });
    }
}


const update_user_profile = async (req, res) => {
    try {
        let user_id = req.params.user_id
        let { username, email, contact_number, account_type } = req.body

        let user = await User.findOne({ where: { id: user_id } })

        if (!user) {
            return res.status(400).send({
                ok: false,
                status: 400,
                message: "User not found"
            })
        }

        let update = await User.update({
            username: username,
            email: email,
            contact_number: contact_number,
            account_type: account_type
        }, {
            where: { id: user_id }
        })

        if (update) {
            return res.status(200).send({
                ok: true,
                status: 200,
                message: "User updated"
            })
        }

        return res.status(400).send({
            status: 400,
            ok: false,
            message: "User not updated"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            ok: false,
            status: 500,
            message: "Internal Server Error"
        })
    }
}


const delete_user_profile = async (req, res) => {
    try {
        let user_id = req.params.user_id || req.body.username

        let user = await User.findOne({ where: { id: user_id } })

        if (!user) {
            return res.status(400).send({
                ok: false,
                status: 400,
                message: "User not found"
            })
        }

        let deleted = await User.destroy({
            where: { id: user_id }
        })

        if (deleted) {
            return res.status(200).send({
                ok: true,
                status: 200,
                message: "User deleted"
            })
        }

        return res.status(400).send({
            status: 400,
            ok: false,
            message: "User not deleted"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            ok: false,
            status: 500,
            message: "Internal Server Error"
        })
    }
}

const load_user_profile_by_id = async (req, res) => {
    try {
        let { user_id } = req.params

        let user = await User.findOne({
            where: { id: user_id },
            attributes: { exclude: ['password', 'salt'] }
        })

        if (!user) {
            return res.status(400).send({
                ok: false,
                status: 400,
                message: "User not found"
            })
        }

        return res.status(200).send({
            ok: true,
            status: 200,
            message: "Success",
            payload: user
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            status: 500,
            ok: false,
            message: "Internal Server Error"
        })
    }

}

module.exports = {
    load_platform_users,
    update_user_profile,
    load_user_profile_by_id,
    delete_user_profile
}
'use strict'
const User = use('App/Models/User')
const Followers = use('App/Models/Follower')
const Following = use('App/Models/Following')
const Hash = use('Hash')
class AuthController {
    /**
 * @swagger
 * /api/singup:
 *   post:
 *     tags:
 *       - AuthController
 *     description: Singup to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: firstName
 *         description: Enter a First Name.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: lastName
 *         description: Enter a Last Name.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: username
 *         description: Enter a username.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         description: Enter a Email .
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: Enter a Password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 *  
 */
    async singup({ request, auth, session, response }) {
        const email = request.body.email
        const password = request.body.password
        const firstName = request.body.firstName
        const lastName = request.body.lastName
        const phone = request.body.phone
        const username = request.body.username
        const user = await User.query()
            .where('username', username)
            .first()


        if (null !== user) {
            response.send({
                messsage: 'username taken'
            })
        } else {


            //this logic checks password validation includs( not contain firstname , lastname , less than 6 )
            if (8 < password.length) {
                const user = new User;
                user.first_name = firstName
                user.last_name = lastName
                user.email = email
                user.password = password
                user.phone = phone
                user.username = username
                await user.save()
                await auth.login(user);
                response.send({
                    messsage: 'successfully singup'
                })
            }
            else {
                response.send({
                    messsage: 'Password length less than 6'
                })
                return false;
            }

        }
    }
    /**
    * @swagger
    * /api/login:
    *   post:
    *     tags:
    *       - AuthController
    *     description: Login to the application
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: email
    *         description: Enter A Email.
    *         in: formData
    *         required: true
    *         type: string
    *       - name: password
    *         description: Enter A  Password.
    *         in: formData
    *         required: true
    *         type: string
    *     responses:
    *       200:
    *         description: login
    *  
    */

    async login({ request, auth, session, response }) {
        const email = request.body.email
        const password = request.body.password
        const user = await User.query()
            .where('email', email)
            .first()
        if (null !== user) {
            const passwordVerified = await Hash.verify(password, user.password)
            if (passwordVerified) {
                if (user.id_delete === 1) {
                    // await auth.attempt(email, password)
                    const followers = await Followers.query().where('uid', user.id).count()
                    const followings = await Following.query().where('uid', user.id).count()
                    user.followers = followers[0]['count(*)']
                    user.followings = followings[0]['count(*)']
                    response.send({
                        "message": "success",
                        "status": "200 ok",
                        "data": user

                    })
                }
                else {
                    response.send({
                        "messsage": "Your account has been suspended by admin."
                    })
                }
            }
            else {
                response.send({
                    "messsage": "password is wrong."
                })
            }
        }
        else {
            response.send({
                "messsage": "Email is not register with us."
            })
        }
    }

}

module.exports = AuthController

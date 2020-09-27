'use strict'

const Helpers = use('Helpers')
const Post= use('App/Models/Post')
const User = use('App/Models/User')
const Drive = use('Drive')

class PostController {
    /**
* @swagger
* /api/createPost:
*   post:
*     tags:
*       - PostsController
*     description: Post to the application
*     produces:
*       - application/json
*     parameters:
*       - name: uid
*         description: Enter Uid
*         in: formData
*         required: true
*         type : string 
*       - name: dateFile
*         description: upload file.
*         in: formData
*         required: true
*         type : file
*       - name: description
*         description: Enter a discription.
*         in: formData
*         required: true
*         type: string
*     responses:
*       200:
*         description: successfully created
*  
*/
    async createPost({ request, response }) {
        const data = await request.all()
        const post = new Post();
        const profilePic = request.file('dateFile', {
            size: '2gb'
          })
         const name = new Date().getTime()+"."+profilePic.subtype
         await profilePic.move(Helpers.tmpPath('uploads'), {
            name: name
          })

          if (!profilePic.moved()) {
            return profilePic.error()
          }
        const filePath = `uploads/${name}`;
       
        const isExist = await Drive.exists(filePath);
        if (isExist) {
           var t = Helpers.tmpPath(filePath);
           
        }
        var t = "file:///"+t
        post.uid = data.uid
        post.file = t
        post.description = data.discription
        await post.save()
           response.send({
            messsage: 'successfully created',
            status : "200 ok",
            data : post
        })
    }


}


module.exports = PostController

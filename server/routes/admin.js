const Admin = require('../models/admin')

class AdminRoute {
  static async index(request, reply) {
    reply.view('/server/views/index.ejs')
  }

  static async login(request, reply) {
    reply.setCookie('authorization', '').view('/server/views/login.ejs')
  }

  static async signin(request, reply) {
    try {
      const body = request.body
      const have = await Admin.findOne()
      const user = await Admin.findOne(body)
      let jwt = ''

      if (!have) {
        await (new Admin(body)).save()

        jwt = await reply.jwtSign({
          username: body.username,
        })

        reply.setCookie('authorization', `Bearer ${ jwt }`)
          .code(301)
          .redirect('/admin')
      } else if (!user) {
        reply.code(301).redirect('/admin/login')
      } else {
        jwt = await reply.jwtSign({
          id: user.get('_id'),
          username: user.get('username'),
        })

        reply.setCookie('authorization', `Bearer ${ jwt }`)
          .code(301)
          .redirect('/admin')
      }
    } catch(e) {
      console.log(e)
      reply.code(301).redirect('/admin/login')
    }
  }

  static async tags(request, reply) {    
    reply.view('/server/views/tags.ejs')
  }
  
  static async article(request, reply) {
    reply.view('/server/views/article.ejs', { id: request.params.id })
  }
}

module.exports = AdminRoute
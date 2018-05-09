const Admin = require('../models/admin')

class AdminRoute {
  static async index(request, reply) {
    if (!request.session.user) {
      reply.code(301).redirect('/admin/login')

      return
    }

    reply.view('/server/views/index.ejs')
  }

  static async login(request, reply) {
    reply.view('/server/views/login.ejs')
  }

  static async signin(request, reply) {
    try {
      const body = request.body
      const have = await Admin.findOne()
      const user = await Admin.findOne(body)

      if (!have) {
        await (new Admin(body)).save()
      } else if (!user) {
        reply.code(301).redirect('/admin/login')
      } else {
        request.session.user = user

        reply.code(301).redirect('/admin')
      }
    } catch(e) {
      reply.code(301).redirect('/admin/login')
    }
  }

  static async tags(request, reply) {
    if (!request.session.user) {
      reply.code(301).redirect('/admin/login')

      return
    }
    
    reply.view('/server/views/tags.ejs')
  }
  
  static async article(request, reply) {
    if (!request.session.user) {
      reply.code(301).redirect('/admin/login')

      return
    }

    reply.view('/server/views/article.ejs', { id: request.params.id })
  }
}

module.exports = AdminRoute
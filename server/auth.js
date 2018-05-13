const fastifyJwt = require('fastify-jwt')

module.exports = async (request, reply, next) => {
  if (request.cookies.authorization || request.headers.authorization) {
    if (!request.headers.authorization) {
      request.headers.authorization = request.cookies.authorization
    }

    try {
      await request.jwtVerify()
    } catch(e) {
      reply.code(301).redirect('/admin/login')
    }
  } else {
    reply.code(301).redirect('/admin/login')
  }
}
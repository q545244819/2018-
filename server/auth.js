module.exports = (request, reply, next) => {
  if (request.session.user) {
    next()
  } else {
    reply.code(301).redirect('/admin/login')
  }
}
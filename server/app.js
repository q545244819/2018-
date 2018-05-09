require('dotenv').config()

const fastify = require('fastify')()
const ejs = require('ejs')
const pointOfView = require('point-of-view')
const fastifySession = require('fastify-session')
const fastifyCookie = require('fastify-cookie')

const db = require('./db')
const articleRoute = require('./routes/article')
const tagRoute = require('./routes/tag')
const adminRoute = require('./routes/admin')
const articleSchema = require('./schemas/article')
const tagSchema = require('./schemas/tag')

const auth = require('./auth')

const routePrefix = '/api'
const routeArticle = `${ routePrefix }/article`
const routeTag = `${ routePrefix }/tag`
const routeAdmin = '/admin'

fastify.register(require('fastify-formbody'))
fastify.register(fastifyCookie)
fastify.register(fastifySession, { secret: process.env.SECRET })
fastify.register(pointOfView, {
  engine: {
    ejs,
  }
})

fastify.get(`${ routeAdmin }`, adminRoute.index)
fastify.get(`${ routeAdmin }/login`, adminRoute.login)
fastify.post(`${ routeAdmin }/login`, adminRoute.signin)
fastify.get(`${ routeAdmin }/tags`, adminRoute.tags)
fastify.get(`${ routeAdmin }/create`, adminRoute.article)
fastify.get(`${ routeAdmin }/update/:id`, adminRoute.article)

fastify.get(`${ routeArticle }`, articleRoute.find)
fastify.get(`${ routeArticle }/`, articleRoute.find)
fastify.get(`${ routeArticle }/:id`, articleRoute.findOne)
fastify.post(`${ routeArticle }`, { schema: articleSchema.create }, articleRoute.create)
fastify.put(`${ routeArticle }/:id`, { schema: articleSchema.update }, articleRoute.update)
fastify.delete(`${ routeArticle }/:id`, { schema: articleSchema.delete }, articleRoute.delete)

fastify.get(`${ routeTag }`, tagRoute.find)
fastify.get(`${ routeTag }/`, tagRoute.find)
fastify.get(`${ routeTag }/:id`, tagRoute.findOne)
fastify.post(`${ routeTag }`, { schema: tagSchema.create }, tagRoute.create)
fastify.put(`${ routeTag }/:id`, { schema: tagSchema.update }, tagRoute.update)
fastify.delete(`${ routeTag }/:id`, { schema: tagSchema.delete }, tagRoute.delete)

const start = async () => {
  try {
    await db.connect()
    await fastify.listen(process.env.PORT)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
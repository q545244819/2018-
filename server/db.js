const { Database } = require('mongorito')
const timestamps = require('mongorito-timestamps')

const Article = require('./models/article')
const Tag = require('./models/tag')
const Admin = require('./models/admin')

const db = new Database(`${process.env.DB_HOST}/blog`)

db.use(timestamps())
db.register(Article)
db.register(Tag)
db.register(Admin)

module.exports = db
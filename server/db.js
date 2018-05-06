const { Database } = require('mongorito')
const timestamps = require('mongorito-timestamps')

const Article = require('./models/article')
const Tag = require('./models/tag')

const db = new Database(`${process.env.DB_HOST}/blog`)

db.use(timestamps())
db.register(Article)
db.register(Tag)

module.exports = db
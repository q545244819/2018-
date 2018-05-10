const { ObjectId } = require('mongorito')

const Article = require('../models/article')
const Tag = require('../models/tag')

class ArticleRoute {
  static async create(request, reply) {
    try {
      const body = request.body
      const article = new Article(body)

      await article.save()

      reply.code(200).send({
        statusCode: 200,
        message: '新建文章成功！',
      })
    } catch(e) {
      reply.code(500).send({
        statusCode: 500,
        message: '新建文章失败！',
      })
    }
  }

  static async find(request, reply) {
    try {
      const query = request.query
      const amount = 10
      const articles = await Article.skip((query.page - 1) * amount).limit(amount).sort('created_at', 'desc').find()
      const articlesCount = await Article.count()
      let tagArray = []

      articles.forEach((item) => tagArray = tagArray.concat(item.get('tags')))

      const tags = await Tag.where('_id').in([...new Set(tagArray)].map((item) => ObjectId(item))).find()
      const tagMap = {}

      tags.forEach((item) => tagMap[item.get('_id')] = item )

      const list = []

      articles.forEach((item) => {
        let tags = []

        item.get('tags').forEach((tag) => tags.push((tagMap[tag])))

        item.set('tags', tags)

        list.push(item)
      })

      reply.code(200).send({
        current: parseInt(query.page),
        count: articlesCount,
        list,
      })
    } catch(e) {
      console.log(e)

      reply.code(404).send({
        statusCode: 404,
        message: '文章列表为空！',
      })
    }
  }

  static async findOne(request, reply) {
    try {
      const article = await Article.findOne({ _id: ObjectId(request.params.id) })

      if (!article) {
        throw Error('not Found!')
      }

      const tags = await Tag.where('_id').in(article.get('tags').map((item) => ObjectId(item))).find()
      const tagMap = {}

      tags.forEach((item) => tagMap[item.get('_id')] = item )

      article.set('tags', article.get('tags').map((item) => tagMap[item]))

      reply.send(article)
    } catch(e) {
      console.log(e)

      reply.code(404).send({
        statusCode: 404,
        message: '未找到文章！',
      })
    }
  }

  static async update(request, reply) {
    try {
      const body = request.body
      const article = await Article.findOne({ _id: ObjectId(request.params.id) })

      article.set(body)

      await article.save()

      reply.code(200).send({
        statusCode: 200,
        message: '更新文章成功！',
      })
    } catch(e) {
      reply.code(500).send({
        statusCode: 500,
        message: '更新文章失败！',
      })
    }
  }  
  
  static async delete(request, reply) {
    try {
      await Article.remove({ _id: ObjectId(request.params.id) })

      reply.code(200).send({
        statusCode: 200,
        message: '删除文章成功！',
      })
    } catch(e) {
      reply.code(500).send({
        statusCode: 500,
        message: '删除文章失败！',
      })
    }
  }
}

module.exports = ArticleRoute
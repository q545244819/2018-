const { ObjectId } = require('mongorito')

const Article = require('../models/article')

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
        message: '新建标签失败！',
      })
    }
  }

  static async find(request, reply) {
    try {
      const query = request.query
      const amount = 10
      const articles = await Article.skip((query.page - 1) * amount).limit(amount).sort('created_at', 'desc').find()
      const articlesCount = await Article.count()

      reply.code(200).send({
        current: parseInt(query.page),
        count: articlesCount,
        list: articles,
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
      const article = await Article.findOne({ id: ObjectId(request.params.id) })

      reply.send(article)
    } catch(e) {
      reply.code(404).send({
        statusCode: 404,
        message: '未找到文章！',
      })
    }
  }

  static async update(request, reply) {
    try {
      const body = request.body

      if (body) {
        await Article.findOneAndUpdate({ _id: ObjectId(request.params.id) }, body)

        reply.code(200).send({
          statusCode: 200,
          message: '更新文章成功！',
        })
      } else {
        reply.code(500).send({
          statusCode: 500,
          message: '更新文章数据不能为空！',
        })
      }
    } catch(e) {
      reply.code(500).send({
        statusCode: 500,
        message: '更新文章失败！',
      })
    }
  }  
  
  static async delete(request, reply) {
    try {
      await Article.findOneAndRemove({ _id: ObjectId(request.params.id) })

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
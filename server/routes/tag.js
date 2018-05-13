const { ObjectId } = require('mongorito')

const Tag = require('../models/tag')

class ArticleRoute {
  static async create(request, reply) {
    try {
      const body = request.body
      const tag = new Tag(body)
      
      await tag.save()

      reply.code(200).send({
        statusCode: 200,
        message: '新建标签成功！',
      })
    } catch(e) {
      reply.code(500).send({
        statusCode: 500,
        message: '新建标签失败！',
      })
    }
  }

  static async find(request, reply) {
    const tags = await Tag.find()

    reply.send(tags)
  }

  static async findOne(request, reply) {
    try {
      const tag = await Tag.findOne({ _id: ObjectId(request.params.id) })

      if (!tag) {
        throw Error('not Found!')
      }

      reply.send(tag)
    } catch(e) {
      reply.code(404).send({
        statusCode: 404,
        message: '未找到标签！',
      })
    }
  }

  static async update(request, reply) {
    try {
      const body = request.body
      const tag = await Tag.findOne({ _id: ObjectId(request.params.id) })

      tag.set(body)

      await tag.save()

      reply.code(200).send({
        statusCode: 200,
        message: '更新标签成功！',
      })
    } catch(e) {
      reply.code(500).send({
        statusCode: 500,
        message: '更新标签失败！',
      })
    }
  }  
  
  static async delete(request, reply) {
    try {
      await Tag.remove({ _id: ObjectId(request.params.id) })

      reply.code(200).send({
        statusCode: 200,
        message: '删除标签成功！',
      })
    } catch(e) {
      reply.code(500).send({
        statusCode: 500,
        message: '删除标签失败！',
      })
    }
  }
}

module.exports = ArticleRoute
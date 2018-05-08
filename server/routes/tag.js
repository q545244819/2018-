const { ObjectId } = require('mongorito')

const Tag = require('../models/tag')

class ArticleRoute {
  static async create(request, reply) {
    const body = request.body
    const tag = new Tag(body)

    if (body) {
      try {
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
    } else {
      reply.code(500).send({
        statusCode: 500,
        message: '新建标签数据不能为空！',
      })
    }
  }

  static async find(request, reply) {
    const tags = await Tag.find()

    reply.send(tags)
  }

  static async findOne(request, reply) {
    const tag = await Tag.findOne({ id: ObjectId(request.params.id) })

    reply.send(tag)
  }

  static async update(request, reply) {
    const body = request.body
    const tag = await Tag.findOne({ _id: ObjectId(request.params.id) })

    if (tag) {
      tag.set('title', body.title)

      try {
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
    } else {
      reply.code(404).send({
        statusCode: 404,
        message: '找不到标签！',
      })
    }
  }  
  
  static async delete(request, reply) {
    try {
      await Tag.findOneAndRemove({ _id: ObjectId(request.params.id) })

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
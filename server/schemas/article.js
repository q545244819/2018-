module.exports = {
  create: {
    body: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        cover: { type: 'string' },
        content: { type: 'string' },
        tags: { type: 'array', items: { type: 'string' } },
      },
      required: ['title', 'cover', 'content', 'tags'],
    },
  },
  update: {
    body: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        cover: { type: 'string' },
        content: { type: 'string' },
        tags: { type: 'array', items: { type: 'string' } },
      },
      required: ['title', 'cover', 'content', 'tags'],
    },
    params: {
      type: 'object',
      properties: {
        id: { type: 'string' },
      },
      required: ['id'],
    },
  },
  delete: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'string' },
      },
      required: ['id'],      
    },
  },
}
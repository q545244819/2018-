module.exports = {
  create: {
    body: {
      type: 'object',
      properties: {
        title: { type: 'string' },
      },
      required: ['title'],
    },
  },
  update: {
    body: {
      type: 'object',
      properties: {
        title: { type: 'string' },
      },
      required: ['title'],      
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
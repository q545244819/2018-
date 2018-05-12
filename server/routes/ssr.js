import { renderToString } from 'react-dom/server'
import React from 'react'
import { StaticRouter } from 'react-router-dom'
import fs from 'fs'
import path from 'path'

import App from '../../src/App'

import { getArticles, getArticle, getCovers } from '../../src/services/article'
import { getTag } from '../../src/services/tag'

const template = fs.readFileSync(path.join(__dirname, '../../../build/index.html'), 'utf-8')

const renderFullPage = (html, preloadedState) => {
  return template.replace('<div id="root"></div>', `<div id="root">${html}</div><script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}</script>`)
}

class SSR {
  static async home(request, reply) {
    const query = request.query
    const articles = await getArticles({ page: query.page || 1, tag: query.tag })
    const tags = await getTag()
    let tagsMap = {}

    tags.data.forEach((item) => tagsMap[item._id] = item.title)

    const data = {
      list: articles.data.list,
      current: articles.data.current,
      total: articles.data.total,
      tags: tags.data,
      tagsMap,
    }

    const context = {}
    const html = renderToString(
      <StaticRouter context={context} location={request.raw.url} >
        <App location={request.raw.url} articles={data} />
      </StaticRouter>
    )

    reply.code(200).type('text/html').send(renderFullPage(html, data))
  }

  static async article(request, reply) {
    const params = request.params
    const article = await getArticle({ id: params.id })

    const data = {
      article: article.data,
    }

    const context = {}
    const html = renderToString(
      <StaticRouter context={context} location={request.raw.url} >
        <App location={request.raw.url} article={data} />
      </StaticRouter>
    )

    reply.code(200).type('text/html').send(renderFullPage(html, data))
  }

  static async album(request, reply) {
    const covers = await getCovers()
    const data = {
      photos: covers.data,
    }

    const context = {}
    const html = renderToString(
      <StaticRouter context={context} location={request.raw.url} >
        <App location={request.raw.url} covers={data} />
      </StaticRouter>
    )

    reply.code(200).type('text/html').send(renderFullPage(html, data))
  }

  static async about(request, reply) {
    const context = {}
    const html = renderToString(
      <StaticRouter context={context} location={request.raw.url} >
        <App location={request.raw.url} data={{}} />
      </StaticRouter>
    )

    reply.code(200).type('text/html').send(renderFullPage(html, {}))
  }
}

module.exports = SSR
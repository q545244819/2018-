import React, { Component } from 'react'
import { Badge } from 'antd'

import { getArticle } from '../../services/article'

import './index.css'

class Home extends Component {
  constructor() {
    super()

    this.state = {
      article: {
        id: '',
        title: '',
        cover: '',
        content: '',
        created_at: '2018-01-01',
        tags: [],
      },
    }
  }

  componentWillMount() {
    getArticle({ id: this.props.match.params.id })
      .then(({ data }) => {
        this.setState({
          article: data,
        })
      })
  }

  render() {
    return (
      <div className="Article">
        <div className="cover" style={{ backgroundImage: `url(${ this.state.article.cover })` }}></div>
        <div className="container">
          <h1 className="title">{ this.state.article.title }</h1>
          <p className="info">
            Posted by 卫宫士郎 on { this.state.article.created_at }
            { this.state.article.tags.map((item, index) => <Badge key={index} count={ item.title } />) }
          </p>
          <div className="content" dangerouslySetInnerHTML={{ __html: this.state.article.content }}></div>
        </div>
      </div> 
    )
  }
}

export default Home
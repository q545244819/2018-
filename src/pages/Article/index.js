import React, { Component } from 'react'
import { Badge } from 'antd'

import './index.css'

class Home extends Component {
  constructor() {
    super()

    this.state = {
      article: {
        id: '123',
        title: '饿了么的 PWA 升级实践',
        cover: 'http://placehold.it/300x200',
        content: '<p>很荣幸在今年 2 月到 5 月的时间里，以顾问的身份加入饿了么，参与 PWA 的相关工作。这篇文章其实最初是在以英文写作发表在 medium 上的：Upgrading Ele.me to Progressive Web Apps，获得了一定的关注。所以也决定改写为中文版本再次分享出来，希望能对你有所帮助 ;) </p>',
        date: '2018-01-01',
        tags: [
          {
            id: '123',
            title: '粤菜',
          },
        ],
      },
    }
  }

  render() {
    return (
      <div className="Article">
        <div className="cover" style={{ backgroundImage: `url(${ this.state.article.cover })` }}></div>
        <div className="container">
          <h1 className="title">{ this.state.article.title }</h1>
          <p className="info">
            Posted by XXX on { this.state.article.date }
            { this.state.article.tags.map((item, index) => <Badge count={ item.title } />) }
          </p>
          <div className="content" dangerouslySetInnerHTML={{ __html: this.state.article.content }}></div>
        </div>
      </div> 
    )
  }
}

export default Home
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Pagination, Row, Col, Divider, Badge, Breadcrumb, Icon } from 'antd'

import './index.css'

class Home extends Component {
  constructor() {
    super()

    this.state = {
      list: [
        {
          id: '123',
          title: '饿了么的 PWA 升级实践',
          cover: 'http://placehold.it/300x200',
          detail: '很荣幸在今年 2 月到 5 月的时间里，以顾问的身份加入饿了么，参与 PWA 的相关工作。这篇文章其实最初是在以英文写作发表在 medium 上的：Upgrading Ele.me to Progressive Web Apps，获得了一定的关注。所以也决定改写为中文版本再次分享出来，希望能对你有所帮助 ;) ',
          date: '2018-01-01',
        },
      ],
      tags: [
        {
          id: '123',
          title: '粤菜',
        },
        {
          id: '321',
          title: '川菜',
        },
      ],
      tagsMap: {
        '123': '粤菜',
        '321': '川菜',
      }
    }
  }

  render() {
    return (
      <div className="Home">
        <div className="container">
          <Row>
            <Col span={18}>
              <Breadcrumb>
                <Breadcrumb.Item><Icon type="home" />首页</Breadcrumb.Item>
                { this.props.match.params.id ? <Breadcrumb.Item><a href={`${this.props.match.params.id}`}>{ this.state.tagsMap[this.props.match.params.id] }</a></Breadcrumb.Item> : null }
              </Breadcrumb>
              <ul className="list">
                { this.state.list.map((item, index) => {
                  return (
                    <li key={ item.id }>
                      <Link to={`/article/${ item.id }`}>
                        <h1>{ item.title }</h1>
                        <img className="cover" src={ item.cover } alt={ item.title } />
                        <p className="detail">{ item.detail }</p>
                        <p className="info">Posted by XXX on { item.date }</p>
                      </Link>
                    </li>
                  )
                }) }
              </ul>
              <Pagination defaultCurrent={1} total={50} />
            </Col>
            <Col span={6}>
              <Divider />
              <h2>美食标签</h2>
              <div className="tags-wrap">
                { this.state.tags.map((item, index) => {
                  return <Link key={ item.id } to={`/${ item.id }`}><Badge count={ item.title } /></Link>
                }) }
              </div>
              <Divider />
              <h2>站长</h2>
              <img className="avatar" src="avatar.jpg" alt="" />
              <p className="background">《衛宮家今天的飯》(日語：衛宮さんちの今日のごはん)是漫畫家TAa的漫畫作品。簡稱衛宮飯，也稱衛宮食堂、舌尖上的衛宮家、Fate/Grand Eater。</p>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default Home
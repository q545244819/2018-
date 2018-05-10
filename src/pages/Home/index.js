import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Pagination, Row, Col, Divider, Badge, Breadcrumb, Icon } from 'antd'

import { getArticles } from '../../services/article'
import { getTag } from '../../services/tag'

import './index.css'

class Home extends Component {
  constructor() {
    super()

    this.state = {
      list: [],
      tags: [],
      tagsMap: {},
      current: 1,
      total: 0,
    }
  }

  load() {
    const promises = [
      getArticles({ page: 1 }),
      getTag(),
    ]

    Promise.all(promises)
      .then((results) => {
        const { list, current, total } = results[0].data
        const tags = results[1].data
        let tagsMap = {}

        tags.forEach((item) => tagsMap[item._id] = item)

        this.setState({
          list,
          tags,
          tagsMap,
          current,
          total,
        })
      })
      .catch((err) => {
      })
  }

  pageChange(page) {
    this.setState({
      current: page,
    })
  }

  componentWillMount() {
    this.load()
  }

  shouldComponentUpdate() {
    return true
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
                    <li key={ item._id }>
                      <Link to={`/article/${ item._id }`}>
                        <h1>{ item.title }</h1>
                        <div className="cover" style={{ backgroundImage: `url(${ item.cover })` }} alt={ item.title }></div>
                        <p className="detail">{ item.detail }</p>
                        <p className="info">Posted by 卫宫士郎 on { item.created_at }</p>
                      </Link>
                    </li>
                  )
                }) }
              </ul>
              <Pagination onChange={this.pageChange.bind(this)} defaultCurrent={this.state.current} total={this.state.total} />
            </Col>
            <Col span={6}>
              <Divider />
              <h2>美食标签</h2>
              <div className="tags-wrap">
                { this.state.tags.map((item, index) => {
                  return <Link key={ item._id } to={`/${ item._id }`}><Badge count={ item.title } /></Link>
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
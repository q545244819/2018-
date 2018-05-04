import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Pagination, Row, Col, Divider, Badge } from 'antd'

import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="container">
          <Row>
            <Col span={18}>
              <ul className="list">
                <li>
                  <Link to="/">
                    <h1>饿了么的 PWA 升级实践</h1>
                    <img className="cover" src="http://placehold.it/300x200" alt="饿了么的 PWA 升级实践" />
                    <p className="detail">很荣幸在今年 2 月到 5 月的时间里，以顾问的身份加入饿了么，参与 PWA 的相关工作。这篇文章其实最初是在以英文写作发表在 medium 上的：Upgrading Ele.me to Progressive Web Apps，获得了一定的关注。所以也决定改写为中文版本再次分享出来，希望能对你有所帮助 ;) </p>
                    <p className="info">Posted by XXX on 2018-01-01</p>
                  </Link>
                </li>
              </ul>
              <Pagination defaultCurrent={1} total={50} />
            </Col>
            <Col span={6}>
              <Divider />
              <h2>美食标签</h2>
              <div className="tags-wrap">
                <Badge count="粤菜" />
                <Badge count="粤菜" />
                <Badge count="粤菜" />
                <Badge count="粤菜" />
                <Badge count="粤菜" />
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
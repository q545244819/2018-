import React, { Component } from 'react'
import { Row, Col } from 'antd'

import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="About">
        <img className="cover" src="cover.jpg" alt="" />
        <div className="info">
          <Row>
            <Col span={8}>
              <h2>前端技术：</h2>
              <ul>
                <li>React</li>
                <li>React-Router</li>
                <li>Axios</li>
                <li>Antd</li>
              </ul>
            </Col>
            <Col span={8}>
              <h2>后端技术：</h2>
              <ul>
                <li>NodeJS</li>
                <li>FastJS</li>
                <li>Mongodb</li>
                <li>Mongorito</li>
              </ul>
            </Col>
            <Col span={8}>
              <h2>开发环境：</h2>
              <ul>
                <li>Windows 10</li>
                <li>VS Code</li>
                <li>Git</li>
              </ul>
            </Col>
          </Row>
          <p>为啥选用这些技术呢：主要是想学习 React 生态相关的技术，以及实践一下同构应用！<strong>以上均为开源库和软件，感谢企业和开源社区的贡献。</strong></p>
          <p>这是我的 Wechat：johnhsm2333</p>
          <p>这是我的 email：johnhsm2333@gmail.com</p>
          <p>这是我的 Github：<a target="_blank" rel="noopener noreferrer" href="https://github.com/q545244819">johnhsm</a></p>
          <p>这是我的 Blog：<a target="_blank" rel="noopener noreferrer" href="https://segmentfault.com/u/johnh">_我已经从中二毕业了</a></p>
        </div>
      </div>
    )
  }
}

export default Home
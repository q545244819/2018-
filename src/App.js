import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'

import Home from './pages/Home'
import Discover from './pages/Discover'
import About from './pages/About'
import CMenu from './pages/Menu'
import Video from './pages/Video'

import './App.css'

const { Header, Footer, Content } = Layout
const routes = [
  {
    path: '/',
    key: 'home',
    name: '首页',
    component: Home,
  },
  {
    path: '/menu',
    key: 'menu',
    name: '菜谱',
    component: CMenu,
  },
  {
    path: '/discover',
    key: 'discover',
    name: '发现',
    component: Discover,
  },
  {
    path: '/video',
    key: 'video',
    name: '视频',
    component: Video,
  },
  {
    path: '/about',
    key: 'about',
    name: '关于',
    component: About,
  },
]

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout className="Layout">
          <Header className="Header">
            <div className="logo">衛宮さんちの今日のごはん</div>
            <Menu className="menu" mode="horizontal" defaultSelectedKeys={['home']}>
              { routes.map((item, index) => <Menu.Item key={ item.key }><Link to={ item.path }>{ item.name }</Link></Menu.Item>) }
            </Menu>
          </Header>
          <Content>
            <Switch>
              { routes.map((item, index) => {
                if (!index) {
                  return <Route exact key={ item.key } path={ item.path } component={ item.component }/>
                } else {
                  return <Route key={ item.key } path={ item.path } component={ item.component }/>
                }
              }) }
            </Switch>
          </Content>
          <Footer className="Footer">
            <p>Power by React and NodeJS!</p>
          </Footer>
        </Layout>
      </div>
    )
  }
}

export default App

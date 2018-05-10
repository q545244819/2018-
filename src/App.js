import React, { Component } from 'react'
import { AnimatedSwitch } from 'react-router-transition'
import { Route, Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'

import Home from './pages/Home'
import Album from './pages/Album'
import About from './pages/About'
import Article from './pages/Article'

import './App.css'

const { Header, Footer, Content } = Layout
const routes = [
  {
    path: '/',
    key: 'home',
    name: '菜谱',
    component: Home,
  },
  {
    path: '/album',
    key: 'album',
    name: '图册',
    component: Album,
  },
  {
    path: '/about',
    key: 'about',
    name: '关于',
    component: About,
  },
  {
    path: '/article/:id',
    key: 'article',
    component: Article,
  },
]
const paths = ['album', 'about']

class App extends Component {
  constructor() {
    super()
    
    this.state = {
      path: paths.indexOf(window.location.pathname.slice(1)) > -1 ? window.location.pathname.slice(1) : 'home'
    }
  }

  render() {
    return (
      <div className="App">
        <Layout className="Layout">
          <Header className="Header">
            <div className="logo">衛宮さんちの今日のごはん</div>
            <Menu className="menu" mode="horizontal" defaultSelectedKeys={[ this.state.path ]}>
              { routes.map((item, index) => {
                if (item.name) {
                  return <Menu.Item key={ item.key }><Link to={ item.path }>{ item.name }</Link></Menu.Item>
                } else {
                  return null
                }
              }) }
            </Menu>
          </Header>
          <Content>
            <AnimatedSwitch atEnter={{ opacity: 0 }} atLeave={{ opacity: 0 }} atActive={{ opacity: 1 }}>
                { routes.map((item, index) => {
                  if (!index) {
                    return <Route exact key={ item.key } path={ item.path } component={ item.component }/>
                  } else {
                    return <Route key={ item.key } path={ item.path } component={ item.component }/>
                  }
                }) }
              </AnimatedSwitch>
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

import React, { Component } from 'react'
import { TransitionGroup, CSSTransition } from "react-transition-group"
import { Switch, Route, Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'

import Home from './pages/Home'
import Album from './pages/Album'
import About from './pages/About'

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
    path: '/:id',
    key: 'tag',
    component: Home,
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
            <TransitionGroup>
              <CSSTransition classNames="fade" timeout={300}>
                <Switch>
                  { routes.map((item, index) => {
                    if (!index) {
                      return <Route exact key={ item.key } path={ item.path } component={ item.component }/>
                    } else {
                      return <Route key={ item.key } path={ item.path } component={ item.component }/>
                    }
                  }) }
                </Switch>
              </CSSTransition>
            </TransitionGroup>
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

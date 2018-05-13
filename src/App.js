import React, { Component } from 'react'
import { AnimatedSwitch } from 'react-router-transition'
import { Route, Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'

import Home from './pages/Home'
import Album from './pages/Album'
import About from './pages/About'
import Article from './pages/Article'

import routes from './routes'

import './App.css'

const { Header, Footer, Content } = Layout

const paths = ['album', 'about']

class App extends Component {
  constructor(props) {
    super(props)

    let path = ''

    if (this.props.location) {
      path = paths.indexOf(this.props.location.slice(1)) > -1 ? this.props.location.slice(1) : 'home'
    } else {
      path = paths.indexOf(window.location.pathname.slice(1)) > -1 ? window.location.pathname.slice(1) : 'home'
    }

    this.state = {
      path,
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
              <Route exact path="/" render={({ location }) => <Home data={ this.props.articles } location={ location } />}/>
              <Route path="/album" render={({ location }) => <Album data={ this.props.covers } location={ location } />}/>
              <Route path="/about" render={() => <About />}/>
              <Route path="/article/:id" render={({ location, match }) => <Article data={ this.props.article } location={ location } match={ match } />}/>
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

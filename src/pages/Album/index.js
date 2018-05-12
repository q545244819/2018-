import React, { Component } from 'react'

import { getCovers } from '../../services/article'

import './index.css'

class Home extends Component {
  constructor(props) {
    super(props)

    const defaultState = {
      photos: []
    }

    if (typeof window === 'object') {
      this.state = defaultState
    } else {
      this.state = this.props.data
    }
  }

  componentWillMount() {
    if (!this.props.data) {
      getCovers()
        .then(({ data }) => {
          this.setState({
            photos: data,
          })
        })
    }
  }

  componentDidMount() {
    const Masonry = require('masonry-layout')
    const imagesLoaded = require('imagesloaded')

    imagesLoaded(document.querySelectorAll('.grid-item'), function() {
      new Masonry(document.querySelector('.grid'), {
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true,
      })
    })
  }

  render() {
    return (
      <div className="container">
        <div className="grid">
          <div className="grid-sizer"></div>
          {
            this.state.photos.map((item, index) => {
              return (
                <div key={item._id} className="grid-item"><img alt="example" src={item.cover} /></div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default Home
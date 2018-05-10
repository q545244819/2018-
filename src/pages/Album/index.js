import React, { Component } from 'react'
import Masonry from 'masonry-layout'
import imagesLoaded from 'imagesloaded'

import { getCovers } from '../../services/article'

import './index.css'

class Home extends Component {
  constructor() {
    super()

    this.state = {
      photos: []
    }
  }

  componentWillMount() {
    getCovers()
      .then(({ data }) => {
        this.setState({
          photos: data,
        })
      })
  }

  componentDidMount() {
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
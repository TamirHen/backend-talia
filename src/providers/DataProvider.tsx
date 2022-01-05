import React, { Component, createContext } from 'react'
import { db } from '../utils/firebase/Firebase'
import { Database } from '../common/types'

const defaultState = {
  database: {
    breakPoints: {
      menu: '',
      mobile: '',
      tablet: '',
    },
    cubes: [
      {
        id: '',
        image: '',
        name: '',
      },
    ],
    pages: {
      about: {
        title: '',
        subtitle: '',
        description: '',
        cv: '',
      },
      contact: {
        title: '',
        text: '',
      },
      demoReel: {
        videoId: '',
      },
      home: {
        animationImage: '',
        riggingImage: '',
        sketchesImage: '',
      },
      sketches: {
        grid: {
          desktop: { rows: 0, columns: 0 },
          tablet: { rows: 0, columns: 0 },
          mobile: { rows: 0, columns: 0 },
        },
        images: [
          {
            id: '',
            cubeId: '',
            desktop: {
              columnEnd: 0,
              columnStart: 0,
              rowEnd: 0,
              rowStart: 0,
            },
            tablet: {
              columnEnd: 0,
              columnStart: 0,
              rowEnd: 0,
              rowStart: 0,
            },
            mobile: {
              columnEnd: 0,
              columnStart: 0,
              rowEnd: 0,
              rowStart: 0,
            },
          },
        ],
      },
    },
    footerText: '',
    headerLinks: {
      about: {
        name: '',
        order: 0,
      },
      animation: {
        name: '',
        order: 0,
      },
      contact: {
        name: '',
        order: 0,
      },
      demoReel: {
        name: '',
        order: 0,
      },
      rigging: {
        name: '',
        order: 0,
      },
      sketches: {
        name: '',
        order: 0,
      },
    },
    socialMedia: {
      behance: '',
      dribble: '',
      instagram: '',
      linkedin: '',
      vimeo: '',
      whatsapp: '',
    },
    subtitle: '',
    title: '',
  },
}
export const DataContext: React.Context<{ database: Database }> =
  createContext(defaultState)

class DataProvider extends Component {
  state = defaultState

  componentDidMount = () => {
    db.on('value', (snapshot) => {
      this.setState({
        database: snapshot.val(),
      })
    })
  }

  render() {
    return (
      <DataContext.Provider value={{ database: this.state.database }}>
        {this.props.children}
      </DataContext.Provider>
    )
  }
}

export default DataProvider

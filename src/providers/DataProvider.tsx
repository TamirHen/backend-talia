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
      animation: {
        videos: [
          {
            id: '',
            projectPage: {
              description: '',
              grid: {
                desktop: {
                  columns: 1,
                  rows: 1,
                },
                mobile: {
                  columns: 1,
                  rows: 1,
                },
                tablet: {
                  columns: 1,
                  rows: 1,
                },
              },
              images: [
                {
                  cubeId: '',
                  desktop: {
                    columnEnd: 1,
                    columnStart: 1,
                    rowEnd: 1,
                    rowStart: 1,
                  },
                  id: '',
                  mobile: {
                    columnEnd: 1,
                    columnStart: 1,
                    rowEnd: 1,
                    rowStart: 1,
                  },
                  tablet: {
                    columnEnd: 1,
                    columnStart: 1,
                    rowEnd: 1,
                    rowStart: 1,
                  },
                },
              ],
              subtitle: '',
            },
            title: '',
            videoId: '',
          },
        ],
      },
      rigging: {
        videos: [
          {
            id: '',
            projectPage: {
              description: '',
              grid: {
                desktop: {
                  columns: 1,
                  rows: 1,
                },
                mobile: {
                  columns: 1,
                  rows: 1,
                },
                tablet: {
                  columns: 1,
                  rows: 1,
                },
              },
              images: [
                {
                  cubeId: '',
                  desktop: {
                    columnEnd: 1,
                    columnStart: 1,
                    rowEnd: 1,
                    rowStart: 1,
                  },
                  id: '',
                  mobile: {
                    columnEnd: 1,
                    columnStart: 1,
                    rowEnd: 1,
                    rowStart: 1,
                  },
                  tablet: {
                    columnEnd: 1,
                    columnStart: 1,
                    rowEnd: 1,
                    rowStart: 1,
                  },
                },
              ],
              subtitle: '',
            },
            title: '',
            videoId: '',
          },
        ],
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
          desktop: { rows: 1, columns: 1 },
          tablet: { rows: 1, columns: 1 },
          mobile: { rows: 1, columns: 1 },
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

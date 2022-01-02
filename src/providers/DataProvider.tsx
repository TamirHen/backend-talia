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
    footerText: '',
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

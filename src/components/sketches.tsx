import React, { useContext } from 'react'
import '../assets/styles/components/sketches.scss'
import { DataContext } from '../providers/DataProvider'
import { v4 as uuid } from 'uuid'

const Sketches = () => {
  const {
    database: {
      pages: { sketches },
    },
  } = useContext(DataContext)

  return (
    <div className={'sketches-container'}>
      <h4 className={'form-header'}>Sketches</h4>
    </div>
  )
}

export default Sketches

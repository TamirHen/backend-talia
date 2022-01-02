import React, { useContext } from 'react'
import '../assets/styles/components/cubes.scss'
import { DataContext } from '../providers/DataProvider'
import { v4 as uuid } from 'uuid'
import { Cube } from './cube'

const Cubes = () => {
  const {
    database: { cubes },
  } = useContext(DataContext)

  return (
    <div className={'cubes-container'}>
      <h4 className={'form-header'}>Cubes</h4>
      <div className={'cubes-wrapper'}>
        {cubes?.map((cube) => (
          <Cube key={uuid()} id={cube.id} image={cube.image} name={cube.name} />
        ))}
      </div>
    </div>
  )
}

export default Cubes

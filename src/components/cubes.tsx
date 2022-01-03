import React, { useContext, useState } from 'react'
import '../assets/styles/components/cubes.scss'
import { DataContext } from '../providers/DataProvider'
import { v4 as uuid } from 'uuid'
import { Cube } from './cube'
import { updateDB } from '../utils/firebase/Firebase'

const Cubes = () => {
  const {
    database: { cubes },
  } = useContext(DataContext)

  const [key, setKey] = useState<string>(uuid())
  const rerenderCubes = () => {
    setKey(uuid())
  }

  const onAddCubeHandler = async () => {
    const newCube = {
      id: uuid(),
      name: '',
      image: '',
    }
    if (cubes) {
      cubes.unshift(newCube)
    } else {
      await updateDB('/cubes', [newCube])
    }
    rerenderCubes()
  }

  return (
    <div className={'cubes-container'}>
      <h4 className={'form-header'}>Cubes</h4>
      <div key={key} className={'cubes-wrapper'}>
        {
          <div onClick={onAddCubeHandler} className={'add-cube'}>
            +
          </div>
        }
        {cubes?.map((cube) => (
          <Cube key={uuid()} id={cube.id} image={cube.image} name={cube.name} />
        ))}
      </div>
    </div>
  )
}

export default Cubes

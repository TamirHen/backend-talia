import React, { FC, useContext, useState } from 'react'
import '../../assets/styles/components/video/videos.scss'
import { v4 as uuid } from 'uuid'
import { DataContext } from '../../providers/DataProvider'
import { updateDB } from '../../utils/firebase/Firebase'
import { Grid, GridLayout, Image, ProjectPage, Video } from '../../common/types'
import { Link, useLocation, useNavigate } from 'react-router-dom'

interface VideosParams {
  videos: Video[] | undefined
  dbPathToVideos: string
  title: string
}

const Videos = (props: VideosParams) => {
  const { videos, dbPathToVideos, title } = props
  const location = useLocation()
  const {
    database: { cubes },
  } = useContext(DataContext)

  const onAddCubeHandler = async () => {
    const newVideo: Video = {
      id: uuid(),
      title: 'New Video',
      position: 0,
      videoId: '',
      projectPage: {
        subtitle: '',
        description: '',
        grid: {
          desktop: { rows: 1, columns: 1 },
          tablet: { rows: 1, columns: 1 },
          mobile: { rows: 1, columns: 1 },
        },
        images: [
          {
            id: uuid(),
            cubeId: (cubes && cubes[0].id) || '',
            desktop: {
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
            mobile: {
              columnEnd: 1,
              columnStart: 1,
              rowEnd: 1,
              rowStart: 1,
            },
          },
        ],
      },
    }
    if (videos) {
      videos.unshift(newVideo)
      await updateDB(dbPathToVideos, videos)
    } else {
      await updateDB(dbPathToVideos, [newVideo])
    }
  }

  return (
    <div className={'videos-container'}>
      <h5 className='form-header'>{title}</h5>
      <div className={'videos-wrapper'}>
        <button onClick={onAddCubeHandler} className={'add-video'}>
          +
        </button>
        {videos &&
          videos.map((video) => (
            <button className={'video-button'} key={uuid()}>
              <Link to={`${location.pathname}/${video.id}`}>{video.title}</Link>
            </button>
          ))}
      </div>
    </div>
  )
}

export default Videos

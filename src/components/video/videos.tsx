import React, { FC, useContext, useState } from 'react'
import '../../assets/styles/components/video/videos.scss'
import { v4 as uuid } from 'uuid'
import { DataContext } from '../../providers/DataProvider'
import { updateDB } from '../../utils/firebase/Firebase'
import { Video } from '../../common/types'
import { Link, useLocation } from 'react-router-dom'

interface VideosParams {
  dbPathToVideos: string
  videos: Video[] | undefined
}

const Videos = (props: VideosParams) => {
  const { videos } = props
  const location = useLocation()

  return (
    <div className={'videos-container'}>
      {videos &&
        videos.map((video) => (
          <button className={'video-button'} key={uuid()}>
            <Link to={`${location.pathname}/${video.videoId}`}>
              {video.title}
            </Link>
          </button>
        ))}
    </div>
  )
}

export default Videos

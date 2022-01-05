import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import '../../assets/styles/components/video/video.scss'
import { updateDB } from '../../utils/firebase/Firebase'
import { Video as VideoInterface } from '../../common/types'
import { useNavigate, useParams } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

interface VideoParams {
  videos: VideoInterface[] | undefined
  dbPathToVideos: string
  redirectTo: string
}

const Video = (props: VideoParams) => {
  const { videos, dbPathToVideos, redirectTo } = props

  const urlParams = useParams()
  const navigate = useNavigate()
  const [message, setMessage] = useState<string>()
  const video: VideoInterface | undefined = videos?.find(
    (video) => video.id.toString() === urlParams.id?.toString()
  )
  const [title, setTitle] = useState<string>(video?.title || '')
  const [videoId, setVideoId] = useState<string>(video?.videoId || '')
  const [subtitle, setSubtitle] = useState<string>(
    video?.projectPage.subtitle || ''
  )
  const [description, setDescription] = useState<string>(
    video?.projectPage.description || ''
  )

  const onTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }
  const onVideoIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setVideoId(event.currentTarget.value)
  }
  const onSubtitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSubtitle(event.currentTarget.value)
  }
  const onDescriptionChangeHandler = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.currentTarget.value)
  }

  const onSubmitHandler = async (
    event: React.SyntheticEvent
  ): Promise<void> => {
    setMessage(undefined)
    event.preventDefault()
    if (!video) {
      setMessage('Could not find video to update')
      return
    }
    video.title = title
    video.videoId = videoId
    video.projectPage.subtitle = subtitle
    video.projectPage.description = description
    if (!videos) {
      // if this is the first video
      video.id = uuid()
      const message = await updateDB(dbPathToVideos, [video])
      setMessage(message)
      return
    }
    for (const dbVideo of videos) {
      if (dbVideo.id.toString() === video.id.toString()) {
        dbVideo.title = video.title.trim()
        dbVideo.videoId = video.videoId.trim()
        dbVideo.projectPage.subtitle = video.projectPage.subtitle.trim()
        dbVideo.projectPage.description = video.projectPage.description.trim()
      }
    }
    const message = await updateDB(dbPathToVideos, videos)
    setMessage(message)
  }

  const onDeleteHandler = async (): Promise<void> => {
    setMessage(undefined)
    if (!videos || !video) {
      alert('Could not find video to delete')
      return
    }
    if (videos.length === 1) {
      alert('Could not delete the last video in the database')
      return
    }
    // extract the videos without the deleted one to a new array
    const updatedVideos: VideoInterface[] = videos.filter(
      (dbVideo) => dbVideo.id.toString() !== video.id.toString()
    )
    if (confirm('Are you sure you would like to delete this video?')) {
      await updateDB(dbPathToVideos, updatedVideos)
      navigate(redirectTo)
    }
  }

  return (
    <form className={'video-form'} onSubmit={onSubmitHandler}>
      <h4 className={'video-form-header form-header'}>{video?.title}</h4>
      <button
        className={'delete-button'}
        type={'button'}
        onClick={onDeleteHandler}
      >
        Delete
      </button>
      <label htmlFor='title'>Title</label>
      <input name={'title'} value={title} onChange={onTitleChangeHandler} />
      <label htmlFor='videoId'>Video ID</label>
      <input
        name={'videoId'}
        value={videoId}
        onChange={onVideoIdChangeHandler}
      />
      <label htmlFor={'subtitle'}>Subtitle</label>
      <input
        name={'subtitle'}
        value={subtitle}
        onChange={onSubtitleChangeHandler}
      />
      <label htmlFor='description'>Description</label>
      <textarea
        name='description'
        value={description}
        onChange={onDescriptionChangeHandler}
      />

      <button className={'update-button'} type={'submit'}>
        Save
      </button>
      {message && (
        <p
          className={'message'}
          style={{ color: message === 'saved' ? 'green' : 'red' }}
        >
          {message}
        </p>
      )}
    </form>
  )
}

export default Video

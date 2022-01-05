import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import '../../assets/styles/components/video/video.scss'
import { updateDB, uploadImage } from '../../utils/firebase/Firebase'
import { Video as VideoInterface } from '../../common/types'
import { useParams } from 'react-router-dom'

interface VideoParams {
  videos: VideoInterface[] | undefined
}

const Video = (props: VideoParams) => {
  const { videos } = props

  const urlParams = useParams()

  const [message, setMessage] = useState<string>()
  const [video, setVideo] = useState<VideoInterface>()
  const [title, setTitle] = useState<string>('')

  useEffect(() => {
    const video = videos?.find(
      (video) => video.videoId.toString() === urlParams.videoId?.toString()
    )
    console.log(video)
    setVideo(video)
  }, [])

  const onTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }

  const onSubmitHandler = async (
    event: React.SyntheticEvent
  ): Promise<void> => {
    setMessage(undefined)
    event.preventDefault()

    // const message = await updateDB()
    // setMessage(message)
  }

  return (
    <form className={'video-form'} onSubmit={onSubmitHandler}>
      <h4 className={'video-form-header form-header'}>{video?.title}</h4>
      <label htmlFor='title'>Title</label>
      <input name={'title'} value={title} onChange={onTitleChangeHandler} />
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

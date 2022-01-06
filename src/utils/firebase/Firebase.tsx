import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/auth'
import configData from './config.json'
import UploadTask = firebase.storage.UploadTask

const { firebaseConfig } = configData
firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth()
export const persistence = firebase.auth.Auth.Persistence
export const db = firebase.database().ref()
export const provider = new firebase.auth.GoogleAuthProvider()

export const updateDB = async (
  path: string,
  newValue: object | string
): Promise<string> => {
  const error = await firebase
    .database()
    .ref(path)
    .set(newValue, (error) => {
      if (error) {
        throw error
      }
    })
    .catch((error) => {
      return error.message
    })
  return error || 'saved'
}

export const uploadImage = async (
  path: string,
  image: File,
  fileName?: string
): Promise<UploadTask> => {
  const uploadTask = firebase
    .storage()
    .ref(`${path}/${fileName || image.name}`)
    .put(image)
  uploadTask.on(
    firebase.storage.TaskEvent.STATE_CHANGED,
    null,
    (error) => {
      console.error(error)
    },
    () => {
      console.log('file uploaded successfully')
    }
  )
  return uploadTask
}

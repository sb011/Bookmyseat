import { getDownloadURL, listAll, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../utils/firebaseConfig';

export const upload = async (folder, files) => {
  const promises = []
  files.forEach((item) => {
    // const fileName = new Date().getTime() + item.label + item.file.name;
    const storageRef = ref(storage, `${folder}/${item.name}`)
    const uploadTask =  uploadBytesResumable(storageRef, item.file)
    promises.push(uploadTask)
  })

  const result = await Promise.all(promises)
  const urlPromises = result.map(async item => {
    // console.log("yeas")
    const path = item.ref.toString()
    return await downloadFile(path)
  })

  return await Promise.all(urlPromises)
};





export const uploadFiles = async (folder, files) => {
  const promises = []

  files.forEach(file => {
    const storageRef = ref(storage, `${folder}/${file.name}`)
    const uploadTask =  uploadBytesResumable(storageRef, file)
    promises.push(uploadTask)
  })

  const result = await Promise.all(promises)
  const urlPromises = result.map(async item => {
    console.log("yeas")
    const path = item.ref.toString()
    return await downloadFile(path)
  })

  return await Promise.all(urlPromises)
}

export const downloadFile = async (path) => {
  let item = '';
  await getDownloadURL(ref(storage, path))
  .then(url => item = url)
  .catch(err => {
    // return toast.error(err.message)
  })

  return item;
}

export const getFiles = async (folder, callback) => {
  let listRef = ref(storage, `${folder}`)

  let newUrls = []

  listAll(listRef)
  .then(res => {
    const urlPromises = res.items.map(async itemRef => {
      const path = itemRef.toString()
      return await downloadFile(path)
    })

    return Promise.all(urlPromises).then(urls => callback(urls))
  })
  .catch(err => {
    // return toast.error(err.message)
  })
}
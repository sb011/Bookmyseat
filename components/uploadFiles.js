import { getDownloadURL, listAll, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../utils/firebaseConfig';
import { toast } from "react-toastify";

// export const upload = async (folder, files) => {
//   const promises = []
//   files.forEach((item) => {
//     console.log(item.type)
//     const metadata = {
//       contentType: `${item.type}`
//     };
//     const storageRef = ref(storage, `${folder}/${item.name}`)
//     const uploadTask =  uploadBytesResumable(storageRef, item.file, metadata)
//     promises.push(uploadTask)
//   })

//   const result = await Promise.all(promises)
//   console.log(result)
//   const urlPromises = result.map(async item => {
//     const path = item.ref.toString()
//     return await downloadFile(path)
//   })

//   return await Promise.all(urlPromises)
// };

export const upload = async (folder, files) => {
  let newImg = files.filter(img => img.name);
  let oldImg = files.filter(img => !img.name);
  let urls = [...oldImg];
  console.log(newImg)
  newImg.forEach((item) => {
    // console.log(item)
    const metadata = {
      contentType: `${item.type}`
    };
    
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, `${folder}/${item.name}`)
    const uploadTask =  uploadBytesResumable(storageRef, item, metadata)
    
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            toast.error(error.message)
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            toast.error(error.message)
            // User canceled the upload
            break;
    
          // ...
    
          case 'storage/unknown':
            toast.error(error.message)
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, 
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log('File available at', downloadURL);
          urls.push(downloadURL)
        });
      }
    )
  })
  return urls;
}





export const uploadFiles = async (folder, files) => {
  const promises = []

  files.forEach(file => {
    const storageRef = ref(storage, `${folder}/${file.name}`)
    const uploadTask =  uploadBytesResumable(storageRef, file)
    promises.push(uploadTask)
  })

  const result = await Promise.all(promises)
  const urlPromises = result.map(async item => {
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
    return toast.error(err.message)
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
    return toast.error(err.message)
  })
}
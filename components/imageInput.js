import { useState } from 'react'
import { toast } from 'react-toastify'

const ImageInput = ({ multiple, files, setFiles }) => {
    const [err, setErr] = useState('')

    const handleInputFiles = (e) => {
        e.preventDefault()
        const target = e.target
        const images = target.files;
        if(!images) 
            return;
        
        checkImages(images)

    }

    const checkImages = (images) => {
      // let img = [...files]
      let newFiles = []
  
      Array.from(images).map(file => {
        if(!file){
          return toast.error("File does not exist.")
        }
  
        const types = ['image/png', 'image/jpeg', 'image/gif']

        if(!types.includes(file.type)){
          return toast.error("The image type is png / jpeg / gif.")
        }
  
        if(file.size > 1024 * 1024){
          return toast.error("The largest image size is 1mb.")
        }
  
        return newFiles.push(file) 
      })
      
      setFiles([...files, ...newFiles])
    }

    const allowDrag = (e) => {
        e.preventDefault()
    }

    const drop = (e) => {
        e.preventDefault()
        let dt = e.dataTransfer
        let files = dt.files
        if(!files) 
            return;
        checkImages(files)
    }

    const removeImage = (index) => {
      const newArr = [...files];
      newArr.splice(index, 1);
      setFiles(newArr);
    }

    const showImage = (url, index) => {
        return (
          <div key={index}>
            <img src={url} alt="avatar" style={{width: "100px"}}/>
            <h5 onClick={() => removeImage(index)}>X</h5>
          </div>
        )
    }

    return (
        <div>
          <div onDrop={drop} onDragOver={allowDrag}>
            { 
                files.map((file, index) => (
                typeof(file) === 'string'
                ? showImage(file, index)
                : showImage(URL.createObjectURL(file), index)
                ))
            }
          </div>
          <span>Upload Image</span>
          <input id="file-upload" name="file-upload" type="file" accept=".jpg, .png, .gif" multiple={multiple} onChange={handleInputFiles} />
        </div>
    )
}

export default ImageInput
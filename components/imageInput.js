import { useState } from 'react'

const ImageInput = ({ multiple, files, setFiles }) => {
    const [err, setErr] = useState('')

    const handleInputFiles = (e) => {
        e.preventDefault()
        const target = e.target
        const files = target.files;
        if(!files) 
            return;
        
        checkImages(files)
    }

    const checkImages = (files) => {
        let newFiles = []
    
        Array.from(files).map(file => {
          if(!file){
            setErr("File does not exist.")
            return
          }
    
          const types = ['image/png', 'image/jpeg', 'image/gif']

          if(!types.includes(file.type)){
            setErr("The image type is png / jpeg / gif.")
            return
          }
    
          if(file.size > 1024 * 1024){
            setErr("The largest image size is 1mb.")
            return
          }
    
          newFiles.push(file)
        })
    
        setFiles(newFiles)
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

    const showImage = (url, index) => {
        return (
          <div key={index}>
            <img src={url} alt="avatar" style={{width: "100px"}}/>
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
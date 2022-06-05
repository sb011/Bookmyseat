import { useState } from 'react'
import { toast } from 'react-toastify'
import styles from "../styles/imageinput.module.scss"
import Image from "next/image"
import close from "../public/cancel.svg"

const ImageInput = ({ multiple, files, setFiles }) => {
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
  
        if(file.size > 1024 * 1024 * 5){
          return toast.error("The largest image size is 5mb.")
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
          <div key={index} className={styles.main_image}>
            <img className={styles.spec_image} src={url} alt="avatar"/>
            <div className={styles.cont_show_icon}>
              <Image className={styles.icon_close} src={close} alt="cancel" onClick={() => removeImage(index)} />
            </div>
          </div>
        )
    }

    return (
        <div className={styles.main_image}>
          <div className={styles.cont_input}>
            <input className={styles.input_image}  id="file-upload" name="file-upload" type="file" accept=".jpg, .png, .gif" multiple={multiple} onChange={handleInputFiles} />
          </div>
          <div onDrop={drop} onDragOver={allowDrag} className={styles.show_image}>
            { 
                files.map((file, index) => (
                typeof(file) === 'string'
                ? showImage(file, index)
                : showImage(URL.createObjectURL(file), index)
                ))
            }
          </div>
        </div>
    )
}

export default ImageInput
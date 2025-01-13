import React, { useState } from "react";
import { toast } from "react-toastify";
import Resize from "react-image-file-resizer";
import { removeFiles, uploadFiles } from "../../api/product";
import userEcomStore from "../../store/Ecom-store";

const UploadFile = ({ form, setForm }) => {
  const token = userEcomStore((state) => state.token);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (e) => {
    const files = e.target.files;

    if (files) {
      setIsLoading(true);
      let allFiles = form.images;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith("image/")) {
          toast.error(`File ${file.name} ไม่ใช่ไฟล์รูปภาพ`);
          continue;
        }

        Resize.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (data) => {
            uploadFiles(token, data)
              .then((res) => {
                console.log(res);

                allFiles.push(res.data);
                setForm({
                  ...form,
                  images: allFiles,
                });
                toast.success("Upload image Sucess");
              })
              .catch((error) => {
                console.log(error);
              });
          },
          "base64"
        );
      }
    }
    console.log(e.target.files);
  };



  const handleDelete = (public_id) =>{
 
    const images = form.images

    removeFiles(token,public_id)
    .then((res)=>{
      console.log(res)
      const filterImages = images.filter((item)=>{
        return item.public_id !== public_id
      })
      console.log(filterImages)
      setForm({
        ...form,
        images : filterImages
      })
      toast.error(res.data.message)
    })
    .catch((erro)=>{
      console.log(erro)
    })
  }

  return (
    <div className="py-4">
      <div className="flex mx-4 gap-4 py-4">
       {
        form.images.map((item,index)=>
          <div className="relative" key={index}>
              <img className="w-24 h-24 hover:scale-105" src={item.url} alt="" />
              <span className="absolute top-0 right-0 bg-red-500 p-1 rounded-md"
              onClick={()=>handleDelete(item.public_id)}>X</span>
          </div>
        )
       }
      </div>

      <div>
        <input 
        type="file" 
        onChange={handleOnChange}
         name="images"
          multiple />
      </div>
    </div>
  );
};

export default UploadFile;

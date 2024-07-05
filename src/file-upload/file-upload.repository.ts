import { Injectable } from "@nestjs/common";
import { UploadApiResponse, v2 } from "cloudinary";//promesa de una respuesta que me da cloudinary qye me devuelve un url de donde guardo el tipado
import toStream = require('buffer-to-stream')

@Injectable()
export class CloudinaryRepository {
  async uploadImage(file:Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject)=>{
        const upload = v2.uploader.upload_stream(
            {resource_type: 'auto'},
            (error, result)=>{
            if (error) {
                reject(error)
            }else{
                resolve(result)
            }
        })
        toStream(file.buffer).pipe(upload)
    })
  }
}
//? resolve= resolver, si sale bien me devuelve el resultado mediante el else de resolve(result)
//! reject= rechazar, si sale mal devuelveme el resultado por medio de reject(error)
//*toStream= sirve para cambiar el formato, convertirlo en toStream
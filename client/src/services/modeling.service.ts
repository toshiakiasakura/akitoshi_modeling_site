import axios from 'axios'

const API_URL = '/api/models'

export class ModelService { 
  static async test(){
    return axios.get(API_URL)
    .then(res => {
      console.log(res)
    })
  }
  static async getGNEMyopathy(data:any){
    return axios.post(API_URL + '/gne-myopathy', data)
      .then( async res => {
        const result = await fetch(API_URL + '/gne-file')
        const blob = await result.blob()
        return URL.createObjectURL(blob)

      })
  }
}
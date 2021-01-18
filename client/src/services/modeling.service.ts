import axios from 'axios'

const API_URL = '/api/user'

class ModelService { 
  static async test(){
    return axios.get(API_URL)
    .then(res => {
      console.log(res)
    })
  }
}
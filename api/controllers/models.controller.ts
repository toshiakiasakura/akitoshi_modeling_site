import fs from 'fs'
import path from 'path'
import { Request, Response, NextFunction } from "express";
import { PythonShell } from 'python-shell'


// https://stackoverflow.com/questions/36090655/running-a-python-script-in-virtual-environment-with-node-js-pm2
// https://github.com/extrabacon/python-shell/issues/49


const PYTHON_DIR = `${__dirname}/../../../api/modeling`
const PYTHON_PATH = `/home/toshiaki/.pyenv/shims/python`

export class Models {
  static GNE_myopathy = (req: Request, res:Response) => {
    
    const main_path = `${PYTHON_DIR}/main.py`
    console.log(main_path)
    let params = req.body
    let values = [
      params.knee_flexion, params.ankle_dorsiflex, params.knee_extension, 
      params.grip, params.shoulder_abduction, params.elbow_flexion
    ]

    let options : {[index: string]: any} = {
      mode:'text',
      pythonPath: PYTHON_PATH,
      args: JSON.stringify({'data':values})
    }
    console.log(JSON.stringify(params))

    PythonShell.run(main_path, options, (err, result) => {
      if(err) {
        console.log(err)
        res.json({status:400})
      } else {
        res.json({status:200})
      }
      })
  }

  static sendFile(req:Request, res:Response){
    res.download(path.resolve(`${PYTHON_DIR}/test.png`))
  }
}
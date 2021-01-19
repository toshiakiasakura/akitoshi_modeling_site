import express from 'express'
const router = express.Router()

import { Models } from '../api/controllers/models.controller'

router.post('/gne-myopathy', Models.GNE_myopathy)
router.get('/gne-file', Models.sendFile)

export { router as modelRouter }
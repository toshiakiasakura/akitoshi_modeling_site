import express from 'express'
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('running')
  res.send('respond with a resource');
})

export { router as userRouter }


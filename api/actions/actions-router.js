// Write your "actions" router here!
const express = require('express')
const router = express.Router()
const Actions = require('./actions-model')
const { validateUserId, validatePost } = require('./actions-middlware')

router.get('/', (req, res, next) => {
  Actions.get(req.params.id)
    .then((action) => {
      res.status(200).json(action)
    })
    .catch((err) => {
      next(err)
    })
})

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.action)
})

router.post('/', validatePost, (req, res, next) => {
  Actions.insert(req.body)
    .then((action) => {
      res.status(201).json(action)
    })
    .catch((err) => {
      next(err)
    })
})

router.put('/:id', validateUserId, validatePost, (req, res, next) => {
  Actions.update(req.params.id, req.body)
    .then((action) => {
      res.status(200).json(action)
    })
    .catch((err) => {
      next(err)
    })
})

router.delete('/:id', validateUserId, (req, res, next) => {
  Actions.get(req.params.id)
    .then((action) => {
      Actions.remove(req.params.id).then(() => {
        res.status(200).json(action)
      })
    })
    .catch((err) => {
      next(err)
    })
})

//eslint-disable-next-line
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: 'something is wrong with the server',
    message: err.message,
  })
})

module.exports = router

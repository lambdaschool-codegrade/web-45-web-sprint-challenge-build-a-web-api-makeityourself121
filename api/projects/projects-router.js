// Write your "projects" router here
const express = require('express')
const router = express.Router()
const Projects = require('./projects-model')
const {
  validateUserId,
  validatePost,
  validatePostCompleted,
} = require('./projects-middleware')
router.get('/', (req, res, next) => {
  Projects.get(req.params.id)
    .then((project) => {
      res.status(200).json(project)
    })
    .catch((err) => {
      next(err)
    })
})

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.project)
})

router.post('/', validatePost, (req, res, next) => {
  Projects.insert(req.body)
    .then((project) => {
      res.status(201).json(project)
    })
    .catch((err) => {
      next(err)
    })
})

router.put(
  '/:id',
  validateUserId,
  validatePostCompleted,
  async (req, res, next) => {
    try {
      await Projects.update(req.params.id, req.body)
      res.status(200).json(req.body)
    } catch (err) {
      next(err)
    }
  },
)

router.delete('/:id', validateUserId, (req, res, next) => {
  Projects.get(req.params.id)
    .then((project) => {
      Projects.remove(req.params.id).then(() => {
        res.status(200).json(project)
      })
    })
    .catch((err) => {
      next(err)
    })
})

router.get('/:id/actions', validateUserId, (req, res, next) => {
  Projects.getProjectActions(req.params.id)
    .then((project) => {
      res.status(200).json(project)
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

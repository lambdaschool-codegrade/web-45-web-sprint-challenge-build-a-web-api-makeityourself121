// add middlewares here related to projects
const Projects = require('./projects-model')

function validateUserId(req, res, next) {
  const { id } = req.params
  Projects.get(id).then((project) => {
    if (project) {
      req.project = project
      next()
    } else {
      res.status(404).json({
        message: 'user not found',
      })
    }
  })
}

function validatePost(req, res, next) {
  const { name, description } = req.body

  if (!name || !description) {
    res.status(400).json({
      message: 'missing required text field',
    })
  } else {
    next()
  }
}

function validatePostCompleted(req, res, next) {
  const { name, description, completed } = req.body

  if (!name || !description || completed == undefined) {
    res.status(400).json({
      message: 'missing required text field',
    })
  } else {
    next()
  }
}

module.exports = { validateUserId, validatePost, validatePostCompleted }

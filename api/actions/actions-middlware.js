// add middlewares here related to actions
const Actions = require('./actions-model')

function validateUserId(req, res, next) {
  const { id } = req.params
  Actions.get(id).then((action) => {
    if (action) {
      req.action = action
      next()
    } else {
      res.status(404).json({
        message: 'user not found',
      })
    }
  })
}

function validatePost(req, res, next) {
  const { notes, description, project_id, completed } = req.body

  if (
    !notes ||
    !description ||
    project_id == undefined ||
    completed == undefined
  ) {
    res.status(400).json({
      message: 'missing required text field',
    })
  } else {
    next()
  }
}

module.exports = { validateUserId, validatePost }

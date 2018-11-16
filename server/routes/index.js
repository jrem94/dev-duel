import { Router } from 'express'
import axios from 'axios'
import validate from 'express-validation'
import token from '../../token'
import { mapper } from '../lib/mapping'

import validation from './validation'
import user from './validation/user'

export default () => {
  let router = Router()

  router.get('/health-check', (req, res) => res.send('OK'))

  router.get('/rate', (req, res) => {
    axios
      .get(`http://api.github.com/rate_limit`, {
        headers: {
          Authorization: token
        }
      })
      .then(({ data }) => res.json(data))
  })

  router.get('/user/:username', validate(validation.user), (req, res) => {
    console.log(req.params.username)
    axios
      .get(`https://api.github.com/users/${req.params.username}`, {
        headers: { Authorization: token }
      })
      .then(({ data }) => mapper(data))
      .then(data => res.json(data))
  })

  /** GET /api/users? - Get users  req.query.username */
  router.get('/users/', validate(validation.users), (req, res) => {
    // TODO Fetch data for users specified in query parse/map data to appropriate structure and return as a JSON array
    console.log(req.query)
    axios
      .get(`https://api.github.com/users/${req.query.username}`, {
        headers: { Authorization: token }
      })
      .then(({ data }) => mapper(data))
      .then(data => res.json(data))
  })

  return router
}

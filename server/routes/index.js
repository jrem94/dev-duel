import { Router } from 'express'
import axios from 'axios'
import validate from 'express-validation'
import token from '../../token'
import { mapper } from '../lib/mapping'

import validation from './validation'

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
      .get('https://api.github.com/users/' + `${req.params.username}`, {
        headers: {
          Authorization: token
        }
      })
      .then(({ data }) => mapper(data))
      .then(data => res.json(data))
  })

  /** GET /api/users? - Get users */
  router.get('/users/', validate(validation.users), (req, res) => {
    console.log(req.query)
    // TODO Fetch data for users specified in query parse/map data to appropriate structure and return as a JSON array
    fetch('https://api.github.com/users/jrem94') // right now goes to my profile
      .then(response => response.json())
      .then(data => {
        console.log(data) // Prints result from `response.json()` in getRequest
      })
      .catch(error => console.error(error))
  })

  return router
}

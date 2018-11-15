import { Router } from 'express'
import axios from 'axios'
import validate from 'express-validation'
import token from '../../token'

import validation from './validation'

export default () => {
  let router = Router()

  /** GET /health-check - Check service health */
  router.get('/health-check', (req, res) => res.send('OK'))

  // The following is an example request.response using axios and the
  // express res.json() function
  /** GET /api/rate_limit - Get github rate limit for your token */
  router.get('/rate', (req, res) => {
    axios
      .get(`http://api.github.com/rate_limit`, {
        headers: {
          Authorization: token
        }
      })
      .then(({ data }) => res.json(data))
  })

  /** GET /api/user/:username - Get user */
  router.get('/user/:username', validate(validation.user), (req, res) => {
    console.log(req.params.username)
    // TODO Fetch data for user specified in path variable parse/map data to appropriate structure and return as JSON object
    axios
      .get('https://api.github.com/users/' + `${req.params.username}`, {
        headers: {
          Authorization: token
        }
      })
      .then(({ data }) => res.json(data))
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

/*
Get user JSON and convert into appropriate object.
Get two users JSON and convert into approptiate object. This will likely require a promise.all(user1, user2). Then
apply logic to determine who wins and trigger a visual on the winner.
*/

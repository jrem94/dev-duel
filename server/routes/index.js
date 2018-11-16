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

  const getUsers = username => {
    return axios.get(`https://api.github.com/users/${username}`, {
      headers: { Authorization: token }
    })
  }

  /** GET /api/users? - Get users */
  router.get('/users/', validate(validation.users), (req, res) => {
    console.log(req.query)
    Promise.all([
      getUsers(req.query.username[0]),
      getUsers(req.query.username[1])
    ]).then(([u1, u2]) => {
      const u1Mapped = mapper(u1.data)
      const u2Mapped = mapper(u2.data)

      res.json([u1Mapped, u2Mapped])
    })
  })
  return router
}

// map each user to promise
// users.map(x => getUser(x))
// map again for for the .thn

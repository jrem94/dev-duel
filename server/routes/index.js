import { Router } from 'express'
import axios from 'axios'
import validate from 'express-validation'
import token from '../../token'

import validation from './validation'
import { getProfile, getAllProfiles } from '../lib/mapping.js'

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
      .catch(error => {
        res.json({
          status: error.response.status,
          message: error.response.data.message
        })
      })
  })

  router.get('/user/:username', validate(validation.user), (req, res) => {
    let url = `https://api.github.com/users/${req.params.username}`
    getProfile(url)
      .then(data => res.send(data))
      .catch(err => {
        return res.status(err.response.status).json()
      })
      .catch(error => {
        res.json({
          status: error.response.status,
          message: error.response.data.message
        })
      })
  })

  router.get('/users/', validate(validation.users), (req, res, next) => {
    let url = 'https://api.github.com/users/'
    let allProfiles = req.query.username

    axios
      .all(getAllProfiles(url, allProfiles))
      .then(data => {
        res.send(data)
      })
      .catch(error => {
        res.json({
          status: error.response.status,
          message: error.response.data.message
        })
      })
  })
  return router
}

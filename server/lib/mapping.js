import token from '../../token'
import axios from 'axios'

const getTitles = (repos, followers, following) => {
  let titles = []
  let langCount = getNumberOfLanguages(repos)
  let numForks = 0
  if (following >= followers * 2 && following > 0) {
    titles.push('Stalker')
  } else if (followers >= following * 2 && followers > 0) {
    titles.push('Mr. Popular')
  }
  for (let repo of repos) {
    if (repo.fork) {
      numForks++
    }
  }
  if (numForks / repos.length > 0.5) {
    titles.push('Forker')
  }
  if (langCount > 10) {
    titles.push('Jack of All Trades')
  } else if (langCount > 1 && langCount < 10) {
    titles.push('Experimental')
  } else if (langCount === 1) {
    titles.push('One-Trick Pony')
  }
  return titles
}

const getTotalStars = repos => {
  let total_stars = 0
  for (let repo of repos) {
    total_stars += repo.stargazers_count
  }
  return total_stars
}

const getMostStarred = repos => {
  let highest_stars = 0
  for (let repo of repos) {
    if (repo.stargazers_count > highest_stars) {
      highest_stars = repo.stargazers_count
    }
  }
  return highest_stars
}

const getPerfectRepos = repos => {
  let perfect_repos = 0
  for (let repo of repos) {
    if (repo.open_issues_count == 0) {
      perfect_repos++
    }
  }
  return perfect_repos
}

const getFavoriteLanguage = repos => {
  let languages = {}
  let langCount = 0
  for (let repo of repos) {
    if (repo.language in languages) {
      languages[`${repo.language}`] += 1
    } else {
      if (repo.language) {
        languages[`${repo.language}`] = 1
      }
    }
  }
  let favoriteLanguage
  for (let language in languages) {
    if (languages[language] > langCount) {
      favoriteLanguage = language
      langCount = languages[language]
    }
  }

  return favoriteLanguage
}

const getNumberOfLanguages = repos => {
  let languages = {}
  for (let repo of repos) {
    if (repo.language in languages) {
      languages[`${repo.language}`] += 1
    } else {
      if (repo.language) {
        languages[`${repo.language}`] = 1
      }
    }
  }
  return Object.keys(languages).length
}

const getProfile = url => {
  let profile = {}
  let repos = {}

  return axios
    .get(url, { headers: { Authorization: token } })
    .then(response => response.data)
    .then(data => {
      repos.reposUrl = data.repos_url

      profile.username = data.login
      profile.fullName = data.name
      profile.location = data.location
      profile.email = data.email
      profile.bio = data.bio
      profile.avatar = data.avatar_url
      profile.titles = []
      profile.favorite_language = ''
      profile.total_stars = 0
      profile.most_starred = 0
      profile.public_repos = data.public_repos
      profile.perfect_repos = 0
      profile.followers = data.followers
      profile.following = data.following

      return axios.get(repos.reposUrl, { headers: { Authorization: token } })
    })
    .then(response => response.data)
    .then(data => {
      profile.titles.push(
        ...getTitles(data, profile.followers, profile.following)
      )
      profile.favorite_language = getFavoriteLanguage(data)
      profile.total_stars = getTotalStars(data)
      profile.most_starred = getMostStarred(data)
      profile.perfect_repos = getPerfectRepos(data)
      return profile
    })
}

const getAllProfiles = (url, allProfiles) => {
  let users = []
  for (let i = 0; i < allProfiles.length; i++) {
    users.push(getProfile(url + allProfiles[i]))
  }
  return users
}

export { getProfile, getAllProfiles }

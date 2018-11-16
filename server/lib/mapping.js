const mapper = jsonData => {
  let profile = {}
  let data = jsonData

  profile.fullname = data.name
  profile.location = data.location
  profile.email = data.email
  profile.bio = data.bio
  profile.avatar = data.avatar_url
  // profile.titles = getTitles(repos)
  // profile.favorite_language = getFavoriteLanguage(repos)
  profile.public_repos = data.public_repos
  // profile.total_stars = getNumberOfStars(repos)
  // profile.most_starred = getHighestStarCount(repos)
  // profile.perfect_repos = getNumberOfPerfectRepos(repos)
  profile.followers = data.followers
  profile.following = data.following

  return profile
}

const getTitles = data => {
  // TODO return array of titles
  return 'Wingman'
}

const getFavoriteLanguage = data => {
  // TODO return favorite language
  return 'Javascript'
}

const getNumberOfStars = data => {
  // TODO return number of stars
  const repos = data
  let starCount = 0
  repos.forEach(function (repo) {
    starCount += repo.stargazers_count
  })
  return starCount
}

const getHighestStarCount = data => {
  // TODO return highest star count
  const repos = data
  let highestStars = 0
  repos.forEach(function (repo) {
    if (repo.stargazers_count > highestStars) {
      highestStars = repo.stargazers_count
    }
  })
  return highestStars
}

const getNumberOfPerfectRepos = data => {
  // TODO return number of perfect repos
  const repos = data
  let counter = 0
  repos.forEach(function (repo) {
    if (repo.open_issues_count === 0) {
      counter++
    }
  })
  return counter
}

export { mapper }

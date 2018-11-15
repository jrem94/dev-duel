const mapper = jsonData => {
  let profile = {}
  let data = jsonData

  profile.fullname = data.name
  profile.location = data.location
  profile.email = data.email
  profile.bio = data.bio
  profile.avatar = data.avatar_url
  profile.titles = getTitles(data)
  profile.favorite_language = getFavoriteLanguage(data)
  profile.public_repos = data.public_repos
  profile.total_stars = getNumberOfStars(data)
  profile.most_starred = getHighestStarCount(data)
  profile.perfect_repos = getNumberOfPerfectRepos(data)
  profile.followers = data.followers
  profile.following = data.following

  return profile
}

const getTitles = data => {
  // TODO return array of titles
}

const getFavoriteLanguage = data => {
  // TODO return favorite language
}

const getNumberOfStars = data => {
  // TODO return number of stars
}

const getHighestStarCount = data => {
  // TODO return highest star count
}

const getNumberOfPerfectRepos = data => {
  // TODO return number of perfect repos
}

const getRepos = data => {
  const reposList = fetch(data.repos_url)
}

export { mapper }

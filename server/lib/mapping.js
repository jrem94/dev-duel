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

export { mapper }

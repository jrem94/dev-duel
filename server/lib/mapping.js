const mapper = jsonData => {
  let profile = {}
  let data = jsonData

  profile.fullname = data.name
  profile.location = data.location
  profile.bio = data.bio
  profile.avatar = data.avatar_url
  // Titles logic
  // favorite language
  profile.public_repos = data.public_repos
  // number of stars
  // highest start count
  // number of perfect projects
  profile.followers = data.followers
  profile.following = data.following

  return profile
}

export { mapper }

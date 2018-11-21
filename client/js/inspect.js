$('form').submit(() => {
  const username = $('form input').val()

  fetch(`${USER_URL}/${username}`)
    .then(response => response.json())
    .then(data => {
      const profile = data
      $('.user-error').addClass('hide')
      $('.username').text(profile.username || 'username: N/A')
      $('.full-name').text(profile.fullName || 'name: N/A')
      $('.location').text(profile.location || 'location: N/A')
      $('.email').text(profile.email || 'email: N/A')
      $('.bio').text(profile.bio || 'bio: N/A')
      $('.avatar').attr('src', profile.avatar)
      $('.titles').text(profile.titles || 'N/A')
      $('.favorite-language').text(profile.favorite_language || 'N/A')
      $('.total-stars').text(profile.total_stars || 0)
      $('.most-starred').text(profile.most_starred || 0)
      $('.public-repos').text(profile.public_repos || 0)
      $('.perfect-repos').text(profile.perfect_repos || 0)
      $('.followers').text(profile.followers || 0)
      $('.following').text(profile.following || 0)
      $('.user-results').removeClass('hide')
    })
    .catch(err => {
      $('.user-results').addClass('hide')
      $('.user-error').removeClass('hide')
      $('.user-error .error').text(`${error}`)
    })
  return false
})

$('form').submit(() => {
  const username = $('form input').val()
  console.log(`examining ${username}`)

  fetch(`${USER_URL}/${username}`)
    .then(response => response.json())
    .then(data => {
      console.log(`Got data for ${username}`)
      console.log(data)
      const profile = data
      $('.user-error').addClass('hide')
      $('.username').html(username || 'username: N/A')
      $('.full-name').html(profile.fullname || 'fullname: N/A')
      $('.location').html(profile.location || 'location: N/A')
      $('.email').html(profile.email || 'email: N/A')
      $('.bio').html(profile.bio || 'bio: N/A')
      $('.avatar').attr('src', profile.avatar)
      // $('.titles').html(profile.email || 'email: N/A')
      // $('.favorite-language').html(profile.email || 'email: N/A')
      // $('.total-stars').html(profile.email || 'email: N/A')
      // $('.most-starred').html(profile.email || 'email: N/A')
      $('.public-repos').html(profile.public_repos || 'public repos: N/A')
      // $('.perfect-repos').html(profile.email || 'email: N/A')
      $('.followers').html(profile.followers || 'followers: N/A')
      $('.following').html(profile.following || 'following: N/A')
      $('.user-results').removeClass('hide')
    })
    .catch(err => {
      console.log(`Error getting data for ${username}`)
      console.log(err)
      $('.user-results').addClass('hide')
      $('.error').html(err)
      $('.user-error').removeClass('hide')
    })

  return false
})

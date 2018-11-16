$('form').submit(() => {
  const leftDuelist = $('form [name=username-left]').val()
  const rightDuelist = $('form [name=username-right]').val()

  fetch(`${USER_URL}s?username=${leftDuelist}&username=${rightDuelist}`)
    .then(response => response.json())
    .then(data => {
      console.log(data[0])
      let profile = data[0]
      $('.duel-error').addClass('hide')

      $('.left .username').html(leftDuelist || 'username: N/A')
      $('.left .full-name').html(profile.fullname || 'fullname: N/A')
      $('.left .location').html(profile.location || 'location: N/A')
      $('.left .email').html(profile.email || 'email: N/A')
      $('.left .bio').html(profile.bio || 'bio: N/A')
      $('.left .avatar').attr('src', profile.avatar)
      // $('.left .titles').html(profile.email || 'email: N/A')
      // $('.left .favorite-language').html(profile.email || 'email: N/A')
      // $('. left .total-stars').html(profile.email || 'email: N/A')
      // $('.left .most-starred').html(profile.email || 'email: N/A')
      $('.left .public-repos').html(profile.public_repos || 'public repos: N/A')
      // $('.left .perfect-repos').html(profile.email || 'email: N/A')
      $('.left .followers').html(profile.followers || 'followers: N/A')
      $('.left .following').html(profile.following || 'following: N/A')

      $('.user-results .right').removeClass('hide')
      $('.duel-container').removeClass('hide')

      return data[1]
    })
    .then(data => {
      let profile = data
      console.log(data)
      $('.duel-error').addClass('hide')

      $('.right .username').html(rightDuelist || 'username: N/A')
      $('.right .full-name').html(profile.fullname || 'fullname: N/A')
      $('.right .location').html(profile.location || 'location: N/A')
      $('.right .email').html(profile.email || 'email: N/A')
      $('.right .bio').html(profile.bio || 'bio: N/A')
      $('.right .avatar').attr('src', profile.avatar)
      // $('.right .titles').html(profile.email || 'email: N/A')
      // $('.right .favorite-language').html(profile.email || 'email: N/A')
      // $('. right .total-stars').html(profile.email || 'email: N/A')
      // $('.right .most-starred').html(profile.email || 'email: N/A')
      $('.right .public-repos').html(
        profile.public_repos || 'public repos: N/A'
      )
      // $('.right .perfect-repos').html(profile.email || 'email: N/A')
      $('.right .followers').html(profile.followers || 'followers: N/A')
      $('.right .following').html(profile.following || 'following: N/A')

      $('.user-results .right').removeClass('hide')
      $('.duel-container').removeClass('hide')
    })

  return false
})

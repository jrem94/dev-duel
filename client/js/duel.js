$('form').submit(() => {
  const leftDuelist = $('form [name=username-left]').val()
  const rightDuelist = $('form [name=username-right]').val()

  fetch(`${USER_URL}s?username=${leftDuelist}&username=${rightDuelist}`)
    .then(response => response.json())
    .then(data => {
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
      $('.left-score').html(getRoll())

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
      $('.right-score').html(getRoll())

      $('.user-results .right').removeClass('hide')
      $('.duel-container').removeClass('hide')

      compareScores()
    })

  return false
})

const getRoll = () => {
  const roll = Math.floor(Math.random() * 20) + 1
  return roll
}

const compareScores = () => {
  const leftScore = parseInt($('.left-score').text())
  const rightScore = parseInt($('.right-score').text())

  if (leftScore > rightScore) {
    $('.user-results.right').removeClass('draw')
    $('.user-results.left').removeClass('draw')
    $('.user-results.right').removeClass('winner')

    $('.user-results.left').addClass('winner')
  } else if (rightScore > leftScore) {
    $('.user-results.right').removeClass('draw')
    $('.user-results.left').removeClass('draw')
    $('.user-results.left').removeClass('winner')

    $('.user-results.right').addClass('winner')
  } else if (leftScore === rightScore) {
    $('.user-results.left').removeClass('winner')
    $('.user-results.right').removeClass('winner')

    $('.user-results.right').addClass('draw')
    $('.user-results.left').addClass('draw')
  }
}

$('form').submit(() => {
  const leftDuelist = $('form [name=username-left]').val()
  const rightDuelist = $('form [name=username-right]').val()

  fetch(`${USER_URL}s?username=${leftDuelist}&username=${rightDuelist}`)
    .then(response => {
      if (response.status === 400) {
        throw new Error('HTTP status 400: Bad Request')
      } else if (response.status === 404) {
        throw new Error('HTTP status 404: Invalid or Nonexistant User')
      } else if (response.status > 400 && response.status < 500) {
        throw new Error('HTTP status in the 400s: Client Error')
      } else if (response.status >= 500) {
        throw new Error('HTTP status in the 500s: Server Error')
      } else if (leftDuelist === rightDuelist) {
        throw new Error('Identical users detected.')
      }
      return response.json()
    })
    .then(data => {
      let profile = data[0]
      $('.duel-error').addClass('hide')

      $('.left .username').text(leftDuelist || 'username: N/A')
      $('.left .full-name').text(profile.fullName || 'name: N/A')
      $('.left .location').text(profile.location || 'location: N/A')
      $('.left .email').text(profile.email || 'email: N/A')
      $('.left .bio').text(profile.bio || 'bio: N/A')
      $('.left .avatar').attr('src', profile.avatar)
      $('.left .titles').text(profile.titles || 'N/A')
      $('.left .favorite-language').text(profile.favorite_language || 'N/A')
      $('.left .total-stars').text(profile.total_stars || 0)
      $('.left .most-starred').text(profile.most_starred || 0)
      $('.left .public-repos').text(profile.public_repos || 0)
      $('.left .perfect-repos').text(profile.perfect_repos || 0)
      $('.left .followers').text(profile.followers || 0)
      $('.left .following').text(profile.following || 0)
      $('.left-score').text(calculateScore(profile))

      $('.user-results .right').removeClass('hide')
      $('.duel-container').removeClass('hide')
      return data[1]
    })
    .then(data => {
      let profile = data
      $('.duel-error').addClass('hide')

      $('.right .username').text(rightDuelist || 'username: N/A')
      $('.right .full-name').text(profile.fullName || 'name: N/A')
      $('.right .location').text(profile.location || 'location: N/A')
      $('.right .email').text(profile.email || 'email: N/A')
      $('.right .bio').text(profile.bio || 'bio: N/A')
      $('.right .avatar').attr('src', profile.avatar)
      $('.right .titles').text(profile.titles || 'N/A')
      $('.right .favorite-language').text(profile.favorite_language || 'N/A')
      $('.right .total-stars').text(profile.total_stars || 0)
      $('.right .most-starred').text(profile.most_starred || 0)
      $('.right .public-repos').text(profile.public_repos || 0)
      $('.right .perfect-repos').text(profile.perfect_repos || 0)
      $('.right .followers').text(profile.followers || 0)
      $('.right .following').text(profile.following || 0)
      $('.right-score').text(calculateScore(profile))

      $('.user-results .right').removeClass('hide')
      $('.duel-container').removeClass('hide')

      compareScores()
    })
    .catch(error => {
      $('.duel-container').addClass('hide')
      $('.duel-error').removeClass('hide')
      $('.duel-error .error').text(`${error}`)
    })

  return false
})

const calculateScore = profile => {
  const roll = getRoll()
  let modifiers = 0

  modifiers += parseInt(profile.total_stars / 10)
  modifiers += parseInt(profile.most_starred / 10)
  modifiers += parseInt(profile.perfect_repos / 10)
  modifiers -=
    (parseInt(profile.public_repos / 10) -
      parseInt(profile.perfect_repos / 10)) *
    10
  modifiers += parseInt(profile.followers / 10)

  return roll + modifiers
}

const getRoll = () => {
  const roll = Math.floor(Math.random() * 100) + 1
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

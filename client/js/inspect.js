/* eslint-disable no-undef */
$('form').submit(() => {
  const username = $('form input').val()
  console.log(`examining ${username}`)

  // Fetch data for given user
  // (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
  fetch(`${USER_URL}/${username}`)
    .then(response => response.json()) // Returns parsed json data from response body as promise
    .then(data => {
      console.log(`Got data for ${username}`)
      console.log(data)
      const profile = data
      $('.username').html(`${username}`)
      $('.full-name').html(`${profile.fullname}`)
      $('.location').html(`${profile.location}`)
      $('.email').html(`${profile.email}`)
      $('.bio').html(`${profile.bio}`)
      $('.avatar').attr('src', `${profile.avatar}`)
      // $('.titles').html(`${profile.titles}`)
      // $('.favorite-language').html(`${profile.favorite_language}`)
      // $('.total-stars').html(`${profile.total_stars}`)
      // $('.most-starred').html(`${profile.most_starred}`)
      $('.public-repos').html(`${profile.public_repos}`)
      // $('.perfect-repos').html(`${profile.perfect_repos}`)
      $('.followers').html(`${profile.followers}`)
      $('.following').html(`${profile.following}`)

      $('.user-results').removeClass('hide') // Display '.user-results' element
    })
    .catch(err => {
      console.log(`Error getting data for ${username}`)
      console.log(err)
      /*
        TODO
        If there is an error finding the user, instead toggle the display of the '.user-error' element
        and populate it's inner span '.error' element with an appropriate error message
      */
    })

  return false // return false to prevent default form submission
})

const Api = {}

const apiBaseUrl = 'https://localhost:8080'
const requiresCors = true

/**
 *  Does a POST request to the API.
 * 
 * @param {String} relativePath 
 * @param {Object} requestBody 
 * @returns {Promise} A promise returned by fetch method
 */
Api.post = function(relativePath, requestBody) {
  let options = {
    method: 'POST'
  }
  if(requestBody) {
    options.headers = {
        'Content-Type': 'application/json'
    }
    options.body = JSON.stringify(requestBody)
  }
  if(requiresCors) {
    options.credentials = 'include'
  }
  return fetch(apiBaseUrl + relativePath, options)
}

export default Api
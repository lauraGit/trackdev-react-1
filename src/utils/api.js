const Api = {}

const apiBaseUrl = 'https://localhost:8080'
const requiresCors = true

const buildBaseFetchOptions = function() {
  let options = {}
  if(requiresCors) {
    options.credentials = 'include'
  }
  return options
}

/**
 *  Does a GET request to the API.
 * 
 * @param {String} relativePath 
 * @returns {Promise} A promise returned by fetch method
 */
Api.get = function(relativePath) {
  let options = buildBaseFetchOptions()
  return fetch(apiBaseUrl + relativePath, options)
}

/**
 *  Does a POST request to the API.
 * 
 * @param {String} relativePath 
 * @param {Object} requestBody 
 * @returns {Promise} A promise returned by fetch method
 */
Api.post = function(relativePath, requestBody) {
  let options = buildBaseFetchOptions()
  options.method = 'POST'
  if(requestBody) {
    options.headers = {
        'Content-Type': 'application/json'
    }
    options.body = JSON.stringify(requestBody)
  }
  return fetch(apiBaseUrl + relativePath, options)
}

export default Api
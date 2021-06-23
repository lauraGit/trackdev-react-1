const Api = {}

const apiBaseUrl = 'https://localhost:8080'
const requiresCors = true

/**
 *  Does a GET request to the API.
 * 
 * @param {String} relativePath 
 * @returns {Promise} A promise returned by fetch method
 */
Api.get = function(relativePath) {
  return Api.send('GET', relativePath)
}

/**
 *  Does a POST request to the API.
 * 
 * @param {String} relativePath 
 * @param {Object} requestBody 
 * @returns {Promise} A promise returned by fetch method
 */
Api.post = function(relativePath, requestBody) {
  return Api.send('POST', relativePath, requestBody)
}

/**
 *  Does a PATCH request to the API.
 * 
 * @param {String} relativePath 
 * @param {Object} requestBody 
 * @returns {Promise} A promise returned by fetch method
 */
Api.put = function(relativePath, requestBody) {
  return Api.send('PUT', relativePath, requestBody)
}

/**
 *  Does a DELETE request to the API.
 * 
 * @param {String} relativePath
 * @returns {Promise} A promise returned by fetch method
 */
 Api.delete = function(relativePath) {
  return Api.send('DELETE', relativePath)
}

/**
 *  Does a request with a body to the API.
 * 
 * @param {String} method
 * @param {String} relativePath 
 * @param {Object} requestBody 
 * @returns {Promise} A promise returned by fetch method
 */
Api.send = function(method, relativePath, requestBody) {
  let options = {}
  if(requiresCors) {
    options.credentials = 'include'
  }
  options.method = method
  if(requestBody) {
    options.headers = {
        'Content-Type': 'application/json'
    }
    options.body = JSON.stringify(requestBody)
  }
  return fetch(apiBaseUrl + relativePath, options)
}

export default Api
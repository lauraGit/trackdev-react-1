const Api = {}

const apiBaseUrl = 'https://localhost:8080'
const requiresCors = true

/**
 *  Reads the JSON response from a fetch operation,
 * 
 * @param {Promise} Promise returned by a fetch operation 
 * @returns {Promise} The data response from the API
 */
async function getData(response) {
  let data = null
  if(response.status !== 204) {
    data = await response.json()
  }
  if(!response.ok) {
    throw { status: response.status, details: data }
  }
  return data
}

/**
 *  Does a GET request to the API.
 * 
 * @param {String} relativePath 
 * @returns {Promise} The data response from the API
 */
Api.get = async function(relativePath) {
  return Api.send('GET', relativePath)
}

/**
 *  Does a POST request to the API.
 * 
 * @param {String} relativePath 
 * @param {Object} requestBody 
 * @returns {Promise} The data response from the API
 */
Api.post = async function(relativePath, requestBody) {
  return Api.send('POST', relativePath, requestBody)
}

/**
 *  Does a PUT request to the API.
 * 
 * @param {String} relativePath 
 * @param {Object} requestBody 
 * @returns {Promise} The data response from the API
 */
Api.put = function(relativePath, requestBody) {
  return Api.send('PUT', relativePath, requestBody)
}

/**
 *  Does a DELETE request to the API.
 * 
 * @param {String} relativePath
 * @returns {Promise} The data response from the API
 */
 Api.delete = function(relativePath) {
  return Api.send('DELETE', relativePath)
}

/**
 *  Does a PATCH request to the API.
 * 
 * @param {String} relativePath 
 * @param {Object} requestBody 
 * @returns {Promise} The data response from the API
 */
 Api.patch = function(relativePath, requestBody) {
  return Api.send('PATCH', relativePath, requestBody)
}

/**
 *  Does a request with a body to the API.
 * 
 * @param {String} method
 * @param {String} relativePath 
 * @param {Object} requestBody 
 * @returns {Promise} The data response from the API
 */
Api.send = async function(method, relativePath, requestBody) {
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
  const response = await fetch(apiBaseUrl + relativePath, options)
  return getData(response)
}

export default Api
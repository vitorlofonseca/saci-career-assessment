const fetchWrapper = async (url: string, init: RequestInit): Promise<Response> => {
  const headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json'
  })

  //TODO: create an env file to store the URL
  return await fetch(`http://localhost:8080/api${url}`, {
    method: init.method,
    headers,
    body: init.body
  })
}

const doRequest = async <T>(url: string, method: string, body?: object | string): Promise<T> => {
  if (typeof body !== 'string') {
    body = JSON.stringify(body)
  }
  const response = await fetchWrapper(url, {
    method,
    body
  })

  if (!response.ok) {
    throw new Error(`There was an error with your request: ${JSON.stringify(response)}`)
  }

  let result

  if (response?.headers?.get('Content-Type')?.includes('application/json')) {
    result = await response.json()
  } else {
    result = await response.text()
  }

  return Promise.resolve(result)
}

const patch = async <T>(url: string, body: object): Promise<T> => {
  return doRequest<T>(url, 'PATCH', body)
}

const get = async <T>(url: string): Promise<T> => {
  return doRequest(url, 'GET')
}

const deleteRequest = async <T>(url: string): Promise<T> => {
  return doRequest<T>(url, 'DELETE')
}

const post = async <T>(url: string, body: object): Promise<T> => {
  return doRequest(url, 'POST', body)
}
const put = async <T>(url: string, body: object): Promise<T> => {
  return doRequest<T>(url, 'PUT', body)
}

export { fetchWrapper, get, patch, doRequest, deleteRequest, post, put }

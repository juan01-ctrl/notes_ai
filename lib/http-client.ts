import axios, {
    AxiosResponse
  } from 'axios'
  
  interface AxiosConfigOverrides {
    headers?: Record<string, string>;
  }
  
  function onFulfilled(response: AxiosResponse) {
    return response.data
  }
  
  function httpClient(baseURL: string, configOverrides?: AxiosConfigOverrides) {
    const config = {
      baseURL,
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
        ...configOverrides?.headers
      },
      timeout: 15000
    }
  
    const instance = axios.create(config)
  
  
    instance.interceptors.response.use(onFulfilled)
  
    return instance
  }
  
  export default httpClient
  
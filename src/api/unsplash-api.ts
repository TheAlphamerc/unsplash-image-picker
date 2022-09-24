import { createApi } from 'unsplash-js'

const unsplashApi = (accessKey: string) => createApi({ accessKey: accessKey })

export default unsplashApi

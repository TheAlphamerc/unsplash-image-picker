import { createApi } from 'unsplash-js'

// const APP_ACCESS_KEY = 'dTUBUnPASfrsKOWYzVpAwvkr9Ks2MuY3i5YCvSqAxWQ'

const unsplashApi = (accessKey: string) => createApi({ accessKey: accessKey })

export default unsplashApi

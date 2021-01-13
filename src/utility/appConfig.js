import { get, cloneDeep } from 'lodash'

import AppConfig from '../mock/data/AppConfig.json';

if (process.env.NODE_ENV === 'development') {
  window.AppConfig = AppConfig;
}
if (process.env.REACT_APP_USE_MOCK) {
  window.AppConfig.api.baseUrl = '/api/';
}
export default class {
  static config = cloneDeep(window.AppConfig)

  static get (path, fallback = null) {
    return get(this.config, path, fallback)
  }

  static getApiBaseUrl () {
    return this.get('api.baseUrl')
  }

  static getResourceUrl (path) {
    // If there is no path, return an empty string
    if ( !path ) return '';

    // If the path already contains the resource url, we return the path because it is already a full url
    if(path.startsWith('download') || path.startsWith('/download')) {
      const baseUrl = this.get('backend.resourceUrl')
      // return base + path
      return `${baseUrl}/${path}`
    }

    return path
  }

}

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

import {Item} from './types'

export interface ClientAPIConfig extends AxiosRequestConfig{
  baseURL: string
}

export class ClientAPI {
  private config: ClientAPIConfig

  private defaultConfig = {
    returnRejectedPromiseOnError: true,
    withCredentials: true,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    }
  }

  constructor(config: ClientAPIConfig) {
    this.config = {
      ...this.defaultConfig,
      ...config
    }
    console.log(this.config)
  }

  get client() {
    return axios.create({
      baseURL: this.config.baseURL,
    })
  }

  _data(resp: AxiosResponse) {
    return resp.data
  }

}

export class ItemsAPI extends ClientAPI{
  getItems(): Promise<Array<Item>> {
    return this.client.get('/hiring.json').then(this._data)
  }
}

// singletons

export const itemsAPI:ItemsAPI = new ItemsAPI({
  baseURL: process.env.REACT_APP_ITEMS_BASE_URL!
})
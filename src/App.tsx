import React,{useState, useEffect} from 'react';

import { itemsAPI } from './api'
import {Item} from './api/types'

export interface DataState<T>{
  loading: boolean,
  error: boolean,
  errorMessage: '',
  data: T
}

export interface ItemState extends DataState<Array<Item>>{}


function App() {
  const [items, setItems] = useState<ItemState>({
    loading: true,
    error: false,
    errorMessage: '',
    data: []
  })

  useEffect(() => {
    itemsAPI
      .getItems()
      .then((data: Array<Item>) => {
        setItems({
          loading: false,
          error: false,
          errorMessage: '',
          data
        })
      })
      .catch((err) => {
        setItems({
          loading: false,
          error: true,
          errorMessage: err.message,
          data: []
        })
      })
  },[])

  if (items.loading) {
    return <div>loading</div>
  }

  if (items.error) {
    return <div>{items.errorMessage || 'There was an error loading the items'}</div>
  }

  return (
    <div>
      {JSON.stringify(items.data)}
    </div>
  );
}

export default App;

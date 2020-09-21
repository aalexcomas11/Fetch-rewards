import React,{useState, useEffect} from 'react';

import { itemsAPI } from './api'
import { Item } from './api/types'
import PageContainer from './Components/PageContainer'
import ListItemContainer from './Components/ListItemContainer'
import ListItem from './Components/ListItem'

export interface DataState<T>{
  loading: boolean,
  error: boolean,
  errorMessage: '',
  data: T
}

export interface ItemState extends DataState<Array<Item>>{ }

/**
 * Filters out empty names and groups items by list id and
 * sorts each group by name
 */
const processItems = (items: Array<Item>) => {
  let set: Set<number> = new Set([])

  // filter and sort in one pass
  items.sort((a, b) => {
    // move falsy name objects to end of array
    if (!a.name && !b.name) {
      set.add(a.id)
      set.add(b.id)
      return 0
    }

    if (!a.name) {
      set.add(a.id)
      return 1
    }

    if (!b.name) {
      set.add(b.id)
      return -1
    }

    // group by list and sort by name
    const comp = a.listId - b.listId

    /**
     * all name fields have the following format <String>\s<number>
     * so we can compare the string part and the number
     * part to get an accurate sort
     */
    if (comp === 0) {
      const aArr = a.name.split(' ')
      const bArr = b.name.split(' ')

      //Will always be zero with given data set
      const strComp = aArr[0].localeCompare(bArr[0])

      //practically comparing the id field
      if (strComp === 0) return parseInt(aArr[1], 10) - parseInt(bArr[1], 10)
      return strComp
    }
    return comp
  })

  // save space on if all name fields have values
  if (!set.size) return items

  return items.slice(0, items.length - set.size)
}




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
    return (
      <PageContainer>
        loading
      </PageContainer>
    )
  }

  if (items.error) {
    return <PageContainer>{items.errorMessage || 'There was an error loading the items'}</PageContainer>
  }

  return (
    <PageContainer>
      <ListItemContainer>
        {processItems(items.data).map((item: Item) => {
          return (
            <ListItem key={item.id} {...item} />
          )
        })}
      </ListItemContainer>
    </PageContainer>
  );
}

export default App;

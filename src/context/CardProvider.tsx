import React, { useEffect } from 'react'
import { Provider } from 'react-redux';
import  {store} from "./CardStore"
import { TCard } from './CardFeatures';
import { LoadFromStorage  } from './CardFeatures';
function CardProvider({children} : {children:React.ReactNode}) {
  useEffect(()=>{
    if(window.localStorage.getItem("card") === null ) return;
    const card  = JSON.parse(window.localStorage.getItem("card") as string) as TCard ;
    store.dispatch(LoadFromStorage(card));
  })
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

export default CardProvider

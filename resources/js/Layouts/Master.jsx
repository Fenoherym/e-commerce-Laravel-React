import Header from "@/Components/partials/Header";
import { getCartCount } from "@/features/counter";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Master({ children, search, makeSearch }) {

  const counter = useSelector(state => state.counter)
  const dispatch =useDispatch()
  
  useEffect(()=> {
      dispatch(getCartCount())
  }, [dispatch])

  return (
    <>
        <Header search={search}  makeSearch={makeSearch} cartCount={counter.value}/>
        <>
            {children}
        </>

    </>
  )
}

import '../styles/globals.scss'
import { useEffect } from 'react';
import Router from 'next/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../utils/firebaseConfig';

function MyApp({ Component, pageProps }) {
  const auth = getAuth(app);
  useEffect(() => {
    onAuthStateChanged(auth, async (u) => {
      console.log(u)
      if(u != null && (Router.pathname == "/login" || Router.pathname == "/register")){
        Router.push("/");
      }
      else if(u == null && (Router.pathname != "/login" || Router.pathname != "/register")){
        Router.push("/login")
      }
    })
    // if(localStorage.getItem("isLogin") && (Router.pathname == "/login" || Router.pathname == "/register")){
    //   Router.push("/");
    // }
    // else if(Router.pathname != "/login" || Router.pathname != "/register"){
    //   const firstLogin = localStorage.getItem("isLogin");
    //   if(!firstLogin){
    //     Router.push("/login")
    //   }
    // }
  }, [])
  return <Component {...pageProps} />
}

export default MyApp

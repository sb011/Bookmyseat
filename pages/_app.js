import '../styles/globals.scss'
import { useEffect } from 'react';
import Router from 'next/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../utils/firebaseConfig';
import Layout from '../components/Layout';
import { getDoc, doc } from 'firebase/firestore/lite';
import { db } from '../utils/firebaseConfig';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  const auth = getAuth(app);
  useEffect(async () => {
    onAuthStateChanged(auth, async (u) => {
      // console.log(u)
      if(Router.pathname != "/login" || Router.pathname != "/register"){
        if(u == null){
          Router.push("/login")
        }
      }
      else if(u != null && ((Router.pathname == "/login" || Router.pathname == "/register"))){
          Router.push("/");
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
  return (
      <Layout>
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={8000}
          hideProgressBar={false}
          newestOnTop={false}
          draggable={false}
          pauseOnVisibilityChange
          closeOnClick
          pauseOnHover
        />
      </Layout>
  );
}

export default MyApp

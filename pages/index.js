import styles from '../styles/Home.module.scss'
import { useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';

export default function Home() {
  const [err, seterr] = useState('');
  const auth = getAuth()
  // useEffect(() => {
  //   console.log(getAuth(app)._currentUser);  
  // }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("isLogin");
    } catch (error) {
      seterr(error.message)
    }
    // if(res.err)
    //   seterr(res.err)
    // else{
      
    //   Router.push("/login")
    // }
  }

  return (
    <div className={styles.container}>
      <button onClick={handleLogout}>
        Logout
      </button>
      <p>{err}</p>
    </div>
  )
}

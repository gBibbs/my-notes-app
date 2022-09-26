import React from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';

const style = {
  container: `flex flex-col justify-center items-center`,
  title: `text-center text-black py-8`,
}

const Home = () => {
  const {user} = UserAuth();
  const navigate = useNavigate();

  return (
    <div className={style.container}>
      <h1 className={style.title}>Home Page</h1>
      {user ? 
      <>
      <button onClick={()=>navigate('/notes')}>Go To Notes</button>
      </>
      : <button onClick={()=>navigate('/signin')}>Sign In</button> }
    </div>
  )
}

export default Home
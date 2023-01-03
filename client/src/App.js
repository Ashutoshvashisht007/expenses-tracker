import React, { useEffect, useState } from 'react'
import AppBar from "./components/appbar";
import { Outlet } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getUser } from './store/Auth';
import Cookies from 'js-cookie'; 

function App() {

  const token = Cookies.get('token');
  const [isLoading,setIsLoading] = useState(true);
  const dispatch = useDispatch();

  async function fetchUser()
    {
        setIsLoading(true);
        const res = await fetch(`${process.env.REACT_APP_API_URL}/user`,{
            headers:{
                Authorization: `Bearer ${token}`
            },
        });

        if(res.ok)
        {
          const user = await res.json();
          // console.log(user);
          dispatch(getUser(user));
        }

        setIsLoading(false);
    }

  useEffect(() => {
    fetchUser();
  }, []);

  if(isLoading)
  {
    return <p>Loading.....</p>;
  }

  return (
    <>
      <AppBar />
      <Outlet />
    </>
  );
}

export default App;

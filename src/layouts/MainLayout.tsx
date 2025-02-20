import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";


const MainLayout = () => {

  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  
  return (
    <>
    <h1>Main layout</h1>
    <Outlet />
    </>
  )
}

export default MainLayout
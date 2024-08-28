import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export const useHomeRedirect = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isRegistered=useSelector((state)=> state.auth.isRegistered);

  useEffect(() => {
    if (isLoggedIn || isRegistered) {
      navigate("/");
    }else{
      navigate('/login')
    }
  },[isLoggedIn,isRegistered]);
};
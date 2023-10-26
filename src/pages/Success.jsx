import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import jwtDecode from "jwt-decode";

const Success = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  

  useEffect(() => {
    console.log(Object.fromEntries([...searchParams]));
    const currentParams = Object.fromEntries([...searchParams]);
    localStorage.setItem("loggedInUser", JSON.stringify(currentParams.token));
    navigate("/home");
  }, [searchParams]);

  return <div>Success</div>;
};

export default Success;

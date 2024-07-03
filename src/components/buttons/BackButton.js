import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';

const BackButton  = ({navigatePath}) => {
    const navigate = useNavigate();
    const location = useLocation();
  
    const handleBack = () => {
      // Navigate to the previous route if available, otherwise navigate to fallbackPath
      if (location.key !== 'default') {
        navigate(-1);
      } else {
        navigate(navigatePath);
      }
    };
    return (
    <div onClick={handleBack}
    className="rounded-fill flex justify-center items-center bg-bg h-10 w-10 cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="w-8 h-8"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
        />
      </svg>
    </div>
  );
}

export default BackButton;

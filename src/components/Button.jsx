import Aos from  "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';








export const Button = ({
  children,
  onClick,
  type = "button",
  className = "",
}) => {
  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }
  , []);
  return (
    <button data-aos="fade-up"
      type={type}
      onClick={onClick}
      className={`btn-primary ${className}`}
    >
      {children}
    </button>
  );
};
import { Button } from "./Button";
import Aos from  "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';
export default function Card({ title, description, solutions,onClick ,children}) {
  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }
  , []);
  return (
    <div className="card border-default" data-aos="fade-up">
      <h3 className="text-xl font-semibold mb-4">
        {title}
      </h3>

      <p
        className="mb-5"
        style={{ color: "var(--color-gray)" }}
      >
        {description}
      </p>
      <p
        className="mb-5"
        style={{ color: "var(--color-gray)" }}
      >
        <span className="font-bold">{solutions}</span>
      </p>
      <Button
       children={children}
        type="button"
        onClick={onClick}
        />
    
    </div>
  );
}
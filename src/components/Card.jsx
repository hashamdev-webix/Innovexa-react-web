import { Button } from "./Button";

export default function Card({ title, description, solutions,onClick ,children}) {
  return (
    <div className="card border-default">
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
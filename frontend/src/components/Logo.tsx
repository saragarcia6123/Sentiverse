import { useState } from "react";

export default function Logo() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      id="logo"
      className="flex justify-center align-middle p-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h1
        className="text-3xl items-center tracking-widest"
        style={{
          color: isHovered ? "rgb(220,220,250)" : "white",
        }}
      >
        Sentiverse
        <span
          style={{
            fontSize: isHovered ? "1em" : ".8em",
            marginLeft: isHovered ? "0" : "8px",
          }}
          className="relative bottom-0.5  transition-all duration-100 ease-linear"
        >
          {isHovered ? "❤️‍🔥" : "❤️"}
        </span>
      </h1>
    </div>
  );
}

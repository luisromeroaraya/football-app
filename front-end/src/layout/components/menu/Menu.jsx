import { useState } from "react";

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex w-full h-[50vh] absolute top-6 transition-all duration-500 " style={{transform: `translate(${isOpen ? "0" : "86%"})`}}>
      <div className="h-full w-1/6">
        <button onClick={() => setIsOpen(!isOpen)} className="w-full h-1/6 rounded-l-md bg-white"></button>
      </div>
      <div className="w-full h-5/6 bg-white rounded-b-md"></div>
    </div>
  );
};

export default Menu;

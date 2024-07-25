import React from "react";
import Wishlist from "./components/Wishlist";
import "./App.scss";

const App: React.FC = () => {
  return (
    <div className="app">
      <Wishlist />
    </div>
  );
};

export default App;

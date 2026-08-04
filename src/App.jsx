import { useState } from "react";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [cartCount] = useState(0);

  function handleSearch(query) {
    console.log("Search submitted:", query);
    // your group will wire this up to actually filter products later
  }

  function handleCategorySelect(category) {
    console.log("Category selected:", category);
    // your group will wire this up to filter the product grid later
  }

  return (
    <>
      <Navbar
        cartCount={cartCount}
        onSearch={handleSearch}
        onCategorySelect={handleCategorySelect}
      />
      <main>
        <h1>ShopCenter</h1>
        <p>Product grid goes here next.</p>
      </main>
    </>
  );
}

export default App;

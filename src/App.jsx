import { useState } from "react";
import Navbar from "./components/Navbar";
import useTheme from "./hooks/useTheme";
import "./App.css";

function OnlineMall() {
  const [cartCount] = useState(0);
  const { theme, toggleTheme } = useTheme();

  function handleSearch(query) {
    console.log("Search submitted:", query);

    // Your group will wire this up to actually filter products later
    }
    
    function handleCategorySelect(category) {
      console.log("Category selected:", category);

      // Your group will wire this up to filter the product grid later
      }
      
      return (
      <>
      <Navbar
      cartCount={cartCount}
      theme={theme}
      onThemeToggle={toggleTheme}
      onSearch={handleSearch}
      onCategorySelect={handleCategorySelect}
      />
      
      <main className="app-main">
        <h1>Online Mall</h1>
        <p>Product grid goes here next.</p>
      </main>
    </>
  );
}

export default App;

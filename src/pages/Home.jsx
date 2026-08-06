import Hero from "../components/Hero";
import CategoryButtons from "../components/CategoryButtons";
import ProductGrid from "../components/ProductGrid";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Hero />
      <CategoryButtons />

      <main className="app-main">
        <ProductGrid />
        <Pagination />
      </main>

      <Footer />
    </>
  );
}

export default Home;

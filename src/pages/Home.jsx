import Hero from "../components/Hero";
import AboutPage from "../pages/About";
import PopularActors from "../components/PopularActors";
import PopularMovies from "../components/popularMovies";
import ContactPage from "../pages/Contact";

const HomePage = () => {
  return (
    <div className="pt-[5rem]">
      <Hero />
      <PopularMovies />
      <PopularActors />
      <AboutPage />
      <ContactPage />
    </div>
  );
};

export default HomePage;

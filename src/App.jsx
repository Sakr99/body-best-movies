import Navbar from "./Component/Navbar";
import Movies from "./Component/Movies";
import MovieDetails from "./Component/MovieDetails";
import SignIn from "./Component/SignIn";
import Login from "./Component/Login";
import Footer from "./Component/Footer";
import Notfound from "./Component/Notfound";
import { Route, Routes } from "react-router-dom";
import Favourites from "./Component/Favourites";
import Home from "./Component/Home";
import ContextProvider, {
  ThemeProvider,
} from "./Component/Context/GlobalContext";
const App = () => {
  return (
    <>
      <ContextProvider>
        <ThemeProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="movies" element={<Movies />} />
            <Route path="favourites" element={<Favourites />} />
            <Route path="movieDetails" element={<MovieDetails />}>
              <Route path=":id" element={<MovieDetails />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="signIn" element={<SignIn />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
          <Footer />
        </ThemeProvider>
      </ContextProvider>
    </>
  );
};
export default App;

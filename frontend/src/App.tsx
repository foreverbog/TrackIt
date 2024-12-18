import { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "./context/ThemeContext";
import MainLayout from "./layout/MainLayout";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./context/AuthContext";
import MenuLayout from "./layout/MenuLayout";
import ExpenseDashboard from "./pages/ExpenseDashboard";
import TripsOrganizer from "./pages/TripsOrganizer";
import ExchangeRates from "./pages/ExchangeRates";
import Settings from "./pages/Settings";
import TopLoadingBar from "react-top-loading-bar";
import CookiesInfo from "./components/Landing/CookiesInfo";
import NotFound from "./pages/NotFound";
import { useTranslation } from "react-i18next";

type LoadingBarRef = {
  staticStart: () => void;
  continuousStart: () => void;
  complete: () => void;
};
function App() {
  const themeContext = useContext(ThemeContext);
  const authContext = useContext(AuthContext);
  const { t } = useTranslation("global");

  // Ensure authContext and themeContext are available
  if (!authContext) {
    throw new Error("Must be used within an AuthContextProvider");
  }
  if (!themeContext) {
    throw new Error("Must be used within a ThemeContextProvider");
  }

  const { theme } = themeContext;
  const { isAuthenticated, isLoading } = authContext;

  // Create a ref for the TopLoadingBar
  const loadingBar = useRef<LoadingBarRef | null>(null);

  // Show loading bar only when isLoading is true
  useEffect(() => {
    if (isLoading) {
      // Start the loading bar when the app is loading
      loadingBar.current?.continuousStart();
    } else {
      // Complete the loading bar when loading is done
      loadingBar.current?.complete();
    }
  }, [isLoading]); // Run when isLoading changes

  if (isLoading) {
    // Show nothing but loading bar during loading
    return (
      <div
        className={`theme-${theme} relative flex flex-col justify-center items-center h-dvh bg-base`}
      >
        <TopLoadingBar
          color="var(--color-secondary)" // Customize the color of the loading bar
          height={3} // Customize the height of the loading bar
          ref={loadingBar} // Attach the ref to control it programmatically
        />
        <img
          src="../images/coffee.png"
          alt="cup of coffee"
          className="w-1/2 md:w-1/5 -mt-24"
        />
        <div className="animate-pulse font-base text-xl  text-center text-balance text-base-text">
          {t("wakeUp")}
        </div>
      </div>
    );
  }

  return (
    <div className={`theme-${theme} relative`}>
      <TopLoadingBar
        color="var(--color-secondary)"
        height={3}
        ref={loadingBar}
      />
      <ToastContainer
        position="top-center"
        autoClose={false}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        transition={Zoom}
      />
      <CookiesInfo />
      <Routes>
        <Route path="/*" element={<NotFound />} />
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route
          path="/auth"
          element={isAuthenticated ? <Navigate to="/" /> : <Authentication />}
        />
        <Route
          path="/menu"
          element={isAuthenticated ? <MenuLayout /> : <Navigate to="/auth" />}
        >
          <Route path="expenses" element={<ExpenseDashboard />} />
          <Route path="trips" element={<TripsOrganizer />} />
          <Route path="exchange" element={<ExchangeRates />} />
        </Route>
        <Route
          path="settings"
          element={isAuthenticated ? <Settings /> : <Navigate to="/auth" />}
        />
      </Routes>
    </div>
  );
}

export default App;

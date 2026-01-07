/**
 * @description Main Entry of our entire app
 *              @App layout, this component controls the public layout including nav and footer
 *              @AppRoute is where our app routes is all defined
 */

import { useEffect, useState } from "react";
import Toast from "./components/common/Toast";
import AppRoute from "./routes/appRoute";
import AOS from "aos";
import "aos/dist/aos.css";
import ScrollToTop from "./utils/ScrollTop";
import useAuthstore from "./store/authStore";
import PageLoader from "./components/common/PageLoader";

const App = () => {
  const { getMe, user } = useAuthstore();
  const [loading, setLoading] = useState(true);

  // Animation
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Authenticate user
  useEffect(() => {
    const initAuth = async () => {
      if (!user) {
        try {
          await getMe();
        } catch (err) {
          console.error(err);
          console.error("No authenticated user found:", err);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, [getMe, user]);

  // Log auth user
  const devOnly = (fn: () => void) => {
    if (import.meta.env.MODE === "development") fn();
  };

  useEffect(() => {
    devOnly(() => console.log("Current logged-in user:", user));
  }, [user]);

  if (loading) return <PageLoader />;
  return (
    <>
      <ScrollToTop />
      <Toast />
      <AppRoute />
    </>
  );
};

export default App;

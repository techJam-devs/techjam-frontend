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
      try {
        await getMe(); // fetch current user
      } catch {
        console.log("No authenticated user found");
      } finally {
        setLoading(false); // hide loader
      }
    };
    initAuth();
  }, [getMe]);

  // Log auth user
  useEffect(() => {
    if (user) {
      console.log("Current logged-in user:", user);
    }
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

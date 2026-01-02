/**
 * @description Main Entry of our entire app
 *              @App layout, this component controls the public layout including nav and footer
 *              @AppRoute is where our app routes is all defined
 */

import { useEffect } from "react";
import Toast from "./components/common/Toast";
import AppLayout from "./components/layout/appLayout";
import AppRoute from "./routes/appRoute";
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <AppLayout>
      <Toast />
      <AppRoute />
    </AppLayout>
  );
};

export default App;

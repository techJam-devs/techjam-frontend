/**
 * @description Main Entry of our entire app
 */

import AppLayout from "./components/layout/appLayout";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";

const App = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </AppLayout>
  );
};

export default App;

/**
 * @description Main Entry of our entire app
 *              @App layout, this component controls the public layout including nav and footer
 *              @AppRoute is where our app routes is all defined
 */

import AppLayout from "./components/layout/appLayout";
import AppRoute from "./routes/appRoute";

const App = () => {
  return (
    <AppLayout>
      <AppRoute />
    </AppLayout>
  );
};

export default App;

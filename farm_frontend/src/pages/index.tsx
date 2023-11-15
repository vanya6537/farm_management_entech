import { lazy } from "react";
import { FarmProvider } from "../features/manage-animals";

// This is the place for router component
const AnimalsListPage = lazy(() => import("./animals-list"));

export const Routing = () => {
  return (
    <FarmProvider>
      <AnimalsListPage />
    </FarmProvider>
  );
};

// Using "react-router-dom" as an example for future reference:

// import { Route, Switch, Redirect } from "react-router-dom";
// export const Routing = () => {
//     return (
//         <Switch>
//             <Route exact path="/" component={<FarmProvider><AnimalsListPage /></FarmProvider>} />
//             <Redirect to="/" />
//         </Switch>
//     );
// };

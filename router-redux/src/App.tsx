import { Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoutes, PublicRoutes, Roles } from "./models";
import { AuthGuard, RoleGuard } from "./guards";
import { RoutesWithNotFound } from "./utilities";
import { Provider } from "react-redux";
import store from "./redux/store";
import Logout from "./compoenents/Logout/Logout";
import { Dashboard } from "./pages/Private";

const Login = lazy(() => import("./pages/Login/Login"));
const Private = lazy(() => import("./pages/Private/Private"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<>Cargando</>}>
        <Provider store={store}>
          <BrowserRouter>
            <Logout />
            <RoutesWithNotFound>
              <Route
                path="/"
                element={<Navigate to={PrivateRoutes.PRIVATE} />}
              />
              <Route path={PublicRoutes.LOGIN} element={<Login />} />
              <Route element={<AuthGuard privateValidation={true} />}>
                <Route
                  path={`${PrivateRoutes.PRIVATE}/* `}
                  element={<Private />}
                />
              </Route>
              <Route element={<RoleGuard rol={Roles.ADMIN} />}>
                <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />
              </Route>
            </RoutesWithNotFound>
          </BrowserRouter>
        </Provider>
      </Suspense>
    </div>
  );
}

export default App;

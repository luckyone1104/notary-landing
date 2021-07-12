import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { DatabaseProvider } from '../contexts/DatabaseContext.jsx';
import { AuthProvider } from '../contexts/AuthContext';
import PrivateRoute from '../routes/PrivateRoute.jsx';
import Loading from './common/Loading.jsx';

const HomePage = React.lazy(() => import('./home/HomePage.jsx'));
const AuthPage = React.lazy(() => import('./auth/AuthPage.jsx'));
const AdminPage = React.lazy(() => import('./admin/AdminPage.jsx'));
const NoMatch = React.lazy(() => import('./no-match/NoMatch.jsx'));

export default function App() {
  return (
    <DatabaseProvider>
      <AuthProvider>
        <React.Suspense fallback={<Loading size="window" />}>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>

            <Route exact path="/login">
              <AuthPage />
            </Route>

            <PrivateRoute path="/admin">
              <AdminPage />
            </PrivateRoute>

            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </React.Suspense>
      </AuthProvider>
    </DatabaseProvider>
  );
}

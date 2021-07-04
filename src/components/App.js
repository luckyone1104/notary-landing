import React from 'react';
import { DatabaseProvider } from '../contexts/DatabaseContext';
import { AuthProvider } from '../contexts/AuthContext';
import PrivateRoute from '../routes/PrivateRoute';
import Loading from './common/Loading';
import { Switch, Route } from 'react-router-dom';

const HomePage = React.lazy(() => import('./home/HomePage'));
const AuthPage = React.lazy(() => import('./auth/AuthPage'));
const AdminPage = React.lazy(() => import('./admin/AdminPage'));
const NoMatch = React.lazy(() => import('./no-match/NoMatch'));

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

import './admin.css';
import './components/constructor.css';
import { Switch, Route, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ServiceList from './components/ServiceList';
import CategoryConstructor from './components/CategoryConstructor';
import ServiceEditing from './components/ServiceConstructor';
import Loading from '../common/Loading';

export default function AdminPage() {
  const { currentUser: user } = useAuth();

  return user ? <AdminRouter /> : <Loading size="window" />;
}

function AdminRouter() {
  const history = useHistory();
  const goBackToAdminPage = () => history.push('/admin');

  return (
    <Switch>
      <Route exact path="/admin" component={ServiceList} />
      <Route
        exact
        path="/admin/:action-category/:id?"
        render={props => (
          <CategoryConstructor {...props} goBack={goBackToAdminPage} />
        )}
      />

      <Route
        exact
        path="/admin/:action-service/:id?"
        render={props => (
          <ServiceEditing {...props} goBack={goBackToAdminPage} />
        )}
      />
    </Switch>
  );
}

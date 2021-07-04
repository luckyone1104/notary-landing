import './services.css';
import Accardion from './Accordion';
import Loading from '../../common/Loading';
import { useDatabase } from '../../../contexts/DatabaseContext';
import { useAuth } from '../../../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function Services() {
  const { currentUser } = useAuth();
  const { serviceList } = useDatabase();
  const services = serviceList?.length
    ? serviceList.map(category => (
        <Accardion key={category.id} category={category} />
      ))
    : null;

  return (
    <div className="services">
      <div className="content-container">
        {services ?? <Loading />}
        {services && currentUser && (
          <Link to="/admin" className="services__go-to-admin-page-link">
            Перейти до редагування послуг
          </Link>
        )}
      </div>
    </div>
  );
}

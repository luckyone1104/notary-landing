import './photo-and-name.css';
import notaryImg from '../../../assets/images/notary.jpg';

export default function PhotoAndName() {
  return (
    <div className="photo-and-name__wrapper">
      <div className="content-container photo-and-name__container">
        <div className="photo-and-name__img-container">
          <img className="photo-and-name__img" src={notaryImg} alt=""></img>
        </div>

        <div className="photo-and-name__text-wrapper">
          <div className="photo-and-name__name-wrapper">
            <p>Гальчук</p>
            <p>Інна</p>
            <p>Сергіївна</p>
          </div>
          <p className="photo-and-name__notary-subtitle">нотаріус</p>
        </div>
      </div>
    </div>
  );
}

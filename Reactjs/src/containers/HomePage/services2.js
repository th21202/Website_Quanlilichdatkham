import React from 'react';
import { Link } from 'react-router-dom';
import './Services2.scss';
import frame1 from '../../assets/images/frame.png'
import frame2 from '../../assets/images/frame2.png'
import frame3 from '../../assets/images/frame3.png'
import frame4 from '../../assets/images/frame4.png'
import frame5 from '../../assets/images/frame5.png'
import frame6 from '../../assets/images/frame6.png'
import HomeFooter from "./HomeFooter";
import HomeHeader from "./HomeHeader";

const Services = () => {
  return (
    <>
  <HomeHeader isShowBanner={false}/>
    <section className="services">
      <div className="container">
        <h2 className="services__title">Our medical services</h2>
        <p className="services__description">
          World class medical care for everyone. Our health System offers unmatched, expert health care.
        </p>
        <div className="services__list">
          {/* {services.map((item, index) => (
            <div className="service-card" key={index}>
                <img src={item.img} alt={item.name} className="service-card__image" />
                <h2 className="service-card__title">{item.name}</h2>
              <p className="service-card__description">{item.desc}</p>
              <div className="service-card__footer">
                <Link to='/doctors' className="service-card__link"></Link>
                <span className="service-card__number" style={{ backgroundColor: item.bgColor, color: item.textColor }}>
                  {index + 1}
                </span>
              </div>
            </div>
            
          ))} */}
          <div className="service-card" >
              <img src={frame1}  className="service-card__image" />
              <h2 className="service-card__title">Search doctor</h2>
              <p className="service-card__description">Choose your doctor from thousands of 
                specialist, general, and trusted hospitals</p>
              <div className="service-card__footer">
                <Link to='/doctors' className="service-card__link"></Link>
                <span className="service-card__number" >
                  1
                </span>
              </div>
            </div>
            <div className="service-card" >
              <img src={frame2}  className="service-card__image" />
              <h2 className="service-card__title">Online pharmacy</h2>
              <p className="service-card__description">Buy  your medicines with our mobile 
                application with a simple delivery system.</p>
              <div className="service-card__footer">
                <Link to='/doctors' className="service-card__link"></Link>
                <span className="service-card__number" >
                  2
                </span>
              </div>
            </div>
            <div className="service-card" >
              <img src={frame3}  className="service-card__image" />
              <h2 className="service-card__title">Consultation</h2>
              <p className="service-card__description">Free consultation with our 
                trusted doctors and get the best recomendations.</p>
              <div className="service-card__footer">
                <Link to='/doctors' className="service-card__link"></Link>
                <span className="service-card__number" >
                  3
                </span>
              </div>
            </div>
            <div className="service-card" >
              <img src={frame4}  className="service-card__image" />
              <h2 className="service-card__title">Details info</h2>
              <p className="service-card__description">Free consultation with our trusted 
                doctors and get the best recomendations.</p>
              <div className="service-card__footer">
                <Link to='/doctors' className="service-card__link"></Link>
                <span className="service-card__number" >
                  4
                </span>
              </div>
            </div>
            <div className="service-card" >
              <img src={frame5}  className="service-card__image" />
              <h2 className="service-card__title">Emergency care</h2>
              <p className="service-card__description">You can get 24/7 urgent care for yourself
                 or your children and your
              lovely family.</p>
              <div className="service-card__footer">
                <Link to='/doctors' className="service-card__link"></Link>
                <span className="service-card__number" >
                  5
                </span>
              </div>
            </div>
            <div className="service-card" >
              <img src={frame6}  className="service-card__image" />
              <h2 className="service-card__title">Tracking</h2>
              <p className="service-card__description">Track and save your medical 
                history and health data .</p>
              <div className="service-card__footer">
                <Link to='/doctors' className="service-card__link"></Link>
                <span className="service-card__number" >
                  6
                </span>
              </div>
            </div>
        </div>
      </div>
    </section>
    <HomeFooter/>
    </>
  );
};

export default Services;
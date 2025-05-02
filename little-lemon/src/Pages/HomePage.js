import React from 'react';
import { Link } from 'react-router-dom';
import Bruschetta from '../Assets/Bruschetta.jpg'; 
import GreekSalad from '../Assets/GreekSalad.jpg';
import BruschettaTwo from '../Assets/BruschettaTwo.jpg';
import LemonDessert from '../Assets/LemonDessert.png';

function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1 className="restaurant-name">Little Lemon</h1>
          <h2 className="restaurant-location">Chicago</h2>
          <p className="restaurant-description">
            We are a family owned Mediterranean restaurant, 
            focused on traditional recipes served with a modern
            twist.
          </p>
          <Link to="/booking">
            <button className="reserve-button">Reserve a Table</button>
          </Link>
        </div>
        <div className="hero-image">
          <img src={Bruschetta} alt="Bruschetta appetizers" />
        </div>
      </section>

      <section className="specials">
        <div className="specials-header">
          <h2>This weeks specials!</h2>
          <Link to="/menu">
            <button className="menu-button">Online Menu</button>
          </Link>
        </div>
        
        <div className="specials-cards">
          <div className="special-card">
            <img src={GreekSalad} alt="Greek salad" />
            <div className="special-content">
              <div className="special-title-price">
                <h3>Greek salad</h3>
                <p className="price">$12.99</p>
              </div>
              <p className="special-description">
                The famous greek salad of crispy lettuce, peppers, olives
                and our Chicago style feta cheese, garnished with
                crunchy garlic and rosemary croutons.
              </p>
              <div className="order-link">
                <Link to="/order-online">
                  <>
                    <p>Order a delivery</p>
                    <span className="delivery-icon">🛵</span>
                  </>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="special-card">
            <img src={BruschettaTwo} alt="Bruschetta" />
            <div className="special-content">
              <div className="special-title-price">
                <h3>Bruschetta</h3>
                <p className="price">$5.99</p>
              </div>
              <p className="special-description">
                Our bruschetta is made from grilled bread that has been
                smeared with garlic and seasoned with salt and olive oil.
              </p>
              <div className="order-link">
                <Link to="/order-online">
                  <>
                    <p>Order a delivery</p>
                    <span className="delivery-icon">🛵</span>
                  </>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="special-card">
            <img src={LemonDessert} alt="Lemon Dessert" />
            <div className="special-content">
              <div className="special-title-price">
                <h3>Lemon Dessert</h3>
                <p className="price">$5.00</p>
              </div>
              <p className="special-description">
                This comes straight from grandma's recipe book, every
                last ingredient has been sourced and is as authentic
                as can be imagined.
              </p>
              <div className="order-link">
                <Link to="/order-online">
                  <>
                    <p>Order a delivery</p>
                    <span className="delivery-icon">🛵</span>
                  </>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
import React from 'react'
import formatCurrency from '../utils/money' 
import './Product1.css'
import { useContext } from 'react'
import { Checkoutcontext } from '../Contexts/Checkoutcontext'

const Product1 = ({Id,priceCents,stars,image,title,count}) => {

  const {addToCart } = useContext(Checkoutcontext);
    

  const handleAddToCart = (productId) => {
    console.log("Adding to cart, Product ID:", productId);
    addToCart(productId);
    
  };
    
  return (
    <div className="product-front-container" key={Id}>
          <div className="product-front-image-container">
            <img className="product-front-image"
              src={image} alt=''/>
          </div>

          <div className="product-front-name limit-text-to-2-lines">
           {title}
          </div>

          <div className="product-front-rating-container">
            <img className="product-front-rating-stars"
               src={`images/ratings/rating-${stars * 10}.png`} alt=''/>
            <div className="product-front-rating-count link-primary">
              {count}
            </div>
          </div>

          <div className="product-front-price">
            ${formatCurrency(priceCents)}
          </div>

          <div className="product-front-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div className="product-front-spacer"></div>

          <div className="added-to-cart">
            <img src="images/icons/checkmark.png" alt=''/>
            Added
          </div>

          <button className="front-add-to-cart-button button-primary " onClick={() => handleAddToCart(Id)}>
            Add to Cart
          </button>
        </div> 
  )
}

export default Product1

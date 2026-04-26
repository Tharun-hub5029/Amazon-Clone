import React, { useContext } from 'react'
import './Itemcomponent.css'
import { formatCurrency } from '../utils/money';
import { Checkoutcontext } from '../Contexts/Checkoutcontext';

const Itemcomponent = ({id,image,title,prize,quantity}) => {
    const {removeFromCart} = useContext(Checkoutcontext)

    const handleRemoveFromCart = () => {
        removeFromCart(id);
    }
  return (
    <div className='item-container'>
        <div className="item-image-container">
        <img src={image} alt="" className='item-component-image'/>
        </div>
        <div className="about-item">
            <p className='item-title'>{title}</p>
            <p className='item-prize'>${formatCurrency(prize)}</p>
            <p className='item-quantity'>Quantity:{quantity}</p>
            <div ><button className="remove-item-from-cart-button" onClick={handleRemoveFromCart}>Remove from cart</button></div>
        </div>

        
      
    </div>
  )
}

export default Itemcomponent

import React, { useContext } from 'react'
import './Payments.css'
import { Checkoutcontext } from '../Contexts/Checkoutcontext'
import { getProduct } from '../data/products';
import Itemcomponent from './Itemcomponent';
import formatCurrency from '../utils/money';

const Payments = () => {
    const {user,cart,totalCents} = useContext(Checkoutcontext);
  return (
    <div className='payment'>
       
        <div className="payment-container">

        <h1>Checkout (
             <a href="/checkout">{cart?.length} items</a>
              )</h1>
            <div className="payment-section">
                <div className="payment-title">
                    <h3>Delivery Address</h3>
                </div>
                <div className="payment-address">
                    <p>{user?.email}</p>
                    <p>Gorantla</p>
                    <p>Ananthapur,A.P</p>
                </div>
            </div>

            <div className="payment-section">
                <div className="payment-title">
                    <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment-items">
                    {cart.map((cartItem) => {
                        const product = getProduct(cartItem.productId);

                       return  <Itemcomponent id={cartItem.productId} title={product.name} prize={product.priceCents} quantity={cartItem.quantity} image={product.image} />
                    })}

                </div>
                

            </div>

            <div className="payment-section">
            <div className="payment-title">
                    <h3>Total payment</h3>
                    </div>
                <div className="payment-total">
                <h3 className='payment-page-order-total'>OrderTotal:</h3>
                <p className='payment-page-order-total-cents'>${formatCurrency(totalCents)}</p>
                </div>
            </div>
           


            <div className="payment-section">
                <div className="payment-title">
                    <h3>Payment method</h3>
                </div>
                <div className="payment-details">
                  
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Payments

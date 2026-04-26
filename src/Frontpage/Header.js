import React, { useContext } from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import { Checkoutcontext } from '../Contexts/Checkoutcontext';
import { auth } from '../firebase';


const Header = () => {


    const {user,cartQuantity} = useContext(Checkoutcontext)
    const handleAuthentication = () => {
        if(user){
            auth.signOut();
        }
    }
    return (
        <div className='header'>
            <img className='header-logo' src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="" />
            <div className="header-search">
                <input type="text" placeholder='Search' className='header-searchInput' />
                <SearchIcon className='header-searchIcon' />
            </div>
            <div className="header-nav">
                <a className='product-option' href="/Product">
                    <div className="header-option">
                        <span className='header-optionLineOne'>Products</span>
                        <span className='header-optionLineTwo'>collection</span>
                    </div>
                </a>
                <a className='product-option' href={!user && "/login"}>
                    <div onClick={handleAuthentication} className="header-option">
                        <span className='header-optionLineOne'>Hello <span className="user-email">{user?.email}</span></span>
                        <span className='header-optionLineTwo'>{user ? 'Sign out': 'Sign in'}</span>
                    </div>
                </a>
                <a href="/" className="product-option">
                    <div className="header-option">
                        <span className='header-optionLineOne'>Returns</span>
                        <span className='header-optionLineTwo'>&Orders</span>
                    </div>
                </a>
                <a href="/" className="product-option">
                <div className="header-option">
                    <span className='header-optionLineOne'>Your</span>
                    <span className='header-optionLineTwo'>Prime</span>
                </div>
                </a>


                <a href="/Checkout" ><div className="header-optionBasket">
                    <img className="cart-icon" src="/images/icons/cart-icon.png" alt='' />
                    <span className="header-optionLineTwo header-basketCount">{cartQuantity}</span>
                    <div className="cart-text">Cart</div>
                </div>
                </a>
            </div>

        </div>
    )
}

export default Header

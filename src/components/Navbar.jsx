import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { getProfile } from '../store/actions/userActions';
import '../styles/Navbar.css';

export default function Navbar({navLinks}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const { width } = useWindowDimensions();

    const location = pathname.split('/')[1];

    let user = dispatch(getProfile());

    let avatar = (user.avatar > 0) ? `./avatars/${user.avatar}.png` : undefined;

    let navbarLinks = navLinks.filter(page => page.visible);

    const [burgerState, setBurgerState] = useState(false);
    
    useEffect(() => {
        if(width > 650 && burgerState === true) setBurgerState(false);
    });

    return (
        <nav className="nav">
            <div className="nav__burger" onClick={(e) => {
                setBurgerState(!burgerState);
                }
            }>
                <label 
                    htmlFor="nav__checkbox" 
                    className="nav__checkbox-label"
                ></label>
                <input 
                    type="checkbox" 
                    id="nav__checkbox" 
                    checked={burgerState}
                    onChange={(e) => {setBurgerState(burgerState)}}
                />
                <div className="burger__background"></div>
            </div>
            <ul className={(burgerState) ? "burger__ul" : "nav__ul"}>
                {navbarLinks.map(
                    page => <li key={page.name}>
                        <Link 
                            className={('/' + location !== page.path) ? "nav__link" : "nav__link nav__link_active"} 
                            to={page.path}
                            onClick={(e) => {
                                if(burgerState) setBurgerState(false);
                            }}
                        >{page.name}</Link>
                    </li> 
                    )
                }
            </ul>
            <div className="nav__user">
                {(user.avatar === 0) ? 
                    <div 
                        className="nav__div-avatar"
                        onClick={(e) => {navigate('/edit')}}
                    ></div> 
                    : 
                    <img 
                        className="nav__img-avatar" 
                        src={avatar} 
                        alt="Avatar" 
                        width="50px" 
                        height="50px"
                        onClick={(e) => {navigate('/edit')}}
                    /> 
                }
                <span 
                    className="nav__name"
                    onClick={(e) => {navigate('/edit')}}
                >{user.name}</span>
            </div>
        </nav>
    )
}

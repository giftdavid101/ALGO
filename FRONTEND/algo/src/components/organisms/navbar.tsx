import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import {useAuth} from "../../authContext";

interface NavLinkProps {
    to: string;
    message: string;
}
interface NavStyleProps {
    isLoggedIn: boolean;
}
const NavStyle = styled.nav<NavStyleProps>`
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      background-color: lightblue;
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);

      a {
        padding: .5rem 1rem;
      }

      .Navbar {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 4rem;
        width: auto;
        position: relative;
      }

      .Navbar-logo {
        font-size: var(--fs-large);
        color: var(--cl-primaryDark);
        font-weight: 700;
      }

      .Navbar-menu {
        display: flex;
        gap: 2rem;
      }

      .Navbar-link {
        font-size: var(--fs-small);
        color: var(--cl-primaryDark);
        text-decoration: none;
        transition: all 0.3s ease-in-out;
      }

      .Navbar-link:hover {
        transform: translateY(-2px);
        color: var(--cl-primary);
      }

      .openMenu,
      .closeMenu {
        display: none;
        font-size: 1.5rem;
      }

      .Navbar-mobile {
        display: none;
        height: 100vh;
        width: 10rem;
      }

      @media (max-width: 768px) {
        .Navbar {
          justify-content: space-between;
          margin: 0 3rem;
        }

        .Navbar-menu {
          display: none;
        }

        .Navbar-mobile {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 2rem;
          position: fixed;
          right: -200px;
          top: 0;
          transition: all 0.5s ease-in-out;
          z-index: 99;
        }

        .Navbar-link {
          color: black;
          text-decoration: none;
          transition: all 0.3s ease-in-out;
        }

        .Navbar-link:hover {
          color: unset;
          transform: unset;
        }

        .openMenu,
        .closeMenu {
          display: unset;
        }

        .showMenu {
          right: 0;
          top: 0;
        }
      }

      .nav-con {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .Navbar-features {
        display: flex;
        gap: 600px;
      }

      .Navbar-menu .sign-up {
        box-shadow: inset 0 0 0 1px white;
      }

      /* Hide links when logged in */
      .loggedIn .Navbar-menu {
        display: block;
      }
.hide{
  display: block;
}
  //
  .logout-button {
    display: ${props => props.isLoggedIn ? 'block' : 'none'};
  }
  .show{
    display: block;
  }
  .Hide-Navbar-menu{
    display: none;
  }
  .Show-Navbar-menu{
    display: block;
  }

`;
const NavLink: React.FC<NavLinkProps> = ({ to, message }) => {
    return (
        <Link className='Navbar-link' to={to}>
            {message}
        </Link>
    );
};

const Navbar: React.FC = () => {
    const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
    const { isLoggedIn, logout,login } = useAuth();
    const [isAuth, setIsAuth] = useState<boolean>(isLoggedIn);

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    useEffect(() => {
        setIsAuth(isLoggedIn);
    }, [isLoggedIn]);




    return (
        <NavStyle className={isLoggedIn ? 'loggedIn' : ''} isLoggedIn={isLoggedIn}>
            <div className="nav-con container">
                <div className='Navbar-logo'>
                    <span>ALGORITHM SPOT</span>
                </div>

                <div className={!isLoggedIn?'Hide-navbar-menu ':'Show-navbar-menu Navbar-features'}>
                    <div className={isLoggedIn? "Hide-Navbar-menu":'Show-Navbar-menu'}>
                        <NavLink to='/home' message='Home' />
                        <NavLink to='/blog' message='Blog' />
                        <NavLink to='/sign_up' message='Sign Up' />

                    </div>

                    {
                        isLoggedIn ? (<button className={'logout-button'} onClick={logout}>Logout</button>): (<NavLink to='/login' message='Log In' />)
                    }
                </div>


            </div>

            <div>
                <FiMenu className='openMenu' onClick={toggleMenu} />
                <div className={`Navbar-mobile ${isMenuVisible ? 'showMenu' : ''}`}>
                    <FiX className='closeMenu' onClick={toggleMenu} />
                    <NavLink to='/home' message='Home' />
                    <NavLink to='/blog' message='Blog' />
                </div>
            </div>
        </NavStyle>
    );
};

export default Navbar;



// <div>
//     <FiMenu className='openMenu' onClick={toggleMenu} />
//     <div className={`Navbar-mobile ${isMenuVisible ? 'showMenu' : ''}`}>
//         <FiX className='closeMenu' onClick={toggleMenu} />
//         <NavLink href='#home' message='Home' />
//         <NavLink href='#blog' message='Blog' />
//     </div>
// </div>
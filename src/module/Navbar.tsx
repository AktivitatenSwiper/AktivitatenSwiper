import React, { useState } from 'react';
import type { FC } from 'react';

export interface NavbarProps {
    onNavItemClick: (label: string) => void;
}

const Navbar: FC<NavbarProps> = ({ onNavItemClick }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleButtonClick = (label: string) => () => {
        //TODO debug wenn fetig entfernen
        console.log(`Navbar: ${label} geklickt`);
        onNavItemClick?.(label);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light bg-transparent"  style={{width: '100%',}}>
            <div className="container-fluid">
                <a
                    href="#"
                    className="navbar-brand"
                    onClick={e => {
                        e.preventDefault();
                        setMenuOpen(prev => !prev);
                    }}
                >
                    Activity Swiper
                </a>

                <button
                    className="navbar-toggler"
                    type="button"
                    aria-controls="appNavbar"
                    aria-expanded={menuOpen}
                    aria-label="Toggle navigation"
                    onClick={() => setMenuOpen(prev => !prev)}
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div
                    id="appNavbar"
                    className={`collapse navbar-collapse fade ${menuOpen ? 'show' : ''} ` }
                >
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {['Home', 'Activities', 'Bookmarks'].map(label => (
                            <li key={label} className="nav-item">
                                <button
                                    type="button"
                                    className="nav-link btn btn-link"
                                    onClick={handleButtonClick(label)}
                                >
                                    {label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

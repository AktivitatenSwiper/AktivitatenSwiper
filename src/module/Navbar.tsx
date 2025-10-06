import React from 'react';
import type { FC } from 'react';

export interface NavbarProps {
    onNavItemClick: (label: string) => void;
}

const Navbar: FC<NavbarProps> = ({ onNavItemClick }) => {

    const handleButtonClick = (label: string) => () => {
        //TODO debug wenn fetig entfernen
        console.log(`Navbar: ${label} geklickt`);
        onNavItemClick?.(label);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light bg-transparent"  style={{width: '100%', overflow: "hidden"}}>
            <div className="container-fluid">


                <div
                    id="appNavbar"
                    className={"collapse navbar-collapse fade show " }
                >
                    <a
                        className="navbar-brand"
                        onClick={e => {
                            e.preventDefault();
                            //TODO
                        }}
                    >
                        Activity Swiper
                    </a>
                    {['Home', 'Activities', 'Bookmarks'].map(label => (
                        <button
                            key={label}
                            type="button"
                            className="btn btn-link"
                            onClick={handleButtonClick(label)}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

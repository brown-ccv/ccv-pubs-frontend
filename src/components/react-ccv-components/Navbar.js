import React from 'react';
import { ReactComponent as CCVLogo } from './assets/svg/ccv-logo.svg';
import { ReactComponent as BrownLogo } from './assets/svg/brown-logo.svg';
import '../../styles/custom.scss';

const Navbar = () => (
    <section className="p-2 pl-10 brown-nav bg-white">
        <a href="https://www.brown.edu">
            <BrownLogo />
        </a>
        <a href="https://ccv.brown.edu">
            <CCVLogo />
        </a>
    </section>
    
);

export default Navbar;
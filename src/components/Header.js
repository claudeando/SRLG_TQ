import '../App.css';
import Logo from '../assets/logo.png';

function Header() {
    return (
        <header>
            <a href="https://starlingbank.com"><img src={Logo} alt="Starling Bank Logo" /></a>
        </header>
    )
}

export default Header;
import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Header() {
    return (
        <header className='w-full flex justify-center align-middle'>
            <nav>
                <ul className="">
                    <li>
                        <Link to="/">
                            <Logo />
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
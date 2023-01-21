import React from "react";
import {Link} from "react-router-dom";

function Header() {
    return (
        <nav className="container">
                <ul className="nav nav-pills">
                    <li className="nav-item nav-link">
                        <Link to='/'>Проекты</Link>
                    </li>
                    <li className="nav-item nav-link">
                        <Link to='/notes'>Заметки</Link>
                    </li>
                    <li className="nav-item nav-link">
                        <Link to='/users'>Пользователи</Link>
                    </li>
                </ul>
        </nav>
    );
}


export default Header;
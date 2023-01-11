import React from "react";

function Header() {
    return (
        <div className="container">
        <header className="d-flex justify-content-center py-3">
          <ul className="nav nav-pills">
            <li className="nav-item"><a href="#" className="nav-link">Page 1</a></li>
            <li className="nav-item"><a href="#" className="nav-link">Page 2</a></li>
            <li className="nav-item"><a href="#" className="nav-link">Page 3</a></li>
            <li className="nav-item"><a href="#" className="nav-link">Page 4</a></li>
            <li className="nav-item"><a href="#" className="nav-link">Page 5</a></li>
          </ul>
        </header>
      </div>
    );
}


export default Header;

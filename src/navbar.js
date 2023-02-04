function Navbar(props) {
    function logOut() {
        localStorage.clear();
        window.location.reload();
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" href="/"><img src="logo.png" height="60px" /></a>
                {props.type == null ? "" : 
                    <>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {props.type == "1" ?
                            <>
                        <li className="nav-item"><a className="nav-link" aria-current="page" href="/"><i className="bi bi-list-nested me-2"></i>Orders</a></li>

                                        <li className="nav-item"><a className="nav-link" aria-current="page" href="products"><i className="bi bi-grid me-2"></i>Products</a></li>
                            </>:<>
                        <li className="nav-item"><a className="nav-link" aria-current="page" href="cart"><i className="bi bi-bag me-2"></i>Cart</a></li>

                        <li className="nav-item"><a className="nav-link" aria-current="page" href="orders"><i className="bi bi-list-nested me-2"></i>Orders</a></li>
                        </>}
                        <li className="nav-item">
                        <div className="dropdown">
                                        <a className="nav-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{localStorage.getItem('UserName')}</a>
                                <ul className="dropdown-menu dropdown-menu-dark">
                                            <li><a className="dropdown-item" href="profile"><i class="bi bi-person me-2"></i>My Profile</a></li>
                                    <li><a className="dropdown-item" onClick={()=>logOut()} href="#"><i className="bi bi-box-arrow-right me-2"></i>Sign Out</a></li>
                            </ul>
                        </div>
                        </li>
                    </ul>
                        </div>
                        </>
                    }
            </div>
        </nav>
        );
}
export default Navbar;

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" href="/"><img src="logo.png" height="60px"/></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item"><a className="nav-link" aria-current="page" href="/"><i className="bi bi-list-nested me-2"></i>Orders</a></li>
                        <li className="nav-item"><a className="nav-link" aria-current="page" href="products"><i className="bi bi-grid me-2"></i>Products</a></li>
                        <li className="nav-item">
                            <div className="dropdown">
                            <a className="nav-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Profile</a>
                                <ul className="dropdown-menu dropdown-menu-dark">
                                    <li><a className="dropdown-item" href="#"><i className="bi bi-gear me-2"></i>Settings</a></li>
                                    <li><a className="dropdown-item" href="#"><i className="bi bi-box-arrow-right me-2"></i>Sign Out</a></li>
                            </ul>
                        </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        );
}
export default Navbar;
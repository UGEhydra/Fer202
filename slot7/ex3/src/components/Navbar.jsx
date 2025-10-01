export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active fw-bold" style={{ color: "blue" }} aria-current="page" href="/active">
                  Active
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" style={{ color: "blue" }} href="/link1">
                  Link
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" style={{ color: "blue" }} href="/link2">
                  Link
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" style={{ color: "gray" }} aria-disabled="true" href="/disabled">
                  Disabled
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

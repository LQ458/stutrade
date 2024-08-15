/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Home() {
  useEffect(() => {
    import("bootstrap");
  }, []);
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Second Handle Market
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  <i className="bi bi-box-arrow-in-right"></i> Login
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/register">
                  <i className="bi bi-person-plus"></i> Register
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="container mt-5">
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Initiate Trade</h5>
                <p className="card-text">
                  Post your second-hand items to start trading.
                </p>
                <a href="#" className="btn btn-primary">
                  Initiate Trade
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Accept Trade</h5>
                <p className="card-text">
                  Browse and accept trades posted by others.
                </p>
                <a href="#" className="btn btn-success">
                  Accept Trade
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Items */}
        <div className="row mt-5">
          <div className="col-12">
            <h3>Featured Items</h3>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <img src="item1.jpg" className="card-img-top" alt="Item 1" />
              <div className="card-body">
                <h5 className="card-title">Item 1</h5>
                <p className="card-text">Description of item 1.</p>
                <a href="#" className="btn btn-info">
                  View Details
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <img src="item2.jpg" className="card-img-top" alt="Item 2" />
              <div className="card-body">
                <h5 className="card-title">Item 2</h5>
                <p className="card-text">Description of item 2.</p>
                <a href="#" className="btn btn-info">
                  View Details
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <img src="item3.jpg" className="card-img-top" alt="Item 3" />
              <div className="card-body">
                <h5 className="card-title">Item 3</h5>
                <p className="card-text">Description of item 3.</p>
                <a href="#" className="btn btn-info">
                  View Details
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="row mt-5">
          <div className="col-12">
            <h3>Recent Transactions</h3>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Transaction 1</h5>
                <p className="card-text">Details of transaction 1.</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Transaction 2</h5>
                <p className="card-text">Details of transaction 2.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-light text-center text-lg-start mt-5">
        <div className="container p-4">
          <div className="row">
            <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
              <h5 className="text-uppercase">Second Hand Trading Platform</h5>
              <p>
                Your go-to platform for trading second-hand items. Safe, secure,
                and easy to use.
              </p>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">Links</h5>
              <ul className="list-unstyled mb-0">
                <li>
                  <a href="#" className="text-dark">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-dark">
                    Initiate Trade
                  </a>
                </li>
                <li>
                  <a href="#" className="text-dark">
                    Accept Trade
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">Contact</h5>
              <ul className="list-unstyled mb-0">
                <li>
                  <a href="#" className="text-dark">
                    Email: support@tradingplatform.com
                  </a>
                </li>
                <li>
                  <a href="#" className="text-dark">
                    Phone: +123 456 7890
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center p-3 bg-dark text-white">
          © 2023 Second Hand Trading Platform
        </div>
      </footer>
    </div>
  );
}

/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Modal } from "bootstrap";
import { useRef } from "react";
import Link from "next/link";

export default function Home() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(1.0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [hide, setHide] = useState(false);
  const [items, setItems] = useState<
    { id: string; name: string; price: number; quantity: number }[]
  >([]);
  const [total, setTotal] = useState<number>(0.0);
  const modalRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/getOrders");
        setOrders(response.data.orders);
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          // Handle 404 error (e.g., do nothing or set orders to an empty array)
          setOrders([]);
        } else {
          console.error("Error fetching orders", error);
        }
      }
    };

    if (typeof window !== "undefined") {
      import("bootstrap").then(({ Modal }) => {
        const handleHide = () => {
          if (hide && modalRef.current) {
            const modal = Modal.getInstance(modalRef.current);
            if (modal) {
              modal.hide();
            }
          }
        };
        handleHide();
      });
    }

    fetchOrders();
  }, [hide]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price.toString());
    formData.append("description", description);
    if (image) {
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];
      if (allowedTypes.includes(image.type)) {
        formData.append("image", image);
      } else {
        alert(
          "Unsupported image format. Only jpg, jpeg, png, and webp are allowed.",
        );
      }
    }
    try {
      const response = await axios.post("/api/postOrder", formData);
      console.log(response.data);
      setHide(true);
      setName("");
      setPrice(1.0);
      setDescription("");
      if (imgRef.current) {
        imgRef.current.value = "";
        setImage(null); // Optionally reset the image state
      }
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (id: String, delta: number) => {
    setItems(
      items
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const addToCart = (order: any) => {
    setItems((prevItems) => {
      const itemExists = prevItems.some((item) => item.id === order._id);

      if (itemExists) {
        return prevItems.map((item) =>
          item.id === order._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        return [
          ...prevItems,
          { id: order._id, name: order.name, price: order.price, quantity: 1 },
        ];
      }
    });
  };

  useEffect(() => {
    const newTotal = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    setTotal(newTotal);
  }, [items]);

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Second Hand Trading Market
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
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Initiate Trade</h5>
                <p className="card-text">
                  Post your second-hand items to start trading.
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#initiateTradeModal"
                >
                  Initiate Trade
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Cart</h5>
                <p className="card-text">
                  You have {items.length} items in your cart.
                </p>
                <ul className="list-group list-group-flush">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      {item.name} - ${item.price.toFixed(2)}
                      <div>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleQuantityChange(item.id, -1)}
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleQuantityChange(item.id, 1)}
                        >
                          +
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <span className="font-weight-bold">
                    Total: ${total.toFixed(2)}
                  </span>
                  <a href="#" className="btn btn-success">
                    Checkout
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Items */}
        <div className="row mt-5">
          <div className="col-12">
            <h3>Featured Items</h3>
          </div>
          {orders.map((order: any) => (
            <Link
              href="#"
              className="col-md-4 mb-4 text-decoration-none"
              key={order._id}
            >
              <div className="card h-100">
                <img
                  src={order.image}
                  className="card-img-top"
                  alt={order.name}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{order.name}</h5>
                  <p className="card-text">{order.price}$</p>
                  <p className="card-text">{order.description}</p>
                  <div className="mt-auto">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={(e) => {
                        e.stopPropagation(); // 阻止事件冒泡以防止触发 viewDetails
                        addToCart(order);
                      }}
                    >
                      <i className="bi bi-cart"></i>
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
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
      </div>

      {/* Initiate Trade Modal */}
      <div
        className="modal fade"
        id="initiateTradeModal"
        tabIndex={-1}
        aria-labelledby="initiateTradeModalLabel"
        aria-hidden="true"
        ref={modalRef}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="initiateTradeModalLabel">
                Initiate Trade
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="itemName" className="form-label">
                    Item Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="itemName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="itemPrice" className="form-label">
                    Item Price
                  </label>
                  <input
                    type="number"
                    min={1}
                    step={0.01}
                    className="form-control"
                    id="itemPrice"
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="itemDescription" className="form-label">
                    Item Description
                  </label>
                  <textarea
                    className="form-control"
                    id="itemDescription"
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    value={description}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="itemImage" className="form-label">
                    Item Image
                  </label>
                  <input
                    type="file"
                    onChange={(e) => {
                      if (e.target.files) {
                        setImage(e.target.files[0]);
                      }
                    }}
                    className="form-control"
                    id="itemImage"
                    ref={imgRef}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  {loading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    "Submit"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

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

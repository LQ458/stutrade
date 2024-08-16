"use client";
import React, { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Register = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    document.title = "Register";
    import("bootstrap");

    const START_COLOR = "#5dadec";
    const END_COLOR = "#006acc";
    const WAVES = [
      {
        offset: 0.25,
        speed: 0.3,
        width: 500,
        height: 50,
      },
      {
        offset: 0.5,
        speed: -0.4,
        width: 500,
        height: 50,
      },
      {
        offset: 0.75,
        speed: 0.5,
        width: 500,
        height: 50,
      },
    ];

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    function resize() {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        update(false);
      }
    }
    window.addEventListener("resize", resize);
    resize();

    function update(loop: number | boolean | undefined = true) {
      if (ctx) {
        // background
        const grad = ctx.createLinearGradient(0, 0, 0, window.innerHeight);
        grad.addColorStop(0, START_COLOR);
        grad.addColorStop(1, END_COLOR);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        // waves
        for (const { offset, speed, width, height } of WAVES) {
          // draw
          ctx.beginPath();

          const y = window.innerHeight * offset;

          ctx.moveTo(0, y);

          for (let x = 0; x <= window.innerWidth; x++) {
            ctx.lineTo(
              x,
              Math.sin(((x - Date.now() * speed) * Math.PI) / (2 * width)) *
                height +
                y,
            );
          }

          ctx.lineTo(window.innerWidth, window.innerHeight);
          ctx.lineTo(0, window.innerHeight);

          // gradient
          const waveGrad = ctx.createLinearGradient(
            0,
            y - height,
            0,
            window.innerHeight,
          );
          waveGrad.addColorStop(0, START_COLOR);
          waveGrad.addColorStop(1, END_COLOR);
          ctx.fillStyle = waveGrad;
          ctx.fill();
        }

        if (loop) requestAnimationFrame(update);
      }
    }
    update();
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", top: 0, left: 0 }}
      ></canvas>
      <div
        className="container d-flex justify-content-center align-items-center vh-100"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="card p-4" style={{ width: "400px" }}>
          <h3 className="card-title text-center mb-4">Register</h3>
          <form>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter your username"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm your password"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;

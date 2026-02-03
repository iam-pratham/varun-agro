"use client";
import "./Footer.css";

import { useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useViewTransition } from "@/hooks/useViewTransition";
import Copy from "../Copy/Copy";

import { RiLinkedinBoxLine } from "react-icons/ri";
import { RiInstagramLine } from "react-icons/ri";
import { RiDribbbleLine } from "react-icons/ri";
import { RiYoutubeLine } from "react-icons/ri";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const { navigateWithTransition } = useViewTransition();
  const socialIconsRef = useRef(null);

  useGSAP(
    () => {
      if (!socialIconsRef.current) return;

      const icons = socialIconsRef.current.querySelectorAll(".icon");
      gsap.set(icons, { opacity: 0, x: -40 });

      ScrollTrigger.create({
        trigger: socialIconsRef.current,
        start: "top 90%",
        once: true,
        animation: gsap.to(icons, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: -0.1,
          ease: "power3.out",
        }),
      });
    },
    { scope: socialIconsRef }
  );

  return (
    <div className="footer">
      <div className="footer-meta">
        <div className="container footer-meta-header">
          <div className="footer-meta-col">
            <div className="footer-meta-block">
              <div className="footer-meta-logo">
                <Copy delay={0.1}>
                  <h3 className="lg">Varun Agro</h3>
                </Copy>
              </div>
              <Copy delay={0.2}>
                <h2>Quality, Innovation, Sustainability.</h2>
              </Copy>
            </div>
          </div>
          <div className="footer-meta-col">
            <div className="footer-nav-links">
              <Copy delay={0.1}>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithTransition("/");
                  }}
                >
                  <h3>Home</h3>
                </a>
                <a
                  href="/sustainability"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithTransition("/sustainability");
                  }}
                >
                  <h3>Sustainability</h3>
                </a>
                <a
                  href="/studio"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithTransition("/studio");
                  }}
                >
                  <h3>About us</h3>
                </a>
                <a
                  href="/team"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithTransition("/team");
                  }}
                >
                  <h3>Our team</h3>
                </a>
                <a
                  href="/investor-corner"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithTransition("/investor-corner");
                  }}
                >
                  <h3>Investor Corner</h3>
                </a>
                <a
                  href="/industries"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithTransition("/industries");
                  }}
                >
                  <h3>Industries</h3>
                </a>
                <a
                  href="/spaces"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithTransition("/spaces");
                  }}
                >
                  <h3>Products</h3>
                </a>
                <a
                  href="/connect"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithTransition("/connect");
                  }}
                >
                  <h3>Contact Us</h3>
                </a>
              </Copy>
            </div>
          </div>
        </div>

      </div>
      <div className="footer-outro">
        <div className="container">
          <div className="footer-header">
            <h1
              style={{
                background:
                  "linear-gradient(to right, var(--base-100), var(--base-300))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: "20.5vw",
                lineHeight: "1.25",
                paddingBottom: "0rem",
                letterSpacing: "-0.5rem",
                textAlign: "center",
                width: "calc(100% + 4rem)",
                marginLeft: "-2rem",
              }}
            >
              Varun Agro
            </h1>
          </div>
          <div className="footer-copyright">
            <p>
              Developed by — <span>Varun Agro</span>
            </p>
            <p>This website is using cookies.</p>
            <p>All rights reserverd &copy; 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

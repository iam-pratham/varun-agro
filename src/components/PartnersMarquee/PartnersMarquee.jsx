"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Copy from "../Copy/Copy";
import "./PartnersMarquee.css";

gsap.registerPlugin(ScrollTrigger);

const partners = [
  "coca-cola.svg",
  "del-monte.svg",
  "itc.svg",
  "kagome.svg",
  "mccain.svg",
  "nestle.svg",
  "paper-boat.svg",
  "parle-agro.svg",
  "patanjali.svg",
  "pepsico.svg",
  "raw.svg",
  "tasty-bites.svg",
  "unilever.svg",
  "veeba.svg",
];

const PartnersMarquee = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;

    // Total duration for one loop (adjust for speed)
    const duration = 40; 
    
    // Create the infinite loop tween
    const tl = gsap.to(track, {
      xPercent: -50, // Move 50% of the width (which corresponds to 2 sets of logos out of 4)
      duration: duration,
      ease: "none",
      repeat: -1,
    });

    let scrollTimeout;

    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity());
        const direction = self.direction; // 1 (down) or -1 (up)
        
        if (direction === 0) return;

        // Base speed factor based on velocity
        // Maximum acceleration limited to prevent dizziness
        const velocityFactor = Math.min(velocity / 200, 5); 
        const targetScale = direction * (1 + velocityFactor);

        gsap.to(tl, {
            timeScale: targetScale,
            duration: 0.2,
            overwrite: true
        });

        // Debounce returning to normal speed
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            gsap.to(tl, {
                timeScale: direction, // Return to base speed in the current direction
                duration: 0.5
            });
        }, 100);
      },
    });

  }, { scope: containerRef });

  return (
    <div className="partners-marquee" ref={containerRef}>
      <div className="container partners-header">
        <Copy delay={0.1}>
            <h1 className="lg">Our Partners</h1>
        </Copy>
      </div>
      <div className="marquee-container">
        <div className="marquee-track" ref={trackRef}>
          {/* Render 6 sets to ensure seamless loop and coverage on large screens */}
          {[...partners, ...partners, ...partners, ...partners, ...partners, ...partners].map((partner, index) => (
            <div className="partner-logo" key={index}>
              <img src={`/partners/${partner}`} alt={partner.replace('.svg', '').replace('-', ' ')} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnersMarquee;

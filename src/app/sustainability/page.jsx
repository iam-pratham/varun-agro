"use client";
import React, { useRef } from "react";
import "./sustainability.css";
import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import Copy from "@/components/Copy/Copy";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SustainabilityPage = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Animate Diagram Cards
    gsap.from(".sus-card", {
      scrollTrigger: {
        trigger: ".sus-diagram-container",
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });

    // Animate Cycle Diagram
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".sus-cycle-container",
        start: "top 60%",
      },
    });

    tl.from(".sus-cycle-circle", {
      scale: 0,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.7)",
    })
    .from(".sus-cycle-center", {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
    }, "-=0.5")
    .to(".sus-cycle-item", {
      opacity: 1,
      duration: 0.5,
      stagger: 0.2,
    });

    // Animate Stats
    gsap.from(".sus-stat", {
        scrollTrigger: {
            trigger: ".sus-stats-section",
            start: "top 75%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
    });

  }, { scope: containerRef });

  return (
    <>
      <Nav />
      <div className="sustainability-page" ref={containerRef}>
        <section className="sus-hero">
          <div className="container">
            <Copy delay={0.2}>
              <h1>Sustainability<br />at Varun Agro</h1>
            </Copy>
            <Copy delay={0.4}>
              <p>
                We believe that the future of food is rooted in the health of our planet. 
                Our commitment goes beyond processing; it encompasses the entire ecosystem 
                from soil to table.
              </p>
            </Copy>
          </div>
        </section>

        <section className="sus-diagram-section">
          <div className="container">
            <div className="sus-diagram-header">
                <Copy delay={0.1}>
                    <h2>Our Approach</h2>
                </Copy>
            </div>
            
            <div className="sus-diagram-container">
              <div className="sus-card">
                <div className="sus-card-icon">🌱</div>
                <h3>Regenerative Farming</h3>
                <p>
                  We empower farmers with techniques that restore soil health, 
                  enhance biodiversity, and reduce carbon footprints.
                </p>
              </div>
              <div className="sus-card">
                <div className="sus-card-icon">💧</div>
                <h3>Water Conservation</h3>
                <p>
                  Our facilities utilize advanced water recycling systems, 
                  ensuring zero water waste in our processing cycle.
                </p>
              </div>
              <div className="sus-card">
                <div className="sus-card-icon">☀️</div>
                <h3>Renewable Energy</h3>
                <p>
                  Harnessing solar power to fuel our operations, reducing reliance 
                  on fossil fuels and lowering emissions.
                </p>
              </div>
              <div className="sus-card">
                <div className="sus-card-icon">🤝</div>
                <h3>Community Growth</h3>
                <p>
                  Fair trade practices and education programs that uplift 
                  local farming communities and secure their future.
                </p>
              </div>
            </div>

            <div className="sus-cycle-container">
                <div className="sus-cycle-circle">
                    <div className="sus-cycle-center">
                        <h2>Circular<br />Economy</h2>
                    </div>
                </div>
                
                <div className="sus-cycle-item item-1">
                    <h3>Sourcing</h3>
                    <p>Ethical & Local</p>
                </div>
                <div className="sus-cycle-item item-2">
                    <h3>Production</h3>
                    <p>Zero Waste</p>
                </div>
                <div className="sus-cycle-item item-3">
                    <h3>Distribution</h3>
                    <p>Eco-friendly Logistics</p>
                </div>
                <div className="sus-cycle-item item-4">
                    <h3>Consumption</h3>
                    <p>Healthy Communities</p>
                </div>
            </div>
          </div>
        </section>

        <section className="sus-stats-section">
            <div className="container">
                <div className="sus-stats-grid">
                    <div className="sus-stat">
                        <h2>100%</h2>
                        <p>Water Recycled</p>
                    </div>
                    <div className="sus-stat">
                        <h2>500+</h2>
                        <p>Farmers Empowered</p>
                    </div>
                    <div className="sus-stat">
                        <h2>50%</h2>
                        <p>Solar Powered</p>
                    </div>
                    <div className="sus-stat">
                        <h2>0</h2>
                        <p>Landfill Waste</p>
                    </div>
                </div>
            </div>
        </section>
      </div>
      <ConditionalFooter />
    </>
  );
};

export default SustainabilityPage;

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
    // 1. Hero Arch Animations
    const tl = gsap.timeline();

    tl.from(".arch-title-left", {
        x: -50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
    })
    .from(".arch-title-right", {
        x: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
    }, "<") // Run simultaneously
    .from(".hero-manifesto", {
        y: 30,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1,
        ease: "power2.out"
    }, "-=0.8")
    .from(".meta-label", {
        opacity: 0,
        y: 10,
        stagger: 0.1,
        duration: 0.8
    }, "-=0.5");

    // 2. Pillars Grid Stagger
    gsap.from(".pillar-row", {
        y: 50,
        // opacity: 0, // Temporarily removed to ensure visibility
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
            trigger: ".sus-pillars-grid",
            start: "top 85%", // Trigger earlier
        }
    });

    // 3. Cycle Path Animation (Kept as requested)
    gsap.from(".cycle-path", {
        strokeDashoffset: 5000, // Match the dasharray in CSS
        scrollTrigger: {
            trigger: ".sus-cycle-wrapper",
            start: "top center",
            end: "bottom bottom", 
            scrub: 2, 
        }
    });
    
    // Animate cycle steps appearing
    const steps = gsap.utils.toArray(".cycle-step");
    steps.forEach((step, i) => {
        gsap.from(step, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            scrollTrigger: {
                trigger: step,
                start: "top 80%",
            }
        });
    });

  }, { scope: containerRef });

  return (
    <>
      <Nav />
      <div className="sustainability-page" ref={containerRef}>
        
        {/* HERO - Architectural/Split */}
        <section className="sus-hero-arch">
          <div className="arch-container">
             <div className="hero-top">
                <h1 className="arch-title-left">Earth First.</h1>
                <div className="hero-meta">
                    <span className="meta-label">Est. 2010</span>
                    <span className="meta-label">Regenerative Future</span>
                </div>
             </div>
             
             <div className="hero-center">
                <div className="hero-manifesto">
                    <p>
                        We believe the future of food is regenerative. 
                        Every product we create is a pledge to the planet 
                        that nourishes us.
                    </p>
                </div>
             </div>

             <div className="hero-bottom">
                <h1 className="arch-title-right">Always.</h1>
             </div>
          </div>
        </section>

        {/* PILLARS - Swiss Grid Style */}
        <section className="sus-pillars-grid">
            <div className="grid-header">
                <h2 className="section-label">( Our Principles )</h2>
            </div>
            
            <div className="pillars-wrapper">
                {/* Pillar 01 */}
                <div className="pillar-row">
                    <div className="pillar-num">01</div>
                    <div className="pillar-title"><h3>Regenerative<br/>Farming</h3></div>
                    <div className="pillar-desc">
                        <p>
                            We don't just source; we nurture. Working with 500+ farmers, 
                            we implement soil-restoring techniques that sequester carbon 
                            and bring life back to the land.
                        </p>
                    </div>
                </div>

                {/* Pillar 02 */}
                <div className="pillar-row">
                    <div className="pillar-num">02</div>
                    <div className="pillar-title"><h3>Closed-Loop<br/>Water</h3></div>
                    <div className="pillar-desc">
                        <p>
                            Water is life. Our advanced filtration systems ensure 
                            zero liquid discharge, recycling 100% of process water 
                            back into our green belts to nourish native plants and 
                            replenish the local aquifer.
                        </p>
                    </div>
                </div>

                {/* Pillar 03 */}
                <div className="pillar-row">
                    <div className="pillar-num">03</div>
                    <div className="pillar-title"><h3>Solar<br/>Powered</h3></div>
                    <div className="pillar-desc">
                        <p>
                            Harnessing the sun to fuel our future. We are rapidly 
                            transitioning our entire processing infrastructure to 
                            renewable energy sources, ensuring that every product 
                            is made with the lightest possible touch.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* THE CYCLE - Vertical Flow */}
        <section className="sus-cycle-v2">
            <div className="container">
                <div className="sus-cycle-header">
                    <Copy><h2>The Virtuous Cycle</h2></Copy>
                </div>

                <div className="sus-cycle-wrapper">
                    {/* SVG Line connecting steps */}
                    <svg className="cycle-line-svg" viewBox="0 0 100 800" preserveAspectRatio="none">
                        <path className="cycle-path" d="M50,0 C50,200 50,200 50,800" vectorEffect="non-scaling-stroke" />
                    </svg>

                    <div className="cycle-step">
                        <div className="step-dot"></div>
                        <div className="step-content">
                            <h3>Ethical Sourcing</h3>
                            <p>Direct from local farmers at fair trade prices.</p>
                        </div>
                    </div>
                    
                    <div className="cycle-step right">
                        <div className="step-content">
                            <h3>Zero-Waste Prep</h3>
                            <p>Every byproduct is repurposed or composted.</p>
                        </div>
                        <div className="step-dot"></div>
                    </div>

                    <div className="cycle-step">
                        <div className="step-dot"></div>
                        <div className="step-content">
                            <h3>Green Logistics</h3>
                            <p>Optimized routes and eco-friendly packaging.</p>
                        </div>
                    </div>

                    <div className="cycle-step right">
                        <div className="step-content">
                            <h3>Community Impact</h3>
                            <p>Profits reinvested into rural education.</p>
                        </div>
                        <div className="step-dot"></div>
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

"use client";
import "./studio.css";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import TeamScroll from "@/components/TeamScroll/TeamScroll";
import Spotlight from "@/components/Spotlight/Spotlight";
import Copy from "@/components/Copy/Copy";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

const page = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
      // Hero Animations
      const split = new SplitText(".studio-hero h1", { type: "lines" });
      
      const tl = gsap.timeline();
      tl.from(split.lines, {
          y: 100,
          opacity: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out",
          delay: 0.2
      })
      .from(".studio-hero p", {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
      }, "-=0.8")
      .from(".studio-hero-img", {
          clipPath: "inset(0 0 100% 0)",
          duration: 1.5,
          ease: "expo.out"
      }, "-=1");

      // Facts Animation
      gsap.from(".fact-item", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
              trigger: ".more-facts",
              start: "top 80%"
          }
      });

  }, { scope: containerRef });

  return (
    <>
      <Nav />
      <div className="page studio" ref={containerRef}>
        <section className="studio-hero">
          <div className="container">
             <div className="studio-hero-content">
                <Copy delay={0.2}>
                    <h1>Pioneering<br/>Preservation.</h1>
                </Copy>
                <div className="studio-hero-sub">
                    <Copy delay={0.4}>
                        <p>
                        Varun Agro Processing Foods Pvt. Ltd. stands at the forefront of the food processing industry. 
                        Founded in 2010, we blend tradition with technology to deliver nature's finest to the world.
                        </p>
                    </Copy>
                </div>
             </div>
             <div className="studio-hero-img">
                <img src="/studio/about-hero.png" alt="Varun Agro Facility" />
             </div>
          </div>
        </section>

        <section className="more-facts">
          <div className="container">
            <div className="facts-grid">
              <div className="fact-item">
                <span className="fact-label">Processing Capacity</span>
                <span className="fact-value">500+ MT</span>
              </div>
              <div className="fact-item">
                <span className="fact-label">Quality Standards</span>
                <span className="fact-value">ISO 22000</span>
              </div>
              <div className="fact-item">
                <span className="fact-label">Experience</span>
                <span className="fact-value">14+ Years</span>
              </div>
              <div className="fact-item">
                <span className="fact-label">Global Reach</span>
                <span className="fact-value">Export Ready</span>
              </div>
            </div>
          </div>
        </section>

        <section className="team-scroll-container">
          <div className="container">
            <TeamScroll />
          </div>
        </section>
        
        {/* Preserving the last spotlight animation as requested */}
        <Spotlight />
      </div>
      <ConditionalFooter />
    </>
  );
};

export default page;

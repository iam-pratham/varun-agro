"use client";
import "./studio.css";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import HowWeWork from "@/components/HowWeWork/HowWeWork";
import Spotlight from "@/components/Spotlight/Spotlight";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import Copy from "@/components/Copy/Copy";

const page = () => {
  return (
    <>
      <Nav />
      <div className="page studio">
        <section className="studio-hero">
          <div className="container">
            <div className="studio-hero-col">
              <Copy delay={0.85}>
                <p>
                  Varun Agro Processing Foods Pvt. Ltd. is dedicated to producing high-quality food products with a focus on sustainability, innovation, and customer satisfaction.
                </p>
              </Copy>
            </div>
            <div className="studio-hero-col">
              <Copy delay={0.85}>
                <h2>
                  Founded in 2010, we have grown into a leading Indian food processing company, specializing in fruit pulps, concentrates, and frozen foods, serving global markets with trust and excellence.
                </h2>
              </Copy>
              <div className="studio-hero-hero-img">
                <img src="/studio/about-hero.png" alt="" />
              </div>
            </div>
          </div>
        </section>
        <section className="more-facts">
          <div className="container">
            <div className="more-facts-items">
              <div className="fact">
                <Copy delay={0.1}>
                  <p>Processing Capacity</p>
                  <h2>500+ MT</h2>
                </Copy>
              </div>
              <div className="fact">
                <Copy delay={0.2}>
                  <p>Quality Standards</p>
                  <h2>ISO 22000</h2>
                </Copy>
              </div>
              <div className="fact">
                <Copy delay={0.3}>
                  <p>Years of Experience</p>
                  <h2>14+</h2>
                </Copy>
              </div>
              <div className="fact">
                <Copy delay={0.4}>
                  <p>Global Reach</p>
                  <h2>Export</h2>
                </Copy>
              </div>
              <div className="fact">
                <Copy delay={0.5}>
                  <p>Products</p>
                  <h2>50+</h2>
                </Copy>
              </div>
            </div>
          </div>
        </section>
        <section className="how-we-work-container">
          <div className="container">
            <HowWeWork />
          </div>
        </section>
        <section className="leadership-container" style={{ padding: "4em 0", background: "var(--base-100)", color: "var(--base-900)" }}>
          <div className="container">
             <div className="leadership-header" style={{ marginBottom: "2em" }}>
                <Copy delay={0.1} animateOnScroll={true}>
                   <h2 style={{ fontSize: "2rem", marginBottom: "1em" }}>Leadership</h2>
                </Copy>
             </div>
             <div className="leadership-content" style={{ display: "flex", flexDirection: "column", gap: "2em" }}>
                <div className="leader">
                   <Copy delay={0.2} animateOnScroll={true}>
                      <h3 style={{ fontSize: "1.5rem" }}>Ms. Manisha Dhatrak</h3>
                      <p style={{ fontSize: "1rem", opacity: 0.7, marginBottom: "0.5em" }}>Managing Director</p>
                      <p style={{ maxWidth: "600px" }}>Driven by sustainability, innovation, and strategic leadership, Ms. Dhatrak has steered Varun Agro to become a trusted name in the global food processing industry.</p>
                   </Copy>
                </div>
             </div>
          </div>
        </section>
        <CTAWindow
          img="/studio/about-cta-window.jpg"
          header="Our Commitment"
          callout="Quality you can trust"
          description="From farm to fork, we ensure the highest standards of safety, hygiene, and quality in all our products."
        />
        <Spotlight />
      </div>
      <ConditionalFooter />
    </>
  );
};

export default page;

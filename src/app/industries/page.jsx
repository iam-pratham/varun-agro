"use client";
import { useEffect, useRef } from "react";
import "./industries.css";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import Copy from "@/components/Copy/Copy";
import AnimatedButton from "@/components/AnimatedButton/AnimatedButton";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Industries = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Hero Title Animation
      const split = new SplitText(".hero-title", { type: "lines" });
      gsap.from(split.lines, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.2,
      });

      // Intro Text Animation
      gsap.from(".hero-intro p", {
        y: 20,
        opacity: 0,
        duration: 1,
        delay: 0.8,
        ease: "power3.out",
      });

      // Sections Animation
      const sections = document.querySelectorAll(".industry-section");
      sections.forEach((section) => {
        gsap.from(section.querySelectorAll(".section-title, .content-block"), {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div className="industries-page" ref={containerRef}>
      <Nav />
      
      {/* Hero Section */}
      <section className="industries-hero">
        <div className="hero-container">
          <div className="hero-title-wrapper">
            <h1 className="hero-title">Industries</h1>
            <h1 className="hero-title">We Serve</h1>
          </div>
          <div className="hero-intro">
            <p>
              Delivering natural taste, freshness, and innovation across diverse industries. 
              Varun Agro Processing Foods Limited supplies aseptic purees, concentrates, frozen, 
              and freeze-dried fruits & vegetables that serve as essential raw materials for a wide range of industries.
            </p>
          </div>
        </div>
      </section>

      {/* Food & Beverages */}
      <section className="industry-section">
        <div className="section-container">
          <div className="section-title">
            <Copy>
              <h2>Food & Beverages</h2>
              <p>Trusted by leading manufacturers</p>
            </Copy>
          </div>
          <div className="section-content">
            <div className="content-block">
              <h3>Tomato Sauce</h3>
              <p>
                Our tomato paste, purees, concentrates, and pulps are trusted by leading food manufacturers 
                as a key base ingredient for a wide range of packaged food products. Carefully processed 
                and aseptically packed, they ensure superior taste, color, and texture while maintaining 
                safety and freshness.
              </p>
              <ul className="content-list">
                <li>
                  <span><strong>Tomato-based sauces, ketchups & chutneys</strong> – delivering authentic taste, vibrant color, and stable consistency for commercial and retail products.</span>
                </li>
                <li>
                  <span><strong>Vegetable bases for ready-to-cook & ready-to-eat meals</strong> – enabling convenient meal solutions with rich natural flavors and nutritional value.</span>
                </li>
                <li>
                  <span><strong>Fruit pulps & dices for packaged foods</strong> – enhancing beverages, desserts, jams, bakery fillings, and dairy-based products with natural fruit content.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Frozen & Freeze-Dried Foods */}
      <section className="industry-section">
        <div className="section-container">
          <div className="section-title">
            <Copy>
              <h2>Frozen & Freeze-Dried</h2>
              <p>Advanced IQF Technology</p>
            </Copy>
          </div>
          <div className="section-content">
            <div className="content-block">
              <p>
                We use advanced IQF (Individually Quick Frozen) and freeze-drying technology to lock in the 
                natural taste, color, texture, and nutritional value of fruits and vegetables. This ensures 
                our products remain as close to fresh as possible — making them ideal for today’s fast-paced 
                food manufacturing and culinary needs.
              </p>
            </div>
            <div className="content-block">
              <h3>Our Range Includes</h3>
              <ul className="content-list">
                <li><span><strong>IQF Frozen Vegetables</strong> — Sweet corn, green peas, broccoli, cabbage, asparagus, and more.</span></li>
                <li><span><strong>Frozen & Diced Fruits</strong> — Mango, papaya, strawberry, muskmelon, pineapple, etc.</span></li>
                <li><span><strong>Freeze-Dried Fruits & Vegetables</strong> — Mango, banana, papaya, strawberry, okra, pumpkin, carrot, and others.</span></li>
              </ul>
            </div>
            <div className="content-block">
              <h3>Applications</h3>
              <p>
                Perfect for snacks, packaged meal mixes, frozen ready meals, instant soups, bakery fillings, 
                smoothies, and industrial kitchens that demand year-round availability, convenience, and quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Condiments & Culinary Products */}
      <section className="industry-section">
        <div className="section-container">
          <div className="section-title">
            <Copy>
              <h2>Condiments & Culinary</h2>
              <p>Ready-to-Use Solutions</p>
            </Copy>
          </div>
          <div className="section-content">
            <div className="content-block">
              <h3>Ready-to-Use Condiments & Culinary Bases</h3>
              <p>
                With state-of-the-art automated production lines, we manufacture a range of ready-to-use 
                condiments and cooking bases designed to deliver convenience, consistency, and authentic taste 
                for food manufacturers, HoReCa (Hotel, Restaurant & Catering), and retail brands.
              </p>
            </div>
            <div className="content-block">
              <h3>Key Products</h3>
              <ul className="content-list">
                <li><span><strong>GRO Tomato Ketchup</strong> (available in multiple SKUs & pack sizes) — rich, tangy, and perfectly balanced to complement a wide variety of snacks and meals.</span></li>
                <li><span><strong>Zingat Vinegar</strong> — premium-quality vinegar ideal for pickling, culinary preparations, and flavor enhancement.</span></li>
                <li><span><strong>Ginger Garlic Paste & Other Cooking Essentials</strong> — freshly processed, hygienically packed, and ready to use, ensuring uniform taste and aroma in every recipe.</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Export Markets */}
      <section className="industry-section">
        <div className="section-container">
          <div className="section-title">
            <Copy>
              <h2>Export Markets</h2>
              <p>Global-Standard Supply</p>
            </Copy>
          </div>
          <div className="section-content">
            <div className="content-block">
              <h3>Global-Standard Food Supply & Export Excellence</h3>
              <p>
                At Varun Agro, we take pride in delivering safe, certified, and compliant food products to buyers 
                across Asia, the Middle East, Europe, and Africa. Our dedicated workforce, trained supervisors, 
                and stringent quality checks ensure every container is carefully inspected before shipment — 
                guaranteeing product integrity and customer satisfaction.
              </p>
            </div>
            <div className="content-block">
              <h3>Our Strengths</h3>
              <ul className="content-list">
                <li><span><strong>Certified Quality:</strong> Facilities and processes comply with ISO, FSSAI, Halal, BRC, and Global GAP standards, meeting the most stringent international food safety and quality benchmarks.</span></li>
                <li><span><strong>Global Reach:</strong> Reliable export capabilities with well-managed logistics and shipping operations serving partners worldwide.</span></li>
                <li><span><strong>End-to-End Compliance:</strong> Each shipment undergoes thorough inspection, documentation, and regulatory checks to ensure smooth customs clearance and hassle-free import.</span></li>
              </ul>
              
              <div className="export-stats">
                <div className="stat-item">
                  <h4>20+</h4>
                  <p>Countries Served</p>
                </div>
                <div className="stat-item">
                  <h4>100%</h4>
                  <p>Quality Compliance</p>
                </div>
                <div className="stat-item">
                  <h4>ISO</h4>
                  <p>Certified Facilities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="industries-cta">
        <div className="cta-container">
          <div className="cta-content-wrapper">
            <Copy>
              <h2 className="cta-title">Ready to create<br />something exceptional?</h2>
            </Copy>
            <Copy delay={0.2}>
              <p className="cta-sub">
                Partner with us for premium quality ingredients that set your products apart.
              </p>
              <div className="cta-btn-wrapper">
                <AnimatedButton label="Get in Touch" route="/connect" />
              </div>
            </Copy>
          </div>
        </div>
      </section>

      <ConditionalFooter />
    </div>
  );
};

export default Industries;

"use client";
import "./investor-corner.css";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import Copy from "@/components/Copy/Copy";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { RiArrowRightLine } from "react-icons/ri";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const InvestorCorner = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Animations can be added here
    gsap.from(".investor-hero h1", {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      delay: 0.2
    });

    gsap.from(".investor-hero p", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.4
    });

    gsap.from(".ir-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
            trigger: ".ir-cards",
            start: "top 80%"
        }
    });

  }, { scope: containerRef });

  return (
    <>
      <Nav />
      <div className="page investor-page" ref={containerRef}>
        
        {/* Hero Section */}
        <section className="investor-hero">
          <div className="container">
            <Copy delay={0.1}>
              <h1>Investor Corner</h1>
            </Copy>
            <Copy delay={0.2}>
              <p>
                Comprehensive financial information, governance policies, and shareholder updates for Varun Agro Processing Foods Pvt. Ltd.
              </p>
            </Copy>
          </div>
        </section>

        {/* Investor Relations Section (Requested) */}
        <section className="investor-relations">
          <div className="container">
            <div className="ir-header">
               <Copy delay={0.1}>
                 <h3>INVESTOR RELATIONS</h3>
               </Copy>
               <Copy delay={0.2}>
                 <p className="ir-subtitle">AS A PUBLIC LIMITED COMPANY, WE ARE COMMITTED TO TRANSPARENCY, COMPLIANCE, AND DELIVERING LONG-TERM VALUE TO OUR SHAREHOLDERS.</p>
               </Copy>
            </div>
            
            <div className="ir-links-section">
               <Copy delay={0.3}>
                 <h4>QUICK LINKS / BOXES:</h4>
               </Copy>
               <div className="ir-cards">
                  <div className="ir-card">
                     <span>FINANCIAL REPORTS</span>
                     <div className="ir-card-icon">
                        <RiArrowRightLine />
                     </div>
                  </div>
                  <div className="ir-card">
                     <span>ANNUAL REPORTS</span>
                     <div className="ir-card-icon">
                        <RiArrowRightLine />
                     </div>
                  </div>
                  <div className="ir-card">
                     <span>GOVERNANCE POLICIES</span>
                     <div className="ir-card-icon">
                        <RiArrowRightLine />
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Corporate Governance Section */}
        <section className="investor-governance">
            <div className="container">
                <Copy delay={0.1}>
                    <h3 className="section-title">Corporate Governance</h3>
                </Copy>
                <div className="governance-grid">
                    <div className="governance-item">
                        <h5>Board of Directors</h5>
                        <p>Our experienced leadership ensuring strategic direction.</p>
                    </div>
                    <div className="governance-item">
                        <h5>Audit Committee</h5>
                        <p>Overseeing financial reporting and disclosure.</p>
                    </div>
                    <div className="governance-item">
                        <h5>Nomination & Remuneration</h5>
                        <p>Ensuring fair compensation and leadership succession.</p>
                    </div>
                    <div className="governance-item">
                        <h5>Stakeholder Relationship</h5>
                        <p>Addressing shareholder and investor grievances.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Investor Contact Section */}
        <section className="investor-contact">
            <div className="container">
                <Copy delay={0.1}>
                    <h3 className="section-title">Investor Contacts</h3>
                </Copy>
                <div className="contact-grid">
                    <div className="contact-block">
                        <h5>Company Secretary</h5>
                        <p>cs@varunagrofoods.com</p>
                        <p>+91 (Nashik) 422003</p>
                    </div>
                    <div className="contact-block">
                        <h5>Registrar & Transfer Agent</h5>
                        <p>Bigshare Services Pvt. Ltd.</p>
                        <p>investor@bigshareonline.com</p>
                    </div>
                </div>
            </div>
        </section>

      </div>
      <ConditionalFooter />
    </>
  );
};

export default InvestorCorner;

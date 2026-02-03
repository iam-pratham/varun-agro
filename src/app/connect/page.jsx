"use client";
import "./contact.css";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import Copy from "@/components/Copy/Copy";

const page = () => {
  return (
    <>
      <Nav />
      <div className="page contact">
        <section className="contact-hero">
          <div className="container">
            <div className="contact-col">
              <div className="contact-hero-header">
                <Copy delay={0.85}>
                  <h1>Connect with Varun Agro</h1>
                </Copy>
              </div>
              <div className="contact-copy-year">
                <Copy delay={0.1}>
                  <h1>&copy;25</h1>
                </Copy>
              </div>
            </div>
            <div className="contact-col">
              <div className="contact-info">
                <div className="contact-info-block">
                  <Copy delay={0.85}>
                    <p>General Inquiries</p>
                    <p>contact@varunagrofoods.com</p>
                  </Copy>
                </div>
                <div className="contact-info-block">
                  <Copy delay={1}>
                    <p>Sales & Exports</p>
                    <p>sales@varunagrofoods.com</p>
                    <p>+91 (Nashik) 422003</p>
                  </Copy>
                </div>
                <div className="contact-info-block">
                  <Copy delay={1.15}>
                    <p>Headquarters</p>
                    <p>Gat No-181, Capital Hill,</p>
                    <p>Umrale (B.K.), Nashik-422003</p>
                  </Copy>
                </div>
                <div className="contact-info-block">
                  <Copy delay={1.3}>
                    <p>Follow Us</p>
                    <p>LinkedIn</p>
                    <p>Instagram</p>
                  </Copy>
                </div>
              </div>
              <div className="contact-img">
                <img
                  src="/contact/contact-img.jpg"
                  alt="Terrene studio workspace"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <ConditionalFooter />
    </>
  );
};

export default page;

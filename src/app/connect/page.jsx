"use client";
import "./contact.css";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import Copy from "@/components/Copy/Copy";
import PineappleViewer from "@/components/PineappleViewer/PineappleViewer";

const page = () => {
  return (
    <>
      <Nav />
      <div className="page contact">
        <section className="contact-hero">
          <div className="container">
            <div className="contact-text-side">
              <div className="contact-header">
                <Copy delay={0.5}>
                  <h1>Connect with<br />Varun Agro</h1>
                </Copy>
              </div>
              
              <div className="contact-details-grid">
                <div className="contact-block">
                  <Copy delay={0.7}>
                    <h3>General Inquiries</h3>
                    <p>contact@varunagrofoods.com</p>
                  </Copy>
                </div>
                
                <div className="contact-block">
                  <Copy delay={0.8}>
                    <h3>Sales & Exports</h3>
                    <p>sales@varunagrofoods.com</p>
                    <p>+91 (Nashik) 422003</p>
                  </Copy>
                </div>
                
                <div className="contact-block">
                  <Copy delay={0.9}>
                    <h3>Headquarters</h3>
                    <p>Gat No-181, Capital Hill,</p>
                    <p>Umrale (B.K.), Nashik-422003</p>
                  </Copy>
                </div>
                
                <div className="contact-block">
                  <Copy delay={1.0}>
                    <h3>Follow Us</h3>
                    <div className="social-links">
                      <p>LinkedIn</p>
                      <p>Instagram</p>
                    </div>
                  </Copy>
                </div>
              </div>

              <div className="contact-footer">
                 <Copy delay={1.1}>
                    <h1>&copy; 2026 Varun Agro</h1>
                 </Copy>
              </div>
            </div>

            <div className="contact-visual-side">
              <div className="pineapple-container">
                <PineappleViewer />
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

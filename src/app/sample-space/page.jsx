"use client";
import "./sample-space.css";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import Copy from "@/components/Copy/Copy";

const page = () => {
  return (
    <>
      <Nav />
      <div className="page sample-space">
        <section className="sample-space-hero">
          <div className="sample-space-hero-img">
            <img src="/sample-space/hero.jpg" alt="Arcade Residence Lisbon" />
          </div>
          <div className="sample-space-hero-overlay"></div>
          <div className="container">
            <div className="sample-space-hero-header">
              <Copy delay={1} animateOnScroll={false}>
                <h1>Aseptic Processing</h1>
              </Copy>
            </div>
            <div className="sample-space-content">
              <div className="sample-space-col">
                <Copy delay={1.05} animateOnScroll={false}>
                  <p>Nashik, India</p>
                </Copy>
              </div>
              <div className="sample-space-col">
                <div className="sample-space-content-wrapper">
                  <Copy delay={1.1} animateOnScroll={false}>
                    <p>Process</p>
                  </Copy>
                </div>
                <div className="sample-space-content-wrapper">
                  <Copy delay={1.15} animateOnScroll={false}>
                    <h3>
                      Our aseptic processing line ensures that fruit pulps and concentrates retain their natural flavor, color, and nutritional value without preservatives.
                    </h3>
                    <h3>
                      By sterilizing the product and packaging it in a sterile environment, we guarantee a shelf-stable product that meets global quality standards.
                    </h3>
                  </Copy>
                </div>
                <div className="sample-space-content-wrapper sample-space-meta">
                  <div className="sample-space-hero-row">
                    <div className="sample-space-hero-sub-col">
                      <Copy delay={0.2}>
                        <p>Capacity</p>
                        <p>500 MT/Day</p>
                      </Copy>
                    </div>
                    <div className="sample-space-hero-sub-col">
                      <Copy delay={0.2}>
                        <p>Technology</p>
                        <p>Advanced Aseptic</p>
                        <p>Vacuum Evaporation</p>
                      </Copy>
                    </div>
                  </div>
                </div>
                <div className="sample-space-content-wrapper sample-space-meta">
                  <div className="sample-space-hero-row">
                    <div className="sample-space-hero-sub-col">
                      <Copy delay={0.35}>
                        <p>Key Products</p>
                        <p>Mango Pulp</p>
                        <p>Guava Pulp</p>
                        <p>Tomato Paste</p>
                      </Copy>
                    </div>
                    <div className="sample-space-hero-sub-col">
                      <Copy delay={0.35}>
                        <p>Standards</p>
                        <p>ISO 22000</p>
                        <p>HACCP</p>
                      </Copy>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="sample-space-details sample-space-details-1">
          <div className="container">
            <div className="sample-space-col">
              <Copy delay={0.1}>
                <p>Quality Control</p>
              </Copy>
            </div>
            <div className="sample-space-col">
              <Copy delay={0.1}>
                <h3>
                  At Varun Agro, quality begins at the farm. We work closely with farmers to select the best produce, which is then subjected to rigorous sorting and washing.
                </h3>

                <h3>
                  Our state-of-the-art laboratory tests every batch for physical, chemical, and microbiological parameters, ensuring complete food safety and consistency.
                </h3>
              </Copy>
              <div className="sample-space-details-img">
                <img src="/sample-space/sample-space-1.jpg" alt="" />
              </div>
            </div>
          </div>
        </section>
        <section className="sample-space-details sample-space-details-2">
          <div className="container">
            <div className="sample-space-col">
              <Copy delay={0.1}>
                <p>Sustainability</p>
              </Copy>
            </div>
            <div className="sample-space-col">
              <div className="sample-space-content-wrapper sample-space-meta">
                <div className="sample-space-hero-row">
                  <div className="sample-space-hero-sub-col">
                    <Copy delay={0.1}>
                      <p>Environment</p>
                      <p>Water Recycling</p>
                      <p>Solar Power</p>
                      <p>Zero Waste</p>
                    </Copy>
                  </div>
                  <div className="sample-space-hero-sub-col">
                    <Copy delay={0.1}>
                      <p>Community</p>
                      <p>Farmer Support</p>
                      <p>Local Employment</p>
                      <p>Education</p>
                    </Copy>
                  </div>
                </div>
              </div>
              <div className="sample-space-content-wrapper sample-space-meta">
                <div className="sample-space-hero-row">
                  <div className="sample-space-hero-sub-col">
                    <Copy delay={0.2}>
                      <p>Innovation</p>
                      <p>R&D Lab</p>
                      <p>Process Optimization</p>
                      <p>New Products</p>
                    </Copy>
                  </div>
                  <div className="sample-space-hero-sub-col">
                    <Copy delay={0.2}>
                      <p>Logistics</p>
                      <p>Cold Chain</p>
                      <p>Global Tracking</p>
                      <p>Timely Delivery</p>
                    </Copy>
                  </div>
                </div>
              </div>
              <div className="sample-space-details-img">
                <img
                  src="/sample-space/sample-space-2.jpg"
                  alt="Processing facility"
                />
              </div>
              <Copy delay={0.2}>
                <h3>
                  Our commitment to sustainability extends beyond the factory walls. We empower our farming partners with sustainable agricultural practices, ensuring a better future for the community and the planet.
                </h3>
              </Copy>
            </div>
          </div>
        </section>
        <CTAWindow
          img="/sample-space/next-project.jpg"
          header="Next Step"
          callout="Partner with us"
          description="Experience the quality and reliability of Varun Agro. Contact us for your food processing needs."
        />
      </div>
      <ConditionalFooter />
    </>
  );
};

export default page;

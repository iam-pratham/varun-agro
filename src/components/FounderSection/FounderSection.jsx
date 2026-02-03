import React from "react";
import "./FounderSection.css";
import Copy from "../Copy/Copy";

const FounderSection = () => {
  return (
    <section className="founder-section">
      <div className="container founder-header">
        <Copy delay={0.1}>
          <h1 className="lg">Our Founder</h1>
        </Copy>
      </div>
      
      <div className="container founder-content">
        <div className="founder-card">
          <div className="founder-text">
            <Copy delay={0.2}>
              <p className="founder-intro">
                Varun Agro Established & Guided by Our Visionary Founder <strong>Ms. Manisha Dhatrak</strong>. Her passion for furthering the frontier of sustainability, innovation and quality is what has made us into a dynamic, customer-focused company that plays an important role in feeding Global families.
              </p>
            </Copy>
            
            <Copy delay={0.3}>
              <p>
                As a testament to our success in adopting sustainable practices, look at how far we have come and will continue further on this path. We differentiate by promoting farmer prosperity in a sustainable manner along with unstopped scalablity on the base of creative and ethical operation.
              </p>
            </Copy>
            
            <Copy delay={0.4}>
              <p>
                As we move forward, our goal is to deepen the impact that we have more broadly across communities by fortifying our resilient supply chain and utilizing best-in-class technology solutions to instigate positive change in a way that redefines what companies can achieve.
              </p>
            </Copy>
          </div>

          <div className="founder-signature">
            <Copy delay={0.5}>
              <div className="founder-info">
                <h3>Ms. MANISHA DHATRAK</h3>
                <p className="founder-title">Founder and CEO</p>
              </div>
            </Copy>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;

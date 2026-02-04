"use client";
import "./TeamScroll.css";

import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Copy from "../Copy/Copy";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TeamScroll = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);
  const stepsRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollTriggersRef = useRef([]);

  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 1000);
  };

  useEffect(() => {
    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useGSAP(
    () => {
      if (!stepsRef.current) return;

      const steps = stepsRef.current.querySelectorAll(".team-scroll-step");
      gsap.set(steps, { opacity: 0, x: -40 });

      ScrollTrigger.create({
        trigger: stepsRef.current,
        start: "top 75%",
        once: true,
        animation: gsap.to(steps, {
          opacity: 1,
          x: 0,
          duration: 0.3,
          stagger: -0.1,
          ease: "none",
        }),
      });
    },
    { scope: stepsRef }
  );

  useEffect(() => {
    const container = containerRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;

    if (!container || !header || !cards) return;

    if (!isMobile) {
      const mainTrigger = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        endTrigger: cards,
        end: "bottom bottom",
        pin: header,
        pinSpacing: false,
      });
      scrollTriggersRef.current.push(mainTrigger);

      const cardElements = cards.querySelectorAll(".team-scroll-card");

      cardElements.forEach((card, index) => {
        const cardTrigger = ScrollTrigger.create({
          trigger: card,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveStep(index),
          onEnterBack: () => setActiveStep(index),
          onLeave: () => {
            if (index < cardElements.length - 1) {
              setActiveStep(index + 1);
            }
          },
          onLeaveBack: () => {
            if (index > 0) {
              setActiveStep(index - 1);
            }
          },
        });
        scrollTriggersRef.current.push(cardTrigger);
      });
    } else {
        // Cleanup triggers if switching to mobile
        scrollTriggersRef.current.forEach((trigger) => trigger.kill());
        scrollTriggersRef.current = [];
    }

    return () => {
      scrollTriggersRef.current.forEach((trigger) => trigger.kill());
      scrollTriggersRef.current = [];
    };
  }, [isMobile]);

  const teamMembers = [
    {
      name: "Ms. Manisha Dhatrak",
      role: "Founder & Managing Director",
      description: "With a visionary approach and entrepreneurial spirit, she has guided Varun Agro to become a prominent player in the food processing industry since its inception.",
      image: "/Team/1.webp",
      label: "Founder"
    },
    {
      name: "Mr. Yash Dhatrak",
      role: "Director",
      description: "Instrumental in driving operational excellence and strategic growth initiatives across global markets.",
      image: "/Team/3.webp",
      label: "Director"
    },
    {
      name: "Ms. Sayali Dhatrak",
      role: "Director",
      description: "Leading innovation in product development and ensuring the highest standards of quality assurance.",
      image: "/Team/2.webp",
      label: "Director"
    }
  ];

  return (
    <div className="team-scroll" ref={containerRef}>
      <div className="team-scroll-col team-scroll-header" ref={headerRef}>
        <div className="container">
          <div className="team-scroll-header-content">
            <div className="team-scroll-header-callout">
              <Copy delay={0.1}>
                <p>Leadership</p>
              </Copy>
            </div>
            <Copy delay={0.15}>
              <h3>
                Guided by vision, driven by excellence. Our leadership team embodies the spirit of innovation and integrity.
              </h3>
            </Copy>
            <div className="team-scroll-steps" ref={stepsRef}>
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className={`team-scroll-step ${
                    activeStep === index ? "active" : ""
                  }`}
                  onClick={() => {
                      // Optional: Scroll to card on click
                      const card = cardsRef.current.children[index];
                      if (card) {
                          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                  }}
                >
                  <p className="team-scroll-step-text">{member.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="team-scroll-col team-scroll-cards" ref={cardsRef}>
        {teamMembers.map((member, index) => (
            <div className="team-scroll-card" key={index}>
            <div className="team-scroll-card-img">
                <img src={member.image} alt={member.name} />
            </div>
            <div className="team-scroll-card-copy">
                <div className="team-scroll-card-index-label">
                <h3>{member.name}</h3>
                </div>
                <div className="team-scroll-card-role">
                    {member.role}
                </div>
                <p className="md">
                {member.description}
                </p>
            </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default TeamScroll;

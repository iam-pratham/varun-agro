"use client";
import "./index.css";
import "./preloader.css";
import { useRef, useState, useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomEase from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import AnimatedButton from "@/components/AnimatedButton/AnimatedButton";
import FeaturedProjects from "@/components/FeaturedProjects/FeaturedProjects";
import ClientReviews from "@/components/ClientReviews/ClientReviews";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import Copy from "@/components/Copy/Copy";
import PartnersMarquee from "@/components/PartnersMarquee/PartnersMarquee";
import ThreeDSection from "@/components/ThreeDSection/ThreeDSection";
import FounderSection from "@/components/FounderSection/FounderSection";
import TestimonialsSection from "@/components/TestimonialsSection/TestimonialsSection";

let isInitialLoad = true;
gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

export default function Home() {
  const tagsRef = useRef(null);
  const missionRef = useRef(null);
  const headerRef = useRef(null);
  const [showPreloader, setShowPreloader] = useState(isInitialLoad);
  const [loaderAnimating, setLoaderAnimating] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    return () => {
      isInitialLoad = false;
    };
  }, []);

  useEffect(() => {
    if (lenis) {
      if (loaderAnimating) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
  }, [lenis, loaderAnimating]);

  useGSAP(() => {
    if (!headerRef.current) return;
    gsap.from(headerRef.current, {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top 85%",
        once: true,
      },
    });
  });

  useGSAP(() => {
    const tl = gsap.timeline({
      delay: 0.3,
      defaults: {
        ease: "hop",
      },
    });

    if (showPreloader) {
      setLoaderAnimating(true);
      
      tl.to(
        ".word h1",
        {
          y: "0%",
          duration: 1,
        }
      );

      tl.to(".divider", {
        scaleY: "100%",
        duration: 1,
        onComplete: () =>
          gsap.to(".divider", { opacity: 0, duration: 0.3, delay: 0.3 }),
      });

      tl.to("#word-1 h1", {
        y: "100%",
        duration: 1,
        delay: 0.3,
      });

      tl.to(
        "#word-2 h1",
        {
          y: "-100%",
          duration: 1,
        },
        "<"
      );

      tl.to(
        ".block",
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1,
          stagger: 0.1,
          delay: 0.75,
          onStart: () => {
            gsap.to(".hero-img", { scale: 1, duration: 2, ease: "hop" });
          },
          onComplete: () => {
            gsap.set(".loader", { pointerEvents: "none" });
            setLoaderAnimating(false);
          },
        },
        "<"
      );
    }
  }, [showPreloader]);

  useGSAP(
    () => {
      if (!tagsRef.current) return;

      const tags = tagsRef.current.querySelectorAll(".what-we-do-tag");
      gsap.set(tags, { opacity: 0, x: -40 });

      ScrollTrigger.create({
        trigger: tagsRef.current,
        start: "top 90%",
        once: true,
        animation: gsap.to(tags, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        }),
      });
    },
    { scope: tagsRef }
  );

  useGSAP(() => {
    if (!missionRef.current) return;
    gsap.from(missionRef.current, {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: missionRef.current,
        start: "top 85%",
        once: true,
      },
    });
  });

  return (
    <>
      {showPreloader && (
        <div className="loader">
          <div className="overlay">
            <div className="block"></div>
            <div className="block"></div>
          </div>
          <div className="intro-logo">
            <div className="word" id="word-1">
              <h1>
                <span>Varun</span>
              </h1>
            </div>
            <div className="word" id="word-2">
              <h1>Agro</h1>
            </div>
          </div>
          <div className="divider"></div>
        </div>
      )}
      <Nav />
      <section className="hero">
        <div className="hero-gradient"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-header">
              <Copy animateOnScroll={false} delay={showPreloader ? 4.5 : 0.85}>
                <h1>Leading Indian Food Processing Company</h1>
              </Copy>
            </div>
            <div className="hero-tagline">
              <Copy animateOnScroll={false} delay={showPreloader ? 4.65 : 1}>
                <p>
                  Varun Agro Processing Foods Pvt. Ltd. specialises in manufacturing, supplying, and exporting high-quality food products with a strong focus on sustainability, innovation, and quality.
                </p>
              </Copy>
            </div>
            <AnimatedButton
              label="Our Products"
              route="/studio"
              animateOnScroll={false}
              delay={showPreloader ? 4.8 : 1.15}
            />
          </div>
        </div>
        <div className="hero-stats">
          <div className="container">
            <div className="stat">
              <div className="stat-count">
                <Copy delay={0.1}>
                  <h2>500+</h2>
                </Copy>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-info">
                <Copy delay={0.15}>
                  <p>MT/day Processing Capacity</p>
                </Copy>
              </div>
            </div>
            <div className="stat">
              <div className="stat-count">
                <Copy delay={0.2}>
                  <h2>2010</h2>
                </Copy>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-info">
                <Copy delay={0.25}>
                  <p>Year Founded</p>
                </Copy>
              </div>
            </div>
            <div className="stat">
              <div className="stat-count">
                <Copy delay={0.3}>
                  <h2>ISO</h2>
                </Copy>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-info">
                <Copy delay={0.35}>
                  <p>22000 Certified</p>
                </Copy>
              </div>
            </div>
            <div className="stat">
              <div className="stat-count">
                <Copy delay={0.4}>
                  <h2>10k+</h2>
                </Copy>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-info">
                <Copy delay={0.45}>
                  <p>LinkedIn Followers</p>
                </Copy>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="what-we-do">
        <div className="container">
          <div className="what-we-do-header">
            <h1 ref={headerRef}>
              At Varun Agro, we are committed to sustainability, innovation, and customer focus, delivering premium quality food products with consistency and trust.
            </h1>
          </div>
          <div className="what-we-do-content">
            <div className="what-we-do-col">
              <Copy delay={0.1}>
                <p>Core Values</p>
              </Copy>

              <p className="lg" ref={missionRef}>
                Our mission is driven by responsible agriculture, advanced processing technology, and tailored products. We support local farmers and ecosystems while ensuring excellence in every product we deliver.
              </p>
            </div>
            <div className="what-we-do-col">
              <div className="what-we-do-tags" ref={tagsRef}>
                <div className="what-we-do-tag">
                  <h3>Sustainability</h3>
                </div>
                <div className="what-we-do-tag">
                  <h3>Innovation</h3>
                </div>
                <div className="what-we-do-tag">
                  <h3>Customer Focus</h3>
                </div>
                <div className="what-we-do-tag">
                  <h3>Community Impact</h3>
                </div>
                <div className="what-we-do-tag">
                  <h3>Trust</h3>
                </div>
                <div className="what-we-do-tag">
                  <h3>Excellence</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <PartnersMarquee />
      <section className="featured-projects-container">
        <div className="container featured-projects-header">
          <Copy delay={0.1}>
            <h1 className="lg">Our Products</h1>
          </Copy>
        </div>
        <FeaturedProjects />
      </section>
      <ThreeDSection />
      <FounderSection />
      <TestimonialsSection />
      <CTAWindow
        img="/home/Ultrarealistic_studio_product_2k_20260203114.jpeg"
        header="Varun Agro"
        callout="Excellence, Integrity, Commitment"
        description="Delivering premium quality food products with a commitment to excellence and community growth."
      />
      <ConditionalFooter />
    </>
  );
}

"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Copy from "../Copy/Copy";
import clientReviewsContent from "../ClientReviews/client-reviews-content";
import "./TestimonialsSection.css";

gsap.registerPlugin(ScrollTrigger);

const TestimonialsSection = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;

    // Total duration for one loop (adjust for speed)
    const duration = 50; 
    
    // Create the infinite loop tween
    const tl = gsap.to(track, {
      xPercent: -50, // Move 50% of the width (since we duplicated content once)
      duration: duration,
      ease: "none",
      repeat: -1,
    });

    let scrollTimeout;

    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity());
        const direction = self.direction; // 1 (down) or -1 (up)
        
        if (direction === 0) return;

        // Base speed factor based on velocity
        const velocityFactor = Math.min(velocity / 200, 5); 
        // Always keep positive direction (moving left) but speed up
        const targetScale = 1 + velocityFactor;

        gsap.to(tl, {
            timeScale: targetScale,
            duration: 0.2,
            overwrite: true
        });

        // Debounce returning to normal speed
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            gsap.to(tl, {
                timeScale: 1, 
                duration: 0.5
            });
        }, 100);
      },
    });

  }, { scope: containerRef });

  // Duplicate content enough times to ensure seamless loop
  // We'll create a single long list by concatenating the array 4 times
  const marqueeContent = [...clientReviewsContent, ...clientReviewsContent, ...clientReviewsContent, ...clientReviewsContent];

  return (
    <section className="testimonials-section" ref={containerRef}>
      <div className="container testimonials-header">
        <Copy delay={0.1}>
          <h1 className="lg">Our Customers</h1>
        </Copy>
      </div>
      
      <div className="testimonials-marquee-wrapper">
        <div className="testimonials-track" ref={trackRef}>
          {marqueeContent.map((review, index) => (
            <div 
              className="testimonial-card" 
              key={`${review.id}-${index}`}
            >
              <div className="testimonial-content">
                <p className="testimonial-text">{review.review}</p>
                <div className="testimonial-footer">
                  <div className="testimonial-author">
                    <img src={review.avatar} alt={review.name} className="author-avatar" />
                    <div className="author-info">
                      <h4>{review.name}</h4>
                      <p>{review.title}</p>
                    </div>
                  </div>
                  <div className="quote-icon">❝</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

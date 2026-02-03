"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { useGSAP } from "@gsap/react";
import "./ThreeDSection.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const ThreeDSection = () => {
  const containerRef = useRef(null);
  const modelRef = useRef(null);
  const currentRotationRef = useRef(0);
  const modelSizeRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);

  // Helper to setup model position/rotation
  const setupModel = () => {
    if (!modelRef.current || !modelSizeRef.current || !cameraRef.current) return;

    const isMobile = window.innerWidth < 1000;
    const model = modelRef.current;
    const modelSize = modelSizeRef.current;
    const camera = cameraRef.current;

    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());

    model.position.set(
      -center.x,
      -center.y,
      -center.z
    );

    // Initial rotation
    model.rotation.set(
      THREE.MathUtils.degToRad(10),
      0,
      isMobile ? 0 : THREE.MathUtils.degToRad(-20)
    );

    // Camera position
    const cameraDistance = isMobile ? 2.2 : 1.5;
    camera.position.set(
      0,
      0,
      Math.max(modelSize.x, modelSize.y, modelSize.z) * cameraDistance
    );
    camera.lookAt(0, 0, 0);
  };

  const item1Revealed = useRef(false);
  const item2Revealed = useRef(false);
  const item3Revealed = useRef(false);
  const item4Revealed = useRef(false);

  useGSAP(() => {
    // Split Text Setup
    const header1Text = new SplitType(".td-header-1 h1", { types: "chars", charClass: "char", tagName: "span" });
    const titleSplits = new SplitType(".td-info-item h2", { types: "chars", charClass: "char", tagName: "span" });
    // Description: no split needed for fade/slide
    
    // Header 1 manual span wrap
    document.querySelectorAll(".td-header-1 h1 .char").forEach(char => {
        if (!char.querySelector('span')) {
            char.innerHTML = `<span>${char.innerHTML}</span>`;
        }
    });
    
    // Scramble Effect Helper
    const scrambleText = (containerSelector) => {
        const container = containerRef.current.querySelector(containerSelector);
        if (!container) return;

        // Animate Container Opacity
        gsap.to(container, { opacity: 1, duration: 0.5, ease: "power2.out" });

        // Scramble Headers
        const chars = container.querySelectorAll("h2 .char");
        chars.forEach((char, i) => {
            const originalChar = char.innerText;
            const randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            
            // Initial State
            gsap.set(char, { opacity: 0 });

            const tl = gsap.timeline({ delay: i * 0.03 });
            
            tl.to(char, {
                opacity: 1,
                duration: 0.05
            });

            tl.to(char, {
                duration: 0.4,
                onUpdate: function() {
                    const progress = this.progress();
                    if (progress < 1) {
                        char.innerText = randomChars[Math.floor(Math.random() * randomChars.length)];
                    }
                },
                onComplete: () => {
                    char.innerText = originalChar;
                }
            });
        });

        // Fade in Description
        const desc = container.querySelector("p");
        if (desc) {
            gsap.fromTo(desc, 
                { opacity: 0, y: 10 }, 
                { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power2.out" }
            );
        }
    };

    const resetText = (containerSelector) => {
        const container = containerRef.current.querySelector(containerSelector);
        if (!container) return;
        gsap.to(container, { opacity: 0, duration: 0.3 });
    };

    // Initial Reveal of Header 1
    ScrollTrigger.create({
      trigger: ".td-product-overview",
      start: "75% bottom",
      onEnter: () =>
        gsap.to(".td-header-1 h1 .char > span", {
          y: "0%",
          duration: 1,
          ease: "power3.out",
          stagger: 0.025,
        }),
      onLeaveBack: () =>
        gsap.to(".td-header-1 h1 .char > span", {
          y: "100%",
          duration: 1,
          ease: "power3.out",
          stagger: 0.025,
        }),
    });

    // Main Pinned Animation
    ScrollTrigger.create({
      trigger: ".td-product-overview",
      start: "center center",
      end: `+=${window.innerHeight * 6.5}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: ({ progress }) => {
        // Header 1 Logic
        const headerProgress = Math.max(0, Math.min(1, progress / 0.40));
        gsap.to(".td-header-1", {
          xPercent: progress > 0.40 ? -100 : -100 * headerProgress,
          overwrite: "auto",
        });

        // Mask Logic
            const maskSize =
              progress < 0.1
                ? 0
                : progress > 0.25
                  ? 100
                  : 100 * ((progress - 0.1) / 0.15);
            gsap.to(".td-circular-mask", {
              clipPath: `circle(${maskSize}% at 50% 50%)`,
              autoAlpha: progress > 0.1 ? 1 : 0,
              overwrite: "auto",
            });

        // Header 2 Logic
        const header2Progress = (progress - 0.20) / 0.40;
        const header2XPercent =
          progress < 0.20
            ? 100
            : progress > 0.60
              ? -200
              : 100 - 300 * header2Progress;
        gsap.to(".td-header-2", { xPercent: header2XPercent, overwrite: "auto" });
        
        // Header 3 Logic
        const header3Progress = (progress - 0.40) / 0.40;
        const header3XPercent =
          progress < 0.40
            ? 100
            : progress > 0.80
              ? -200
              : 100 - 300 * header3Progress;
        gsap.to(".td-header-3", { xPercent: header3XPercent, overwrite: "auto" });

        // Header 4 Logic
        const header4Progress = (progress - 0.60) / 0.40;
        const header4XPercent =
          progress < 0.60
            ? 100
            : progress > 1.0
              ? -200
              : 100 - 300 * header4Progress;
        gsap.to(".td-header-4", { xPercent: header4XPercent, overwrite: "auto" });
        
        // Tooltip Divider Logic (Removed)
        
        // Info Items Reveal Logic (Scramble)
        // Item 1 (Top Left)
        if (progress > 0.25 && !item1Revealed.current) {
            item1Revealed.current = true;
            scrambleText(".td-info-items-top .td-info-item:nth-child(1)");
        } else if (progress < 0.2 && item1Revealed.current) {
            item1Revealed.current = false;
            resetText(".td-info-items-top .td-info-item:nth-child(1)");
        }

        // Item 2 (Top Right)
        if (progress > 0.35 && !item2Revealed.current) {
            item2Revealed.current = true;
            scrambleText(".td-info-items-top .td-info-item:nth-child(2)");
        } else if (progress < 0.3 && item2Revealed.current) {
            item2Revealed.current = false;
            resetText(".td-info-items-top .td-info-item:nth-child(2)");
        }

        // Item 3 (Bottom Left)
        if (progress > 0.45 && !item3Revealed.current) {
            item3Revealed.current = true;
            scrambleText(".td-info-items-bottom .td-info-item:nth-child(1)");
        } else if (progress < 0.4 && item3Revealed.current) {
            item3Revealed.current = false;
            resetText(".td-info-items-bottom .td-info-item:nth-child(1)");
        }

        // Item 4 (Bottom Right)
        if (progress > 0.55 && !item4Revealed.current) {
            item4Revealed.current = true;
            scrambleText(".td-info-items-bottom .td-info-item:nth-child(2)");
        } else if (progress < 0.5 && item4Revealed.current) {
            item4Revealed.current = false;
            resetText(".td-info-items-bottom .td-info-item:nth-child(2)");
        }

        // 3D Model Rotation Logic
        if (modelRef.current) {
          const rotationProgress = progress;
          const targetRotation = Math.PI * 3 * 4 * rotationProgress;
          const rotationDiff = targetRotation - currentRotationRef.current;
          
          if (Math.abs(rotationDiff) > 0.001) {
            modelRef.current.rotateOnAxis(new THREE.Vector3(0, 1, 0), rotationDiff);
            currentRotationRef.current = targetRotation;
          }
        }
      },
    });

    return () => {
        if (header1Text) header1Text.revert();
        if (titleSplits) titleSplits.revert();
    };
  }, { scope: containerRef });

  useEffect(() => {
    // Three.js Init
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Get container dimensions
    const modelContainer = containerRef.current.querySelector(".td-product-overview");
    const width = modelContainer ? modelContainer.clientWidth : window.innerWidth;
    const height = modelContainer ? modelContainer.clientHeight : window.innerHeight;

    const camera = new THREE.PerspectiveCamera(
      60,
      width / height,
      0.1,
      1000
    );
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.toneMappingExposure = 1.0;
    
    // Append to container
    const domContainer = containerRef.current.querySelector(".td-model-container");
    if (domContainer) {
        domContainer.innerHTML = ''; // Clear previous
        domContainer.appendChild(renderer.domElement);
    }

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 2.0));

    const mainLight = new THREE.DirectionalLight(0xffffff, 3.0);
    mainLight.position.set(1, 2, 3);
    mainLight.castShadow = true;
    mainLight.shadow.bias = -0.001;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 2.0);
    fillLight.position.set(-2, 0, -2);
    scene.add(fillLight);

    // Load Model
    new GLTFLoader().load("/3D/tomato.glb?v=3", (gltf) => {
      const model = gltf.scene;
      modelRef.current = model;

      model.traverse((node) => {
        if (node.isMesh && node.material) {
          Object.assign(node.material, {
            metalness: 0.0,
            roughness: 0.2,
          });
        }
      });

      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      modelSizeRef.current = size;

      scene.add(model);
      setupModel();
    });

    // Animation Loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
        if (!camera || !renderer) return;
        
        const newContainer = containerRef.current.querySelector(".td-product-overview");
        const newWidth = newContainer ? newContainer.clientWidth : window.innerWidth;
        const newHeight = newContainer ? newContainer.clientHeight : window.innerHeight;

        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
        setupModel();
    };
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animationId);
        if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <div className="td-section-wrapper" ref={containerRef}>
        <section className="td-product-overview">
            <div className="td-header-1">
                <h1>Commitment to</h1>
            </div>
            <div className="td-header-2">
                <h1>Excellence</h1>
            </div>
            <div className="td-header-3">
                <h1>Innovation</h1>
            </div>
            <div className="td-header-4">
                <h1>Growth</h1>
            </div>

            <div className="td-circular-mask"></div>

            <div className="td-info-items-top">
                <div className="td-info-item">
                    <h2>Global Vision</h2>
                    <p>
                        Expanding horizons with innovative agricultural solutions
                        for a connected world.
                    </p>
                </div>
                <div className="td-info-item">
                    <h2>Community First</h2>
                    <p>
                        Empowering local farmers through fair trade and
                        continuous support systems.
                    </p>
                </div>
            </div>

            <div className="td-info-items-bottom">
                <div className="td-info-item">
                    <h2>Premium Quality</h2>
                    <p>
                        Sourced from the finest farms, ensuring top-tier nutrition and
                        taste in every product we process.
                    </p>
                </div>
                <div className="td-info-item">
                    <h2>Sustainable</h2>
                    <p>
                        Committed to eco-friendly practices and supporting local agriculture
                        for a greener, healthier future.
                    </p>
                </div>
            </div>

            <div className="td-model-container"></div>
        </section>
    </div>
  );
};

export default ThreeDSection;

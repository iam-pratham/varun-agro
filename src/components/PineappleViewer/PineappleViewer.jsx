"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const PineappleViewer = () => {
  const containerRef = useRef(null);
  const modelRef = useRef(null);
  const groupRef = useRef(null);
  const rendererRef = useRef(null);
  const animationFrameId = useRef(null);
  const cameraRef = useRef(null);
  const modelSizeRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    let isMounted = true;

    // --- SCENE SETUP ---
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Transparent background
    rendererRef.current = renderer;

    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(renderer.domElement);

    // --- LIGHTS ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(2, 2, 5);
    scene.add(dirLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 1.0);
    backLight.position.set(-2, -2, -5);
    scene.add(backLight);

    // --- SETUP MODEL FUNCTION ---
    const setupModel = () => {
        if (!modelRef.current || !modelSizeRef.current || !cameraRef.current || !groupRef.current) return;
        
        const isMobile = width < 768; // Simple check
        const group = groupRef.current;
        const modelSize = modelSizeRef.current;
        const camera = cameraRef.current;

        // Apply static tilt to the GROUP (the axis holder)
        // This ensures the model rotates around this tilted axis
        group.rotation.set(0.1, 0, -0.6);
        
        // Reset position for the new layout
        group.position.x = 0;
        group.position.y = 0; 

        // Calculate camera distance to fit
        // Adjusted for the new split layout
        const cameraDistance = 1.8; 
        const maxDim = Math.max(modelSize.x, modelSize.y, modelSize.z);
        
        camera.position.set(0, 0, maxDim * cameraDistance);
        camera.lookAt(0, 0, 0);
    };

    // --- MODEL LOAD ---
    const loader = new GLTFLoader();
    loader.load(
      "/3D/pineapple.glb",
      (gltf) => {
        if (!isMounted) return; // Prevent adding to a dead scene
        const model = gltf.scene.clone();
        modelRef.current = model;

        // Center the model geometry
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        modelSizeRef.current = size;
        model.position.sub(center); 

        // Create a group to hold the model
        // Group handles the TILT, Model handles the ROTATION
        const group = new THREE.Group();
        group.add(model);
        scene.add(group);
        groupRef.current = group;
        
        setupModel();
      },
      undefined,
      (error) => {
        console.error("Error loading pineapple model:", error);
      }
    );

    // --- ANIMATION ---
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);

      if (modelRef.current) {
        // Rotate the model around its own Y axis
        // Since the parent group is tilted, this looks like spinning on a tilted axis
        modelRef.current.rotation.y += 0.015; 
      }

      renderer.render(scene, camera);
    };
    animate();

    // --- RESIZE ---
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };
    window.addEventListener("resize", handleResize);

    // --- CLEANUP ---
    return () => {
      isMounted = false; // Prevent async callbacks from acting
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      // Clear references to prevent stale state in next render cycle
      modelRef.current = null;
      groupRef.current = null;
      cameraRef.current = null;
      rendererRef.current = null;
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: "100%", 
        height: "100%", 
        minHeight: "300px",
        position: "relative" 
      }} 
    />
  );
};

export default PineappleViewer;

// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-unused-vars
import QRCode from 'qrcode.react';
import type React from 'react';
import { useRef, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as THREE from 'three';

const HeroSection: React.FC = () => {
  const threeContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!threeContainer.current) return;

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    threeContainer.current.appendChild(renderer.domElement);

    // Create a QR code texture
    const qrTexture = new THREE.TextureLoader().load(
      'https://online-qrcode-generator.com/images/qr-code-51.webp'
    );
    const qrMaterial = new THREE.MeshBasicMaterial({ map: qrTexture });
    const qrGeometry = new THREE.PlaneGeometry(5, 5);
    const qrCode = new THREE.Mesh(qrGeometry, qrMaterial);
    scene.add(qrCode);

    // Position the camera
    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      qrCode.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    // eslint-disable-next-line consistent-return
    return () => {
      scene.remove(qrCode);
      renderer.dispose();
    };
  }, []);

  return <div ref={threeContainer} />;
};

export default HeroSection;

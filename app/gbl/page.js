'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function GLBViewer() {
    const containerRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();


        const camera = new THREE.PerspectiveCamera(
            75,
            containerRef.current.clientWidth / containerRef.current.clientHeight,
            0.1,
            1000
        );

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        containerRef.current.appendChild(renderer.domElement);

        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 7.5;

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 1); // from 0.6 → 1

        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2); // from 0.8 → 1.2

        directionalLight.position.set(5, 10, 7.5);
        scene.add(directionalLight);

        // OrbitControls — full freedom
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.enableZoom = true;
        controls.enablePan = false; // optional: prevent model from sliding out of view
        controls.rotateSpeed = 0.7;

        // Load model
        const loader = new GLTFLoader();
        loader.load('/model.glb', (gltf) => {
            const model = gltf.scene;

            // Scale and center
            model.scale.set(20, 20, 20);
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center);

            // Force light gray material on all meshes
            // model.traverse((child) => {
            //     if (child.isMesh) {
            //         child.material = new THREE.MeshStandardMaterial({ color: 0xd1d5db }); // Tailwind gray-300
            //     }
            // });

            scene.add(model);
        }, undefined, (error) => {
            console.error(error);
        });

        camera.position.set(2.0, 1.5, 4); // better initial angle

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            renderer.dispose();
            containerRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <>



            <div ref={containerRef} className="relative w-screen h-screen bg-gray-700">
                {/* Overlayed text near the model */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center">
                    <h1 className="text-2xl font-bold text-gray-100">GM Bauzz!</h1>
                </div>
            </div>
        </>
    )

}

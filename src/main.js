import "./style.css";
import "flowbite";

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

//code js pour les element three.js

gsap.registerPlugin(ScrollTrigger);

let camera;

const scene = new THREE.Scene();

const sun = new THREE.DirectionalLight("#ffd0a3", 3);

sun.position.set(15, 20, 10);

sun.castShadow = true;

sun.shadow.mapSize.width = 2048;
sun.shadow.mapSize.height = 2048;

sun.shadow.camera.left = -50;
sun.shadow.camera.right = 50;
sun.shadow.camera.top = 50;
sun.shadow.camera.bottom = -50;

sun.shadow.camera.near = 0.1;
sun.shadow.camera.far = 100;

sun.shadow.bias = -0.0005;

scene.add(sun);

const fillingLigth = new THREE.DirectionalLight("#7189b8", 0.8);

fillingLigth.position.set(-15, 8, -10);

scene.add(fillingLigth);

const canvas = document.querySelector("#three-canvas");

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true,
});

renderer.setClearColor(0x000000, 0);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const loader = new GLTFLoader();

loader.load(
  "/models/Projet_TP3.glb",

  (gltf) => {
    const model = gltf.scene;

    model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.name === "Mball127") {
          const geometry = child.geometry;

          // S'assure qu'on a de bonnes normales
          geometry.computeVertexNormals();

          const normals = geometry.attributes.normal;
          const colors = [];

          const lightColor = new THREE.Color("#f3dfc8");
          const shadowColor = new THREE.Color("#020a67");

          for (let i = 0; i < normals.count; i++) {
            // Direction de la normale
            const nx = normals.getX(i);
            const ny = normals.getY(i);
            const nz = normals.getZ(i);

            // Faux éclairage venant du haut / gauche
            const fakeLight = new THREE.Vector3(15, 20, 10).normalize();

            const normal = new THREE.Vector3(nx, ny, nz);

            // 0 = zone sombre
            // 1 = zone claire
            let brightness = normal.dot(fakeLight);

            brightness = THREE.MathUtils.clamp(brightness * 0.5 + 0.5, 0, 1);

            // On garde volontairement le contraste assez subtil
            brightness = 0.75 + brightness * 0.75;

            const color = shadowColor.clone().lerp(lightColor, brightness);

            colors.push(color.r, color.g, color.b);
          }

          geometry.setAttribute(
            "color",
            new THREE.Float32BufferAttribute(colors, 3),
          );

          child.material = new THREE.MeshBasicMaterial({
            color: "#d6edfd",
            vertexColors: true,
            toneMapped: false,
          });

          child.castShadow = false;
          child.receiveShadow = true;
        }
      }
    });

    camera = gltf.cameras.find((cam) => cam.name === "Camera");
    const cam2 = gltf.cameras.find((cam) => cam.name === "Camera001");
    const cam3 = gltf.cameras.find((cam) => cam.name === "Camera002");

    const pos1 = new THREE.Vector3();
    const pos2 = new THREE.Vector3();
    const pos3 = new THREE.Vector3();

    const rot1 = new THREE.Quaternion();
    const rot2 = new THREE.Quaternion();
    const rot3 = new THREE.Quaternion();

    camera.getWorldPosition(pos1);
    cam2.getWorldPosition(pos2);
    cam3.getWorldPosition(pos3);

    camera.getWorldQuaternion(rot1);
    cam2.getWorldQuaternion(rot2);
    cam3.getWorldQuaternion(rot3);

    ScrollTrigger.create({
      trigger: "#section2",
      start: "top 80%",

      onEnter: () => {
        // POSITION
        gsap.to(camera.position, {
          x: pos2.x,
          y: pos2.y,
          z: pos2.z,
          duration: 1.5,
          ease: "power2.inOut",
          overwrite: true,
        });

        // ROTATION
        gsap.to(camera.quaternion, {
          x: rot2.x,
          y: rot2.y,
          z: rot2.z,
          w: rot2.w,
          duration: 1.5,
          ease: "power2.inOut",
          overwrite: true,
          onUpdate: () => {
            camera.quaternion.normalize();
          },
        });
        gsap.to(canvas, {
          filter: "blur(12px)",
          duration: 1.5,
          ease: "power2.inOut",
          overwrite: true,
        });
      },
    });

    ScrollTrigger.create({
      trigger: "#sectionHero",
      start: "bottom 95%",

      onEnterBack: () => {
        gsap.to(camera.position, {
          x: pos1.x,
          y: pos1.y,
          z: pos1.z,
          duration: 1.5,
          ease: "power2.inOut",
          overwrite: true,
        });

        gsap.to(camera.quaternion, {
          x: rot1.x,
          y: rot1.y,
          z: rot1.z,
          w: rot1.w,
          duration: 1.5,
          ease: "power2.inOut",
          overwrite: true,
          onUpdate: () => {
            camera.quaternion.normalize();
          },
        });
        gsap.to(canvas, {
          filter: "blur(0px)",
          duration: 1.5,
          ease: "power2.inOut",
          overwrite: true,
        });
      },
    });

    ScrollTrigger.create({
      trigger: "#section3",
      start: "top 80%",

      // DESCENTE : section2 → section3
      onEnter: () => {
        gsap.to(camera.position, {
          x: pos3.x,
          y: pos3.y,
          z: pos3.z,
          duration: 1.5,
          ease: "power2.inOut",
          overwrite: true,
        });

        gsap.to(camera.quaternion, {
          x: rot3.x,
          y: rot3.y,
          z: rot3.z,
          w: rot3.w,
          duration: 1.5,
          ease: "power2.inOut",
          overwrite: true,
        });
      },

      // REMONTÉE : section3 → section2
      onLeaveBack: () => {
        gsap.to(camera.position, {
          x: pos2.x,
          y: pos2.y,
          z: pos2.z,
          duration: 1.5,
          ease: "power2.inOut",
          overwrite: true,
        });

        gsap.to(camera.quaternion, {
          x: rot2.x,
          y: rot2.y,
          z: rot2.z,
          w: rot2.w,
          duration: 1.5,
          ease: "power2.inOut",
          overwrite: true,
        });
      },
    });

    camera.filmOffset = -15;
    camera.zoom = 0.85;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    scene.add(model);
    console.log("Modèle chargé :", model);
  },

  undefined,

  (error) => {
    console.error("Erreur lors du chargement :", error);
  },
);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  if (camera) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }

  ScrollTrigger.refresh();
});

function animate() {
  if (camera) {
    renderer.render(scene, camera);
  }
}

renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;

renderer.setAnimationLoop(animate);

import "./style.css";
import "flowbite";

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const canvas = document.querySelector("#three-canvas");

if (canvas) {
  let camera = null;

  let heroDesktopPosition = null;
  let heroTabletPosition = null;
  let heroSmallPosition = null;
  let heroMobilePosition = null;

  let currentSection = "hero";

  const scene = new THREE.Scene();

  const canvas = document.querySelector("#three-canvas");

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

  const fillingLight = new THREE.DirectionalLight("#7189b8", 0.8);

  fillingLight.position.set(-15, 8, -10);

  scene.add(fillingLight);

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

  renderer.outputColorSpace = THREE.SRGBColorSpace;

  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  renderer.toneMappingExposure = 1;

  function updateResponsiveCamera() {
    if (!camera) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    if (width <= 500) {
      camera.zoom = 0.32;
      camera.filmOffset = 0;
    } else if (width < 768) {
      camera.zoom = 0.46;
      camera.filmOffset = 0;
    } else if (width <= 1050) {
      camera.zoom = 0.62;
      camera.filmOffset = -5;
    } else if (width <= 1400) {
      camera.zoom = 0.75;
      camera.filmOffset = -5;
    } else if (height <= 800) {
      camera.zoom = 0.78;
      camera.filmOffset = -10;
    } else {
      camera.zoom = 0.85;
      camera.filmOffset = -15;
    }

    camera.aspect = width / height;

    camera.updateProjectionMatrix();
  }

  function getHeroPosition() {
    if (!heroDesktopPosition) {
      return null;
    }

    const width = window.innerWidth;

    if (width <= 500 && heroMobilePosition) {
      return heroMobilePosition;
    }

    if (width < 768 && heroSmallPosition) {
      return heroSmallPosition;
    }

    if (width <= 1050 && heroTabletPosition) {
      return heroTabletPosition;
    }

    return heroDesktopPosition;
  }

  const loader = new GLTFLoader();

  const modelPath = `${import.meta.env.BASE_URL}models/Projet_TP3.glb`;

  loader.load(
    modelPath,

    (gltf) => {
      const model = gltf.scene;

      model.traverse((child) => {
        if (!child.isMesh) return;

        child.castShadow = true;
        child.receiveShadow = true;

        if (child.name === "Mball127") {
          const geometry = child.geometry;

          geometry.computeVertexNormals();

          const normals = geometry.attributes.normal;

          const colors = [];

          const lightColor = new THREE.Color("#f3dfc8");

          const shadowColor = new THREE.Color("#020a67");

          const fakeLight = new THREE.Vector3(15, 20, 10).normalize();

          for (let i = 0; i < normals.count; i++) {
            const nx = normals.getX(i);

            const ny = normals.getY(i);

            const nz = normals.getZ(i);

            const normal = new THREE.Vector3(nx, ny, nz);

            let brightness = normal.dot(fakeLight);

            brightness = THREE.MathUtils.clamp(brightness * 0.5 + 0.5, 0, 1);

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
      });

      camera = gltf.cameras.find((cam) => cam.name === "Camera");

      const cam2 = gltf.cameras.find((cam) => cam.name === "Camera001");

      const cam3 = gltf.cameras.find((cam) => cam.name === "Camera002");

      if (!camera || !cam2 || !cam3) {
        console.error("Une ou plusieurs caméras Blender sont introuvables.");

        return;
      }

      const pos1 = new THREE.Vector3();

      const pos2 = new THREE.Vector3();

      const pos3 = new THREE.Vector3();

      camera.getWorldPosition(pos1);
      cam2.getWorldPosition(pos2);
      cam3.getWorldPosition(pos3);

      heroDesktopPosition = pos1.clone();

      heroTabletPosition = pos1.clone();

      heroTabletPosition.y += 1.5;

      heroSmallPosition = pos1.clone();

      heroSmallPosition.y += 3.5;

      heroMobilePosition = pos1.clone();

      heroMobilePosition.y += 4.5;

      const rot1 = new THREE.Quaternion();

      const rot2 = new THREE.Quaternion();

      const rot3 = new THREE.Quaternion();

      camera.getWorldQuaternion(rot1);
      cam2.getWorldQuaternion(rot2);
      cam3.getWorldQuaternion(rot3);

      updateResponsiveCamera();

      const initialHeroPosition = getHeroPosition();

      if (initialHeroPosition) {
        camera.position.copy(initialHeroPosition);
      }

      ScrollTrigger.create({
        trigger: "#section2",

        start: "top 80%",

        onEnter: () => {
          currentSection = "section2";

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
          currentSection = "hero";

          const heroPosition = getHeroPosition();

          if (!heroPosition) {
            return;
          }

          gsap.to(camera.position, {
            x: heroPosition.x,
            y: heroPosition.y,
            z: heroPosition.z,

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

        onEnter: () => {
          currentSection = "section3";

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

            onUpdate: () => {
              camera.quaternion.normalize();
            },
          });
        },

        onLeaveBack: () => {
          currentSection = "section2";

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

            onUpdate: () => {
              camera.quaternion.normalize();
            },
          });
        },
      });

      scene.add(model);

      ScrollTrigger.refresh();

      console.log("Modèle chargé :", model);

      console.log("Responsive Three.js :", {
        width: window.innerWidth,

        height: window.innerHeight,

        zoom: camera.zoom,

        filmOffset: camera.filmOffset,
      });
    },

    undefined,

    (error) => {
      console.error("Erreur lors du chargement :", error);
    },
  );

  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    updateResponsiveCamera();

    if (camera && currentSection === "hero") {
      const heroPosition = getHeroPosition();

      if (heroPosition) {
        camera.position.copy(heroPosition);
      }
    }

    ScrollTrigger.refresh();
  });

  function animate() {
    if (camera) {
      renderer.render(scene, camera);
    }
  }

  renderer.setAnimationLoop(animate);
}

window.addEventListener("load", () => {
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);
});

const travelModal = document.querySelector("#travel-help-modal");
const travelModalButton = document.querySelector(
  '[data-modal-toggle="travel-help-modal"]',
);

if (travelModal && travelModalButton) {
  const closeButtons = travelModal.querySelectorAll(
    '[data-modal-hide="travel-help-modal"]',
  );

  closeButtons.forEach((button) => {
    button.addEventListener(
      "click",
      () => {
        button.blur();
        travelModalButton.focus();
      },
      true,
    );
  });
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register(`${import.meta.env.BASE_URL}service-worker.js`, {
        scope: import.meta.env.BASE_URL,
      })
      .then((registration) => {
        console.log("Service Worker enregistré :", registration);
      })
      .catch((error) => {
        console.error("Erreur Service Worker :", error);
      });
  });
}

import { useEffect, useRef, useState } from "react";
import { useLoading } from "../../context/LoadingProvider";
import { handleMouseMove, handleTouchEnd, handleHeadRotation, handleTouchMove, } from "./utils/mouseUtils";
import { setProgress } from "../Loading";

import * as THREE from "three";

import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import handleResize from "./utils/resizeUtils";
import setAnimations from "./utils/animationUtils";
import { GLTFLoader } from "three-stdlib";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  const [character, setChar] = useState<THREE.Object3D | null>(null);

  const createShirtTexture = (): THREE.CanvasTexture | null => {
    const canvas = document.createElement("canvas");

    canvas.width = 512;
    canvas.height = 512;

    const ctx = canvas.getContext("2d");

    if (!ctx) return null;

    const stripeWidth = 64;

    for (let x = 0; x < canvas.width; x += stripeWidth) {
      ctx.fillStyle =
        Math.floor(x / stripeWidth) % 2 === 0
          ? "#551e1e"
          : "#c2c2c2";

      ctx.fillRect(x, 0, stripeWidth, canvas.height);
    }

    const texture = new THREE.CanvasTexture(canvas);

    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    texture.colorSpace = THREE.SRGBColorSpace;

    return texture;
  };

  const loadAccessory = (path: string) => {
    return new Promise<THREE.Object3D>((resolve, reject) => {
      const loader = new GLTFLoader();

      loader.load(
        path,
        (gltf) => resolve(gltf.scene),
        undefined,
        (error) => reject(error)
      );
    });
  };

  const addAccessory = (
    character: THREE.Object3D,
    accessory: THREE.Object3D,
    boneName: string,
    position = new THREE.Vector3(),
    rotation = new THREE.Euler(),
    scale = new THREE.Vector3(1, 1, 1)
  ) => {
    const bone = character.getObjectByName(boneName);

    if (!bone) {
      console.warn(`No se encontró el hueso: ${boneName}`);
      return;
    }

    accessory.position.copy(position);
    accessory.rotation.copy(rotation);
    accessory.scale.copy(scale);

    bone.add(accessory);
  };

  const loadHair = async (character: THREE.Object3D) => {
    const hair = await loadAccessory("/models/head.glb");

    const head = character.getObjectByName("spine006");

    if (!head) {
      console.warn("No se encontró spine006");
      return;
    }

    head.add(hair);

    hair.position.set(.05, .5, -.86);
    hair.rotation.set(.1, 5, 0);

    hair.scale.set(1.6, 1.3, 1.4);
  };


  useEffect(() => {
    if (canvasDiv.current) {
      let rect = canvasDiv.current.getBoundingClientRect();
      let container = { width: rect.width, height: rect.height };
      const aspect = container.width / container.height;
      const scene = sceneRef.current;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });

      renderer.setSize(container.width, container.height);
      renderer.setPixelRatio(window.devicePixelRatio);

      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      
      canvasDiv.current.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);

      camera.position.z = 10;
      camera.position.set(0, 13.1, 24.7);
      camera.zoom = 1.1;
      camera.updateProjectionMatrix();

      let headBone: THREE.Object3D | null = null;
      let screenLight: any | null = null;
      let mixer: THREE.AnimationMixer;

      const clock = new THREE.Clock();

      const light = setLighting(scene);

      let progress = setProgress((value) => setLoading(value));
      
      const { loadCharacter } = setCharacter(renderer, scene, camera);

      loadCharacter().then(async (gltf: any) => {
        if (gltf) {
          const animations = setAnimations(gltf);

          hoverDivRef.current && animations.hover(gltf, hoverDivRef.current);

          mixer = animations.mixer;

          const character = gltf.scene;

          // const originalhair = character.getObjectByName("hair");
          // const originalhead = character.getObjectByName("Plane007");
          // const originalears = character.getObjectByName("Ear001");
          // const originaleyes = character.getObjectByName("EYEs001");
          // const originaleyeb = character.getObjectByName("Eyebrow");
          // const originalneck = character.getObjectByName("Neck");

          // if (originalhair) originalhair.visible = false;
          // if (originalhead) originalhead.visible = false;
          // if (originalears) originalears.visible = false;
          // if (originaleyes) originaleyes.visible = false;
          // if (originaleyeb) originaleyeb.visible = false;
          // if (originalneck) originalneck.visible = false;

          character.traverse((child: any) => {
            if (!child.isMesh) return;

            switch (child.name.toLowerCase()) {
              case "shoe":
              case "eyes001":
              case "plane":
                child.material = child.material.clone();
                child.material.color.set("#fff");
                break;
                
              case "pant":
              case "sole":
                child.material = child.material.clone();
                child.material.color.set("#524b4b");
                break;

              case "plane002":
              case "plane003":
                child.material = child.material.clone();
                child.material.color.set("#000");
                break;

              case "hand":
              case "neck":
              case "ear001":
              case "plane007":
                child.material = child.material.clone();
                child.material.color.set("#a78269");
                break;

              case "cube002":
                child.material = child.material.clone();
                child.material.color.set("#a06c48");
                break;

              case "hair":
              case "eyebrow":
                child.material = child.material.clone();
                child.material.color.set("#200d03");
                break;

              case "bodyshirt": {
                child.material = child.material.clone();

                const shirtTexture = createShirtTexture();

                if (shirtTexture) {
                  child.material.map = shirtTexture;
                  child.material.color.set("#fff");
                  child.material.needsUpdate = true;
                }

                break;
              }
            }
          });

          setChar(character);
          scene.add(character);

          // await loadHair(character);

          headBone = character.getObjectByName("spine006") || null;

          screenLight = character.getObjectByName("screenlight") || null;

          progress.loaded().then(() => {
            setTimeout(() => {
              light.turnOnLights();
              animations.startIntro();
            }, 2500);
          });

          window.addEventListener("resize", () =>
            handleResize(
              renderer,
              camera,
              canvasDiv,
              character
            )
          );
        }
      });

      let mouse = { x: 0, y: 0 },
        interpolation = { x: 0.1, y: 0.2 };

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };
      let debounce: number | undefined;
      const onTouchStart = (event: TouchEvent) => {
        const element = event.target as HTMLElement;
        debounce = setTimeout(() => {
          element?.addEventListener("touchmove", (e: TouchEvent) =>
            handleTouchMove(e, (x, y) => (mouse = { x, y }))
          );
        }, 200);
      };

      const onTouchEnd = () => {
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
      };

      document.addEventListener("mousemove", (event) => {
        onMouseMove(event);
      });
      const landingDiv = document.getElementById("landingDiv");
      if (landingDiv) {
        landingDiv.addEventListener("touchstart", onTouchStart);
        landingDiv.addEventListener("touchend", onTouchEnd);
      }
      
      const animate = () => {
        requestAnimationFrame(animate);
        if (headBone) {
          handleHeadRotation(
            headBone,
            mouse.x,
            mouse.y,
            interpolation.x,
            interpolation.y,
            THREE.MathUtils.lerp
          );
          light.setPointLight(screenLight);
        }
        const delta = clock.getDelta();
        if (mixer) {
          mixer.update(delta);
        }
        renderer.render(scene, camera);
      };
      animate();
      
      return () => {
        clearTimeout(debounce);
        scene.clear();
        renderer.dispose();
        window.removeEventListener("resize", () =>
          handleResize(renderer, camera, canvasDiv, character!)
        );
        if (canvasDiv.current) {
          canvasDiv.current.removeChild(renderer.domElement);
        }
        if (landingDiv) {
          document.removeEventListener("mousemove", onMouseMove);
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchend", onTouchEnd);
        }
      };
    }
  }, []);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
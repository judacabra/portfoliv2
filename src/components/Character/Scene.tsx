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
  const { setLoading } = useLoading();
  
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());

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
          ? "#9bb2ee"
          : "#c2c2c2";

      ctx.fillRect(x, 0, stripeWidth, canvas.height);
    }

    const texture = new THREE.CanvasTexture(canvas);

    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    texture.colorSpace = THREE.SRGBColorSpace;

    return texture;
  };

  const loadAccessory = (path: string): Promise<THREE.Object3D> => {
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

  const addAccessory = async (
    character: THREE.Object3D,
    accessoryPath: string,
    position = new THREE.Vector3(),
    rotation = new THREE.Euler(),
    scale = new THREE.Vector3(1, 1, 1)
  ): Promise<void> => {
    const bone = character.getObjectByName("spine006");

    if (!bone) {
      console.warn(`No se encontró el hueso: ${"spine006"}`);
      return;
    }

    const accessory: THREE.Object3D = await loadAccessory(accessoryPath);

    accessory.position.copy(position);
    accessory.rotation.copy(rotation);
    accessory.scale.copy(scale);

    bone.add(accessory);
  };

  const removeChilds = (character: THREE.Object3D, childs: string[]): void => {
    childs.forEach(child => {
      const exist = character.getObjectByName(child);

      if (exist) exist.visible = false;
    });
  };

  useEffect(() => {
    if (canvasDiv.current) {
      let rect: DOMRect = canvasDiv.current.getBoundingClientRect();
      let container: any = { 
        width: rect.width, 
        height: rect.height,
      };

      const aspect: number = container.width / container.height;
      const scene: THREE.Scene = sceneRef.current;

      const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });

      renderer.setSize(container.width, container.height);
      renderer.setPixelRatio(window.devicePixelRatio);

      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      
      canvasDiv.current.appendChild(renderer.domElement);

      const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);

      camera.position.z = 10;
      camera.position.set(0, 13.1, 24.7);
      camera.zoom = 1.1;
      camera.updateProjectionMatrix();

      let headBone: THREE.Object3D | null = null;
      let screenLight: any | null = null;
      let mixer: THREE.AnimationMixer;

      const clock: THREE.Clock = new THREE.Clock();

      const light: any = setLighting(scene);

      let progress: any = setProgress((value) => setLoading(value));
      
      const { loadCharacter } = setCharacter(renderer, scene, camera);

      loadCharacter().then(async (gltf: any) => {
        if (gltf) {
          const animations = setAnimations(gltf);

          hoverDivRef.current && animations.hover(gltf, hoverDivRef.current);

          mixer = animations.mixer;

          const character = gltf.scene;

          removeChilds(character, ["Ear001",]);

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

          await addAccessory(
            character, 
            "/models/glass.glb", 
            new THREE.Vector3(0, 1.25, .4), 
            new THREE.Euler(0,0,0), 
            new THREE.Vector3(1,1,1)
          );

          await addAccessory(
            character, 
            "/models/airpodsmax.glb", 
            new THREE.Vector3(0, 1.7, .2),
            new THREE.Euler(0, 0, 0),
            new THREE.Vector3(1.85, 1.25, 1.2),
          );

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
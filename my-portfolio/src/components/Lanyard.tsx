/* eslint-disable react/no-unknown-property */
import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  RigidBodyProps
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

extend({ MeshLineGeometry, MeshLineMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any;
      meshLineMaterial: any;
    }
  }
}

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  resetSignal?: number;
}

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  resetSignal
}: LanyardProps) {
  const [viewportWidth, setViewportWidth] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );
  const isMobile = viewportWidth < 768;
  const isTablet = viewportWidth >= 768 && viewportWidth < 1024;
  const isCompact = viewportWidth < 1024;

  useEffect(() => {
    const handleResize = (): void => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const canvasSize = isMobile ? Math.min(820, Math.round(viewportWidth * 1.28)) : isTablet ? 820 : 1000;

  return (
    <div className="relative z-0 w-full h-[450px] sm:h-[470px] md:h-[430px] lg:h-[450px] flex justify-end items-start pt-0" style={{ overflow: 'visible' }}>
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isCompact ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
        style={{
          position: 'absolute',
          right: isMobile ? '50%' : 0,
          top: 0,
          width: `${canvasSize}px`,
          height: `${canvasSize}px`,
          overflow: 'visible',
          transform: isMobile ? 'translateX(50%)' : 'none'
        }}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isCompact ? 1 / 30 : 1 / 60}>
          <Band isMobile={isMobile} isTablet={isTablet} resetSignal={resetSignal} />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
  isTablet?: boolean;
  resetSignal?: number;
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false, isTablet = false, resetSignal }: BandProps) {
  const isCompact = isMobile || isTablet;
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps: any = {
    type: 'dynamic' as RigidBodyProps['type'],
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4
  };

  const { nodes, materials } = useGLTF('/card3.glb') as any;
  const texture = useTexture('/lanyard.png');
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 0.8]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 0.8]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 0.8]);
  const cardJointAnchor: [number, number, number] = [0, 1.45, 0];
  const groupPosition: [number, number, number] = isMobile ? [0.45, 4.15, 0] : isTablet ? [1.55, 3.75, 0] : [2.125, 4, 0];
  const bandPosition: [number, number, number] = isMobile ? [0, 0, 0] : [0, 0, 0];
  const cardScale = isMobile ? 1.9 : isTablet ? 1.95 : 2.25;
  const cardPosition: [number, number, number] = isMobile ? [0, -0.8, -0.05] : isTablet ? [0, -0.86, -0.05] : [0, -1.2, -0.05];

  useSphericalJoint(j3, card, [
    [0, 0, 0],
    cardJointAnchor
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => {
        document.body.style.cursor = 'auto';
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && typeof dragged !== 'boolean') {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z
      });
    }
    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  // Reset/drop effect when the lanyard enters view
  useEffect(() => {
    if (resetSignal === undefined) return;
    const raiseBy = 2.5;
    const shiftLeft = -3;
    const bodies = [j1, j2, j3, card];
    bodies.forEach(ref => {
      const rb = ref.current;
      if (!rb) return;
      const t = rb.translation();
      rb.setTranslation({ x: t.x + shiftLeft, y: t.y + raiseBy, z: t.z }, true);
      rb.setLinvel({ x: 0, y: 0, z: 0 }, true);
      rb.setAngvel({ x: 0, y: 0, z: 0 }, true);
      rb.wakeUp();
    });
    fixed.current?.wakeUp();
  }, [resetSignal]);

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={groupPosition}>
        <RigidBody ref={fixed} {...segmentProps} type={'fixed' as RigidBodyProps['type']} />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps} type={'dynamic' as RigidBodyProps['type']}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps} type={'dynamic' as RigidBodyProps['type']}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps} type={'dynamic' as RigidBodyProps['type']}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? ('kinematicPosition' as RigidBodyProps['type']) : ('dynamic' as RigidBodyProps['type'])}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={cardScale}
            position={cardPosition}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => {
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e: any) => {
              e.target.setPointerCapture(e.pointerId);
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={materials.base.map}
                map-anisotropy={16}
                clearcoat={isCompact ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band} position={bandPosition}>
        {/* @ts-ignore */}
        <meshLineGeometry />
        {/* @ts-ignore */}
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isCompact ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}

import React from 'react';

import {MeshReflectorMaterial, useTexture} from '@react-three/drei'
import {RepeatWrapping, LinearEncoding, TextureLoader, Vector2} from 'three'
import {useFrame, useLoader} from '@react-three/fiber'

export const Ground = () => {

    // const roughness = useTexture('/textures/terrain-roughness.jpeg')
    // const normal = useTexture('/textures/terrain-normal.jpeg')

    const [roughness, normal] = useLoader(TextureLoader, [
        '/textures/terrain-roughness.jpeg',
        '/textures/terrain-normal.jpeg'
    ])


    React.useEffect(() => {
        [normal, roughness].forEach(t => {
            t.wrapT = RepeatWrapping
            t.wrapS = RepeatWrapping
            t.repeat.set(5, 5)
        })

        normal.encoding = LinearEncoding
    }, [roughness, normal])

    useFrame((state) => {
        const t = state.clock.getElapsedTime() * -0.128
        roughness.offset.set(0, t)
        normal.offset.set(0, t)
    })

    return (
        <mesh
            rotation-x={-Math.PI * 0.5}
            castShadow={true}
            receiveShadow={true}
        >
            <planeGeometry args={[35, 35]}/>
            <MeshReflectorMaterial
                envMapIntensity={0}
                dithering={true}
                color={[0.015, 0.015, 0.015]}
                roughness={0.7}
                blur={[1000, 400]}
                mixBlur={30}
                mixStrength={80}
                mixContrast={1}
                resolution={1024}
                mirror={0}
                depthScale={0.01}
                minDepthThreshold={0.9}
                maxDepthThreshold={1}
                depthToBlurRatioBias={0.25}
                reflectorOffset={0.2}
                normalMap={normal}
                normalScale={new Vector2(0.15, 0.15)}
                roughnessMap={roughness}
            />
        </mesh>
    );
};
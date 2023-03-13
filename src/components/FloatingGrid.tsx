import React, {useEffect} from 'react';
import {useLoader, useFrame} from '@react-three/fiber'
import {RepeatWrapping, TextureLoader} from 'three'

export const FloatingGrid = () => {

    const texture = useLoader(TextureLoader, '/textures/grid-texture.png')

    useEffect(() => {
        texture.wrapS = RepeatWrapping
        texture.wrapT = RepeatWrapping
        texture.anisotropy = 4
        texture.repeat.set(35, 35)
        texture.offset.set(0, 0)
    }, [texture])

    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime() * -0.68
        texture.offset.set(0, t)
    })

    return (
        <>
            <mesh
                rotation-x={Math.PI * -0.5}
                position={[0, 0.425, 0]}
            >
                <planeGeometry args={[35, 35]}/>
                <meshBasicMaterial
                    color={[1, 1, 1]}
                    opacity={0.15}
                    map={texture}
                    alphaMap={texture}
                    transparent={true}
                />
            </mesh>
        </>
    );
};
import React from 'react';

import {Color, Mesh} from 'three'
import {useFrame} from '@react-three/fiber'

export const Rings = () => {

    const ringsRef = React.useRef<Mesh[]>([])

    useFrame((state) => {
        const elapsedTime = state.clock.getElapsedTime()

        for (let i = 0; i < ringsRef.current.length; i++) {
            const mesh = ringsRef.current[i]

            const z = (i - 7) * 3.5 + ((elapsedTime * 0.4) % 3.5) * 2
            mesh.position.set(0, 0, -z)

            const dist = Math.abs(z)
            mesh.scale.set(1 - dist * 0.04, 1- dist * 0.04, 1 - dist * 0.04)

            let colorScale = 1

            if(dist > 2) {
                colorScale = 1 - (Math.min(dist, 12) - 2) / 10
            }

            colorScale *= 0.5

            if(i % 2 === 0) {
                // @ts-ignore
                mesh.material.emissive = new Color(6, 0.15, 0.7).multiplyScalar(colorScale)
            } else {
                // @ts-ignore
                mesh.material.emissive = new Color(0.1, 0.7, 3).multiplyScalar(colorScale)
            }
        }
    })

    return (
        <>
            {
                [...Array(14)].map((_, index) => (
                    <mesh
                        castShadow={true}
                        receiveShadow={true}
                        key={index}
                        position={[0, 0, 0]}
                        ref={(el) => {
                            if (el) ringsRef.current[index] = el
                        }}>
                        <torusGeometry args={[3.35, 0.05, 16, 100]}/>
                        <meshStandardMaterial emissive={[0.5, 0.5, 0.5]} color={[0, 0, 0]}/>
                    </mesh>
                ))
            }
        </>
    );
};
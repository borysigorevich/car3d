import React, {useRef, useState} from 'react';
import {Mesh, Vector3, Color} from "three";

import {useFrame} from '@react-three/fiber'

export const Box = ({color}: { color: Color }) => {
    const ref = useRef<Mesh | null>(null)
    const time = useRef(0)
    const [xRotSpeed] = useState(() => Math.random())
    const [yRotSpeed] = useState(() => Math.random())
    const [scale] = useState(() => Math.pow(Math.random(), 2.0) * 0.5 + 0.5)
    const [position, setPosition] = useState<Vector3>(() => {
        const v = new Vector3((Math.random() * 2 - 1) * 3, Math.random() * 2 + 0.1, (Math.random() * 2 - 1) * 19)
        if (v.x < 0) v.x -= 1.75
        if (v.x > 0) v.x += 1.75
        return v
    })

    const resetPosition = () => {
        const v = new Vector3((Math.random() * 2 - 1) * 3, Math.random() * 2 + 0.1, (Math.random() * 2 - 1) * 15)
        if (v.x < 0) v.x -= 1.75
        if (v.x > 0) v.x += 1.75
        setPosition(v)
    }

    useFrame((state, delta) => {
        time.current += delta * 1.2
        const newZ = position.z - time.current
        if(newZ < -15) {
            resetPosition()
            time.current = 0
        }

        if (position) ref.current!.position.set(position.x, position.y, position.z)
        if (ref.current) {
            ref.current.rotation.x += delta * xRotSpeed
            ref.current.rotation.y += delta * yRotSpeed
        }
    })

    return (
        <mesh
            ref={ref}
            scale={scale}
            castShadow={true}
        >
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color={color} envMapIntensity={0.15}/>
        </mesh>
    );
};

export const Boxes = () => {
    return <>
        {
            [...Array(50)].map((_, index) => {
                return (
                    <Box
                        key={index}
                        color={index % 2 === 0 ? new Color(0.4, 0.1, 0.1) : new Color(0.05, 0.15, 0.4)}
                    />
                )
            })
        }
    </>
}

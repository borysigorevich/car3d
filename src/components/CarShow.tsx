import React from 'react';

import {useFrame} from '@react-three/fiber'
import {OrbitControls, PerspectiveCamera, useGLTF} from '@react-three/drei'
import {Mesh} from "three";

const CarShow = () => {

    const car = useGLTF('/models/car/scene.gltf')

    React.useEffect(() => {
        car.scene.traverse((object) => {
            if(object instanceof Mesh) {
                object.castShadow = true
                object.receiveShadow = true
                object.material.mapIntensity = 20
            }
        })
    }, [car])

    useFrame((state) => {
        const elapsedTime = state.clock.elapsedTime

        const group = car.scene.children[0].children[0].children[0]

        group.children[0].rotation.x = elapsedTime * 2
        group.children[2].rotation.x = elapsedTime * 2
        group.children[4].rotation.x = elapsedTime * 2
        group.children[6].rotation.x = elapsedTime * 2
    })

    return (
        <>
            {/*<spotLight*/}
            {/*    color={[1, 0.25, 0.7]}*/}
            {/*    intensity={1.5}*/}
            {/*    angle={0.6}*/}
            {/*    penumbra={0.5}*/}
            {/*    position={[5, 5, 0]}*/}
            {/*    castShadow*/}
            {/*    shadow-bias={-0.0001}*/}
            {/*/>*/}
            {/*<spotLight*/}
            {/*    color={[0.14, 0.5, 1]}*/}
            {/*    intensity={2}*/}
            {/*    angle={0.6}*/}
            {/*    penumbra={0.5}*/}
            {/*    position={[-5, 5, 0]}*/}
            {/*    castShadow*/}
            {/*    shadow-bias={-0.0001}*/}
            {/*/>*/}

            {/*<mesh>*/}
            {/*    <boxGeometry/>*/}
            {/*    <meshNormalMaterial/>*/}
            {/*</mesh>*/}

            <primitive
                object={car.scene}
                scale={[0.005, 0.005, 0.005]}
                position={[0, -0.035, 0]}
            />

        </>
    );
};

export default CarShow;
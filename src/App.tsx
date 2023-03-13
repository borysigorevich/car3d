import React, {Suspense} from 'react'

import {Canvas} from '@react-three/fiber'
import {CubeCamera, Environment, OrbitControls, PerspectiveCamera} from '@react-three/drei'
import {Bloom, ChromaticAberration, EffectComposer, DepthOfField} from '@react-three/postprocessing'
import {BlendFunction} from 'postprocessing'
import CarShow from "./components/CarShow";
import {Ground} from "./components/Ground";
import {Rings} from "./components/Rings";
import {Boxes} from "./components/Box";
import {FloatingGrid} from "./components/FloatingGrid";

function App() {

    function isValid(s: string): boolean {

        const open = {
            curly: 0,
            parentheses: 0,
            square: 0
        }

        const close = {
            curly: 0,
            parentheses: 0,
            square: 0
        }

        for(let i = 0; i < s.length; i++) {
            const currentLetter = s[i]
            const nextLetter = s[i + 1]
            //     if(s[i] === '(') open.curly++
            //     else if()

            if(currentLetter === '(') {
                if(['}',']'].includes(nextLetter)) return false
                open.parentheses++
            } else if(currentLetter === '[') {
                if(['}',')'].includes(nextLetter)) {
                    console.log('if')
                    return false
                }
                open.square++
            } else if(currentLetter === '{') {
                if(['}',')'].includes(nextLetter)) return false
                open.curly++
            } else if(currentLetter === ']') {
                close.square++
            } else if(currentLetter === ')') {
                close.parentheses++
            } else if(currentLetter === '}') {
                close.curly++
            }


        }
        return (open.curly === close.curly && open.square === close.square && open.parentheses === close.parentheses)
    }

    isValid('([)]')

    return (
        <div className="h-full">
            <Suspense fallback={null}>
                <Canvas shadows>

                    <OrbitControls
                        target={[0, 0.35, 0]}
                        maxPolarAngle={1.45}
                    />

                    <PerspectiveCamera
                        makeDefault
                        fov={50}
                        position={[3, 2, 5]}
                    />

                    <spotLight
                        castShadow={true}
                        color={[1, 0.25, 0.7]}
                        intensity={1.5}
                        angle={0.6}
                        penumbra={0.5}
                        position={[5, 5, 0]}
                        shadow-bias={-0.0001}
                    />

                    <spotLight
                        castShadow={true}
                        color={[0.14, 0.5, 1]}
                        intensity={2}
                        angle={0.6}
                        penumbra={0.5}
                        position={[-5, 5, 0]}
                        shadow-bias={-0.0001}
                    />

                    <CubeCamera resolution={256} frames={Infinity}>
                        {/*@ts-ignore*/}
                        {(texture) => (
                            <>
                                <Environment map={texture}/>
                                <CarShow/>
                            </>
                        )}
                    </CubeCamera>
                    <Ground/>
                    <Rings/>
                    <Boxes/>
                    <FloatingGrid/>

                    {/*<EffectComposer>*/}
                    {/*    <DepthOfField focusDistance={0.0035} focalLength={0.01} bokehScale={3} height={480}/>*/}
                    {/*    <Bloom*/}
                    {/*        blendFunction={BlendFunction.ADD}*/}
                    {/*        intensity={1.3}*/}
                    {/*        width={300}*/}
                    {/*        height={300}*/}
                    {/*        kernelSize={5}*/}
                    {/*        luminanceThreshold={0.15}*/}
                    {/*        luminanceSmoothing={0.025}*/}
                    {/*    />*/}
                    {/*    <ChromaticAberration*/}
                    {/*        blendFunction={BlendFunction.NORMAL}*/}
                    {/*        offset={[0.0005, 0.0012]}*/}
                    {/*    />*/}
                    {/*</EffectComposer>*/}

                    <color args={[0, 0, 0]} attach='background'/>
                </Canvas>
            </Suspense>
        </div>
    )
}

export default App

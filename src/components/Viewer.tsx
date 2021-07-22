import { motion } from "framer-motion"
import React from "react"
import ReactPlayer from "react-player"
import styled from "styled-components"

const PlayerComponent = styled(motion.div)`
    z-index: 100;
    width: calc(100vw - 56rem);
    max-height: 100vh;
    overflow-y: scroll;

    display: flex;
    justify-content: center;
    /* background: #000; */
    /* width: 60rem; */
`

const Viewer = ({ fileData, mime }: { fileData: any; mime: string }) => {
    let Component

    if (mime.includes("video")) {
        Component = () => (
            <ReactPlayer
                width="100%"
                height="100%"
                url={fileData.signFileUrl}
                controls={true}
            />
        )
    } else if (mime.includes("image")) {
        Component = () => <img src={fileData.signFileUrl} alt="" />
    } else {
        Component = () => <p>Error loading media.</p>
    }

    return (
        <div>
            <PlayerComponent
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <Component />
            </PlayerComponent>
        </div>
    )
}

export default Viewer

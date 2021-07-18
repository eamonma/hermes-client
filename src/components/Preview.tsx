import { gql, useMutation, useQuery } from "@apollo/client"
// import "./vimestyles.css"
// import { DefaultUi, Player, Ui, usePlayerContext, Video } from "@vime/react"
import { motion } from "framer-motion"
import React, { Fragment, useContext } from "react"
import { useParams } from "react-router"
import styled from "styled-components"
import { AppContext } from "../AppContext"
import ProjectLayout from "./ProjectLayout"
import ReactPlayer from "react-player"

const ProjectContainerComponent = styled.div<{ children: any }>`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
`

const ProjectLayoutPreview = styled(ProjectLayout)<{
    location: any
    previewing: boolean
}>`
    position: relative;
    left: 2rem;
    /* padding: 2rem; */
    background-color: red;
`

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

interface Parameters {
    id: string
    fileId: string
}

const Preview = ({ location }: { location: any }) => {
    const [passphrase, setPassphrase] = useContext(AppContext).passphrase
    const { id, fileId } = useParams<Parameters>()
    // const [url, setUrl] = useState<string>("")

    const [signFileUrl, { data }] = useMutation(gql`
        mutation signFileUrl($id: String!, $passphrase: String) {
            signFileUrl(
                id: $id
                clientRequesting: true
                passphrase: $passphrase
            )
        }
    `)

    const query = gql`
        query File($id: String!, $passphrase: String!) {
            getFile(id: $id, passphrase: $passphrase, clientRequesting: true) {
                mime
            }
        }
    `

    signFileUrl({
        variables: {
            id: fileId,
            passphrase,
        },
    })

    const {
        loading,
        data: fileData,
        error,
    } = useQuery(query, {
        variables: {
            id: fileId,
            passphrase,
        },
    })

    let mime: string = ""

    if (fileData && data) {
        mime = fileData.getFile.mime
        console.log(fileData)
    }

    return (
        <div>
            <ProjectContainerComponent>
                <ProjectLayoutPreview previewing={true} location={location} />
                <PlayerComponent
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {data && fileData && mime && mime.includes("video") ? (
                        <ReactPlayer
                            width="100%"
                            height="100%"
                            url={data.signFileUrl}
                            controls={true}
                        />
                    ) : mime.includes("image") ? (
                        <img src={data.signFileUrl} alt="" />
                    ) : (
                        // <iframe
                        //     src={data.signFileUrl}
                        //     title={data.signFileUrl}
                        // ></iframe>

                        <p>ss</p>
                    )}
                </PlayerComponent>
            </ProjectContainerComponent>
        </div>
    )
}

export default Preview

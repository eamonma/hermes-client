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
import Viewer from "./Viewer"
import ClipLoader from "react-spinners/ClipLoader"

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

interface Parameters {
    id: string
    fileId: string
}

const Preview = ({ location }: { location: any }) => {
    const [passphrase, setPassphrase] = useContext(AppContext).passphrase
    const { id, fileId } = useParams<Parameters>()
    // const [url, setUrl] = useState<string>("")

    const [
        signFileUrl,
        { data: fileData, loading: fileLoading, error: fileError },
    ] = useMutation(gql`
        mutation signFileUrl($id: String!, $passphrase: String) {
            signFileUrl(
                id: $id
                clientRequesting: true
                passphrase: $passphrase
            )
        }
    `)

    const { loading, data, error } = useQuery(
        gql`
            query File($id: String!, $passphrase: String!) {
                getFile(
                    id: $id
                    passphrase: $passphrase
                    clientRequesting: true
                ) {
                    mime
                }
            }
        `,
        {
            variables: {
                id: fileId,
                passphrase,
            },
        }
    )

    signFileUrl({
        variables: {
            id: fileId,
            passphrase,
        },
    })

    return (
        <div>
            <ProjectContainerComponent>
                <ProjectLayoutPreview previewing={true} location={location} />
                {(fileLoading || loading || !data || !fileData) &&
                !error &&
                !fileError ? (
                    <ClipLoader color="#eee" />
                ) : (
                    <Viewer fileData={fileData} mime={data.getFile.mime} />
                )}
                {(error || fileError) && <p>Error loading media.</p>}
            </ProjectContainerComponent>
        </div>
    )
}

export default Preview

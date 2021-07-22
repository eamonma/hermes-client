import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import FileListItem from "./FileListItem"
import { motion } from "framer-motion"

const ProjectFileList = styled(motion.div)<{ previewing: boolean }>`
    /* width: ${(props: any) => (props.previewing ? "40rem" : "50rem")}; */
    width: 50rem;
    max-width: 100%;
    z-index: 1;
    height: auto;

    display: flex;
    flex-direction: column;

    align-items: stretch;

    background-color: #1a1a1a;
    padding: 4rem 3rem;

    @media (max-width: 800px) {
        padding: 3rem 2rem;
    }

    box-shadow: 1px 1px 14px -7px rgba(0, 0, 0, 0.8);
    /* border-radius: 1rem; */
`

const FilesTitle = styled.h1<{ previewing: boolean }>`
    margin: 0.8rem auto 3rem auto;
    /* font-size: ${(props: any) =>
        props.previewing ? "2.8rem" : "3.4rem"}; */
    font-size: 3.4rem;
    line-height: 4rem;

    width: 100%;
    text-align: center;
`

const AllButton = styled(Link)`
    align-self: flex-end;
`

const FilesTableHeading = styled.div`
    font-size: 1.1rem;
    text-transform: uppercase;

    display: grid;
    grid-template-columns: auto auto;

    padding: 0 1.3rem;

    font-weight: 600;
    color: #bbb;
`

const Project = ({
    project,
    previewing = false,
}: {
    project: any
    previewing?: boolean
}) => {
    return (
        <ProjectFileList layoutId={project.shortId} previewing={previewing}>
            <FilesTitle previewing={previewing}>
                {project.name} for{" "}
                <span
                    style={{
                        color: "#f09605",
                    }}
                >
                    {project.client}
                </span>
            </FilesTitle>
            <FilesTableHeading>
                <div>file name</div>
                {/* <div style={{ textAlign: "right" }}>size</div> */}
                <div
                    style={{
                        display: "block",
                        textAlign: "right",
                    }}
                >
                    <span style={{ marginRight: "1rem" }}>view</span>
                    <span>download</span>
                </div>
            </FilesTableHeading>
            {project.files.map((file: any) => {
                return (
                    <FileListItem
                        key={file.id}
                        previewing={previewing}
                        file={file}
                        shortId={project.shortId}
                    />
                )
            })}
            {/* <AllButton to="#">Download all</AllButton> */}
        </ProjectFileList>
    )
}

export default Project

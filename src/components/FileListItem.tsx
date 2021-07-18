import React, { useContext } from "react"
import styled from "styled-components"
import { Button, Link as ButtonLink } from "./Button"
import { Link, NavLink } from "react-router-dom"
import { ClipLoader } from "react-spinners"

import prettyBytes from "pretty-bytes"

import {
    FaCloudDownloadAlt,
    FaFileVideo,
    FaFileImage,
    FaFile,
    FaFileAudio,
} from "react-icons/fa"

import { HiDownload } from "react-icons/hi"
import { AiFillEye } from "react-icons/ai"
import { gql, useMutation } from "@apollo/client"
import { AppContext } from "../AppContext"

const Item = styled.div`
    /* margin: 1rem 0; */
    padding: 0.5rem;
    border-bottom: 0.5px solid rgba(255, 255, 255, 0.1);

    display: grid;
    grid-template-columns: auto 1fr;

    /* grid-template-columns: 1fr 1fr; */
    width: 100%;
    /* justify-content: space-between; */

    /* align-items: center; */
    /* align-content: space-between; */

    &:last-of-type {
        border: none;
        margin-bottom: 0rem;
    }

    color: #bbb;
`

const FileSize = styled.div`
    margin-left: 1rem;
    font-size: 1.3rem;
    line-height: 1.3rem;
    font-weight: 400;
    align-self: auto;
    color: #bbb;

    &::before {
        content: "(";
    }

    &::after {
        content: ")";
    }

    @media (max-width: 400px) {
        display: none;
    }
`

const FileName = styled(NavLink)`
    color: inherit;
    font-weight: 500;
    padding: 0.8rem;
    display: flex;
    align-items: baseline;
    position: relative;
    &,
    & span,
    & div {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    margin-right: 1rem;
    @media (max-width: 800px) {
        margin-right: 0.2rem;
    }

    &.active {
        color: #f09605;

        /* &::before {
            content: "️️";
            position: absolute;
            left: -1rem;
        } */
    }
`

const FileLinks = styled.div`
    display: flex;
    color: inherit;
`

const Action = styled(Link)`
    color: #ddd;
    padding: 1rem;
    margin: 0 1.1rem;
    font-size: 2.4rem;
    line-height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 100%;

    position: relative;

    transition: all 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);

    @media (hover: hover) {
        &:hover {
            /* color: hsla(195.8282208588957, 100%, 41.960784313725487%, 0.8);
            text-decoration: underline; */

            background: #eee;
            color: #333;
        }
    }
`

const FileListItem = ({
    file,
    shortId,
    previewing,
}: {
    file: any
    shortId: string
    previewing: boolean
}) => {
    const [passphrase, setPassphrase] = useContext(AppContext).passphrase
    const [signFileUrl] = useMutation(gql`
        mutation signFileUrl($id: String!, $passphrase: String) {
            signFileUrl(
                id: $id
                clientRequesting: true
                passphrase: $passphrase
            )
        }
    `)
    let fileIcon = <FaFile />
    if (file.mime.includes("image")) fileIcon = <FaFileImage />
    if (file.mime.includes("video")) fileIcon = <FaFileVideo />
    if (file.mime.includes("audio")) fileIcon = <FaFileAudio />

    return (
        <Item>
            <FileName activeClassName="active" to={`/${shortId}/${file.id}`}>
                <div>
                    <span
                        style={{
                            position: "relative",
                            top: "0.15rem",
                            marginRight: "0.8rem",
                        }}
                    >
                        {fileIcon}
                    </span>
                    {file.name}
                </div>
                <FileSize>
                    {prettyBytes(file.size).replace(/ /g, "\u00a0")}
                </FileSize>
            </FileName>
            {/* <div style={{ textAlign: "right", color: "#ccc" }}>
                {new Date(file.updatedAt).toDateString()}
            </div> */}

            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                }}
            >
                <FileLinks>
                    <Action to={`/${shortId}/${file.id}`}>
                        <AiFillEye />
                    </Action>
                    <Action
                        style={{
                            margin: "auto 2rem auto 0.2rem",
                        }}
                        to={`/${shortId}/${file.id}`}
                        onClick={async (e) => {
                            e.preventDefault()
                            const url = await signFileUrl({
                                variables: {
                                    id: file.id,
                                    passphrase,
                                },
                            })
                            window.location.href = url.data.signFileUrl
                        }}
                    >
                        <HiDownload />
                        {/* <ClipLoader  color="#eee" loading={true} /> */}
                    </Action>
                </FileLinks>
                {/* <DownloadButton>
                    <DownloadIcon>
                        <FaCloudDownloadAlt />
                        Preview
                    </DownloadIcon>
                </DownloadButton> */}
            </div>
        </Item>
    )
}

export default FileListItem

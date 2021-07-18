import { gql, useQuery } from "@apollo/client"
import { Location } from "history"
import React, { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { AppContext } from "../AppContext"
import Project from "./Project"

const query = gql`
    query Project($shortId: String!, $passphrase: String!) {
        getProject(
            shortId: $shortId
            passphrase: $passphrase
            clientRequesting: true
        ) {
            name
            id
            shortId
            client
            files {
                id
                updatedAt
                name
                mime
                size
                key
            }
        }
    }
`

interface Parameters {
    id: string
}

const ProjectLayout = ({
    location,
    previewing = false,
}: {
    location: Location
    previewing: boolean
}) => {
    const { id } = useParams<Parameters>()
    const [contextPassphrase, setPassphrase] = useContext(AppContext).passphrase

    const params = new URLSearchParams(location.search)

    let passphrase = params.get("p")

    useEffect(() => {
        if (passphrase)
            localStorage.setItem("client", JSON.stringify({ id, passphrase }))
    }, [passphrase, id])

    if (!passphrase) {
        try {
            const client = JSON.parse(localStorage.getItem("client") as string)
            if (client.id === id) passphrase = client.passphrase
        } catch (e) {}
    }

    if (!passphrase) {
        passphrase = contextPassphrase
    }

    const { data, loading, error } = useQuery(query, {
        variables: {
            shortId: id,
            passphrase,
        },
    })

    if (error) console.log(error)

    return data ? (
        <Project previewing={previewing} project={data.getProject} />
    ) : (
        <div>?</div>
    )
}
export default ProjectLayout

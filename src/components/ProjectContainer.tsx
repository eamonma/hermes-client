import React from "react"
import styled from "styled-components"
const ProjectContainerComponent = styled.div<{ children: any }>`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ProjectContainer = (props: any) => {
    return (
        <ProjectContainerComponent>{props.children}</ProjectContainerComponent>
    )
}

export default ProjectContainer

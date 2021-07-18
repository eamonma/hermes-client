import styled from "styled-components"

const HomeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
`

const ProjectTitle = styled.h1`
    font-size: 4.7rem;
    line-height: 4.7rem;
    padding: 0;
    margin: 0;
    font-family: "Crimson Text", serif;
`

const A = styled.a`
    &,
    &:active,
    &:visited {
        color: rgba(0, 120, 163, 0.8);
        font-weight: 600;
        transition: color 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
    @media (hover: hover) {
        &:hover {
            color: rgba(0, 120, 163, 1);
        }
    }
`

const P = styled.p`
    padding: 1.6rem;
    text-align: center;
`

export default function Home() {
    return (
        <HomeWrapper>
            <ProjectTitle>Hermes</ProjectTitle>
            <P>
                This is Starlide's instance of Hermes.{" "}
                <A href="https://github.com/eamonma/hermes">
                    Learn more about this platform
                </A>{" "}
                or <A href="https://starlide.com">go to Starlide</A>.
            </P>
        </HomeWrapper>
    )
}

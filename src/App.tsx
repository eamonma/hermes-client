import {
    ApolloClient,
    ApolloLink,
    ApolloProvider,
    createHttpLink,
    InMemoryCache,
} from "@apollo/client"
import { AnimateSharedLayout } from "framer-motion"
import Particles from "react-particles-js"
import { setContext } from "@apollo/client/link/context"
// import "./App.css"
// import "@vime/core/themes/default.css"
import React, { useContext, useEffect } from "react"
import { Redirect, Route, Switch } from "react-router"
import { BrowserRouter as Router } from "react-router-dom"
import { AppContext, AppProvider } from "./AppContext"
import Home from "./components/Home"
import ProjectLayout from "./components/ProjectLayout"
import styled from "styled-components"
import logo from "./assets/images/filled-in.png"
import Preview from "./components/Preview"
import ProjectContainer from "./components/ProjectContainer"

const setAuthLink = setContext(() => {})

const App = () => {
    return (
        <Router>
            <AppProvider>
                <AppRouter />
            </AppProvider>
        </Router>
    )
}

const Logo = styled.img`
    position: absolute;
    top: 3rem;
    left: 3rem;
    width: 5rem;
    height: 5rem;
`

const AppRouter = () => {
    const [id, setId] = useContext(AppContext).id
    const [passphrase, setPassphrase] = useContext(AppContext).passphrase

    const httpLink = createHttpLink({
        uri:
            process.env.NODE_ENV === "production"
                ? "https://delivery.starlide.com/api"
                : "http://localhost:4000/api",
    })

    // https://dev.to/tmaximini/accessing-authorization-headers-in-apollo-graphql-client-3b50
    const client = new ApolloClient({
        link: ApolloLink.from([httpLink]),
        cache: new InMemoryCache(),
    })

    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem("client") as string)

        if (auth && auth.id) {
            setId(auth.id)
            setPassphrase(auth.passphrase)
        }
    }, [setId, setPassphrase])

    return (
        <ApolloProvider client={client}>
            <Particles
                style={{ zIndex: 0, position: "fixed" }}
                params={{
                    particles: {
                        number: {
                            value: 150,
                            density: {
                                enable: true,
                            },
                        },
                        color: {
                            value: ["#f09605", "#fff"],
                        },
                        size: {
                            value: 3,
                            random: true,
                            anim: {
                                speed: 4,
                                size_min: 0.3,
                            },
                        },
                        line_linked: {
                            enable: false,
                        },
                        move: {
                            random: false,
                            speed: 1,
                            // direction: "topRight",
                            out_mode: "out",
                        },
                    },
                    interactivity: {
                        events: {
                            onhover: {
                                enable: true,
                                mode: "grab",
                            },
                            onclick: {
                                enable: true,
                                mode: "push",
                            },
                        },
                        modes: {
                            bubble: {
                                distance: 150,
                                duration: 2,
                                size: 0,
                                opacity: 0,
                            },
                            repulse: {
                                distance: 400,
                                duration: 4,
                            },
                        },
                    },
                }}
            />
            <Logo src={logo} />
            <AnimateSharedLayout type="crossfade">
                <Switch>
                    <Route path="/:id/:fileId" component={Preview} />
                    <Route
                        path="/:id"
                        component={(props: any) => (
                            <ProjectContainer>
                                <ProjectLayout {...props} />
                            </ProjectContainer>
                        )}
                    />
                    <Route path="/" component={Home} />
                </Switch>
            </AnimateSharedLayout>
        </ApolloProvider>
    )
}

export default App

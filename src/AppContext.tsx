import React, { useState, createContext, ReactChild } from "react"

export const AppContext = createContext({} as any)

export const AppProvider = (props: { children: ReactChild }) => {
    let auth: { id: string; passphrase: string } = JSON.parse(
        localStorage.getItem("client") as string
    ) as { id: string; passphrase: string }

    if (!auth || !auth.id) auth = { id: "", passphrase: "" }

    const [id, setId] = useState(auth.id)
    const [passphrase, setPassphrase] = useState(auth.passphrase)

    return (
        <AppContext.Provider
            value={{
                id: [id, setId],
                passphrase: [passphrase, setPassphrase],
            }}
        >
            {props.children}
        </AppContext.Provider>
    )
}

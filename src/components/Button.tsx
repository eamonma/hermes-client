import React from "react"
import styled from "styled-components"
import { Link as RouterLink } from "react-router-dom"

const common = ` border-radius: 1rem;
    padding: 1rem;

    border: none;
    font-weight: 600;

    width: auto;

    flex-grow: 0;

    cursor: pointer;

    background-color: #333;
    color: #eee;

    transition: background-color 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);

    @media (hover: hover) {
        &:hover {
            background-color: #444;
        }
    }`

export const Button = styled.button`
    ${common}
`

export const Link = styled(RouterLink)`
    ${common}
`

import React, { useCallback } from 'react'
import Spinner from 'react-bootstrap/esm/Spinner'
import { usePlaidLink } from 'react-plaid-link'
import { usePlaid } from './plaid/usePlaid'

export const Home = () => {
    const { token, exchangePublicToken, loading } = usePlaid()
    const onSuccess = useCallback(exchangePublicToken, [])

    const config = {
        token,
        onSuccess,
        // ...
    }

    const { open, ready, error } = usePlaidLink(config)

    if (loading) return <Spinner animation="grow" />

    return (
        <button onClick={() => open()} disabled={!ready}>
            Connect a bank account
        </button>
    )
}

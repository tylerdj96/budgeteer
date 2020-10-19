import React, { useCallback } from 'react'
import Spinner from 'react-bootstrap/esm/Spinner'
import { usePlaidLink } from 'react-plaid-link'
import { usePlaid } from './plaid/usePlaid'

export const Home = () => {
    const {
        linkToken: token,
        exchangePublicToken,
        loading,
        getTransactions,
    } = usePlaid()
    const onSuccess = useCallback(exchangePublicToken, [])

    const config = {
        token,
        onSuccess,
        // ...
    }

    const { open, ready, error } = usePlaidLink(config)

    if (loading) return <Spinner animation="grow" />

    return (
        <div>
            <button onClick={() => open()} disabled={!ready}>
                Connect a bank account
            </button>
            <button onClick={() => getTransactions()} disabled={!ready}>
                getTransactions
            </button>
        </div>
    )
}

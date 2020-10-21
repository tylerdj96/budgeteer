import Axios from 'axios'
import React, { useCallback, useMemo } from 'react'
import Spinner from 'react-bootstrap/esm/Spinner'
import { usePlaidLink } from 'react-plaid-link'
import { useQuery } from 'react-query'
import { useOkta } from './core/common/hooks/useOkta'
import { Transactions } from './core/models/Transactions'
import { usePlaid } from './plaid/usePlaid'

export const Home = () => {
    const { ready, loading, getTransactions, openPlaid } = usePlaid()
    const { isLoading, isError, data, error: rqError } = useQuery<
        Transactions | undefined,
        Error
    >('transactions', getTransactions)

    const { userInfo } = useOkta()

    if (loading || isLoading) return <div>loading...</div>

    return (
        <div>
            Welcome back, {userInfo?.given_name}!
            <button onClick={() => openPlaid()} disabled={!ready}>
                Connect a bank account
            </button>
            <button onClick={() => getTransactions()} disabled={!ready}>
                getTransactions
            </button>
        </div>
    )
}

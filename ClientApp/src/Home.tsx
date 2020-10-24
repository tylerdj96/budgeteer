import Axios from 'axios'
import React, { useCallback, useMemo } from 'react'
import Spinner from 'react-bootstrap/esm/Spinner'
import { usePlaidLink } from 'react-plaid-link'
import { useQuery, useQueryCache } from 'react-query'
import { useOkta } from './core/common/hooks/useOkta'
import { Transactions } from './core/models/Transactions'
import { usePlaid } from './plaid/usePlaid'

export const Home = () => {
    const cache = useQueryCache()

    const { plaidReady, loading, transactions, openPlaid } = usePlaid()

    const { userInfo } = useOkta()

    if (loading) return <div>loading...</div>

    return (
        <div>
            Welcome back, {userInfo?.given_name}!
            <button onClick={() => openPlaid()} disabled={!plaidReady}>
                Connect a bank account
            </button>
            <button
                onClick={() => cache.getQueryData('transactions')}
                disabled={!plaidReady}
            >
                getTransactions
            </button>
            {JSON.stringify(transactions)}
        </div>
    )
}

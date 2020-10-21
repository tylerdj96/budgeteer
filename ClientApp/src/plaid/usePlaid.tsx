import { useCallback, useEffect, useMemo, useState } from 'react'
import { PlaidApi } from './plaidApi'
import { LinkResponse, TokenCreateDto } from './plaidClient'
import constate from 'constate'
import { useOkta } from '../core/common/hooks/useOkta'
import { Transactions } from '../core/models/Transactions'
import { usePlaidLink } from 'react-plaid-link'

const useLoadPlaid = () => {
    const { accessToken: oktaToken } = useOkta()
    const api = useMemo(() => {
        return PlaidApi(oktaToken)
    }, [])
    const [loading, setLoading] = useState<boolean>(false)
    const [linkResponse, setLinkResponse] = useState<LinkResponse>()

    useEffect(() => {
        const getLinkToken = async () => {
            setLoading(true)
            try {
                const body: TokenCreateDto = {
                    client_name: 'My client Name',
                    country_codes: ['US'],
                    language: 'en',
                    user: {
                        client_user_id: 'tyleruniqueuserid',
                    },
                    products: ['auth'],
                }
                const result = await api.getLinkToken(body)
                setLinkResponse(result)
            } catch (error) {
                console.error(error)
            }
            setLoading(false)
        }

        getLinkToken()
    }, [])

    const exchangePublicToken = async (token: string, metadata: any) => {
        try {
            const response = await api.exchangePublicToken(token)
        } catch (error) {
            console.error(error)
        }
    }

    const getTransactions = async () => {
        return await api.getTransactions(
            new Date('2020-06-06'),
            new Date('2020-07-07')
        )
    }
    const onSuccess = useCallback(exchangePublicToken, [])
    const config = {
        token: linkResponse?.link_token ?? '',
        onSuccess,
        // ...
    }
    const { open: openPlaid, ready, error } = usePlaidLink(config)
    return {
        loading,
        linkToken: linkResponse?.link_token ?? '',
        openPlaid,
        ready: ready && !!linkResponse?.link_token,
        error,
        exchangePublicToken,
        getTransactions,
    }
}

export const [PlaidProvider, usePlaid] = constate(useLoadPlaid)

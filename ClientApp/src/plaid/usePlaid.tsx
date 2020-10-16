import { useEffect, useMemo, useState } from 'react'
import { PlaidApi } from './plaidApi'
import { LinkResponse, TokenCreateDto, TokenResponse } from './plaidClient'
import constate from 'constate'

const useLoadPlaid = () => {
    const api = useMemo(() => {
        return PlaidApi()
    }, [])
    const [loading, setLoading] = useState<boolean>(true)
    const [linkResponse, setLinkResponse] = useState<LinkResponse>()
    const [tokenResponse, setTokenResponse] = useState<TokenResponse>()

    useEffect(() => {
        const loadData = async () => {
            setLoading(true)
            try {
                const body: TokenCreateDto = {
                    clientName: 'My client Name',
                    countryCodes: ['US'],
                    language: 'en',
                    user: {
                        clientUserId: 'tyleruniqueuserid',
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
        loadData()
    }, [])

    const exchangePublicToken = async (token: string, metadata: any) => {
        try {
            console.log(token)
            console.log(metadata)
            const response = await api.exchangePublicToken(token)
            setTokenResponse(response)
        } catch (error) {
            console.error()
        }
    }

    return {
        loading: loading || !linkResponse,
        token: linkResponse?.linkToken ?? '',
        exchangePublicToken,
    }
}

export const [PlaidProvider, usePlaid] = constate(useLoadPlaid)

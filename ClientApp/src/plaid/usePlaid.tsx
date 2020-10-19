import { useEffect, useMemo, useState } from 'react'
import { PlaidApi } from './plaidApi'
import { LinkResponse, TokenCreateDto } from './plaidClient'
import constate from 'constate'

const useLoadPlaid = () => {
    const api = useMemo(() => {
        return PlaidApi()
    }, [])
    const [loading, setLoading] = useState<boolean>(true)
    const [linkResponse, setLinkResponse] = useState<LinkResponse>()
    const [accessToken, setAccessToken] = useState<string>()
    const [transactions, setTransactions] = useState<any>()

    useEffect(() => {
        const loadData = async () => {
            debugger
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
            setAccessToken(response)
        } catch (error) {
            console.error(error)
        }
    }

    const getTransactions = async () => {
        try {
            const response = await api.getTransactions(
                new Date('2020-06-06'),
                new Date('2020-07-07')
            )
            debugger
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    return {
        loading: loading || !linkResponse,
        linkToken: linkResponse?.linkToken ?? '',
        accessToken,
        exchangePublicToken,
        getTransactions,
    }
}

export const [PlaidProvider, usePlaid] = constate(useLoadPlaid)

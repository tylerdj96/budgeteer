import { PlaidClient } from './plaidClient'

export const PlaidApi = (oktaToken: string, baseUrl?: string) => {
    return new PlaidClient(oktaToken, baseUrl)
}

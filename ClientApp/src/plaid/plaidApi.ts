import { PlaidClient } from "./plaidClient"

export const PlaidApi = (baseUrl?: string) => {
    return new PlaidClient(baseUrl);
}
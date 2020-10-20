export interface Balances {
    available?: number
    current: number
    iso_currency_code: string
    limit?: number
    unofficial_currency_code?: any
}

export interface Account {
    account_id: string
    balances: Balances
    mask: string
    name: string
    official_name: string
    subtype: string
    type: string
}

export interface Item {
    available_products: string[]
    billed_products: string[]
    consent_expiration_time?: any
    error?: any
    institution_id: string
    item_id: string
    webhook: string
}

export interface Location {
    address?: any
    city?: any
    country?: any
    lat?: any
    lon?: any
    postal_code?: any
    region?: any
    store_number: string
}

export interface PaymentMeta {
    by_order_of?: any
    payee?: any
    payer?: any
    payment_method: string
    payment_processor?: any
    ppd_id?: any
    reason?: any
    reference_number?: any
}

export interface Transaction {
    account_id: string
    account_owner?: any
    amount: number
    authorized_date?: any
    category: string[]
    category_id: string
    date: string
    iso_currency_code: string
    location: Location
    merchant_name: string
    name: string
    payment_channel: string
    payment_meta: PaymentMeta
    pending: boolean
    pending_transaction_id?: any
    transaction_code?: any
    transaction_id: string
    transaction_type: string
    unofficial_currency_code?: any
}

export interface Transactions {
    accounts: Account[]
    item: Item
    request_id: string
    total_transactions: number
    transactions: Transaction[]
}

/* tslint:disable */
/* eslint-disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.8.2.0 (NJsonSchema v10.2.1.0 (Newtonsoft.Json v12.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming

import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    CancelToken,
} from 'axios'

export interface IPlaidClient {
    getLinkToken(body: TokenCreateDto): Promise<LinkResponse>
    exchangePublicToken(publicToken: string): Promise<TokenResponse>
}

export class PlaidClient implements IPlaidClient {
    private instance: AxiosInstance
    private baseUrl: string
    protected jsonParseReviver:
        | ((key: string, value: any) => any)
        | undefined = undefined

    constructor(baseUrl?: string, instance?: AxiosInstance) {
        this.instance = instance ? instance : axios.create()
        this.baseUrl =
            baseUrl !== undefined && baseUrl !== null
                ? baseUrl
                : 'https://localhost:5001'
    }

    getLinkToken(
        body: TokenCreateDto,
        cancelToken?: CancelToken | undefined
    ): Promise<LinkResponse> {
        let url_ = this.baseUrl + '/api/v1/link'
        url_ = url_.replace(/[?&]$/, '')

        const content_ = JSON.stringify(body)

        let options_ = <AxiosRequestConfig>{
            data: content_,
            method: 'POST',
            url: url_,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            cancelToken,
        }

        return this.instance
            .request(options_)
            .catch((_error: any) => {
                if (isAxiosError(_error) && _error.response) {
                    return _error.response
                } else {
                    throw _error
                }
            })
            .then((_response: AxiosResponse) => {
                return this.processGetLinkToken(_response)
            })
    }

    protected processGetLinkToken(
        response: AxiosResponse
    ): Promise<LinkResponse> {
        const status = response.status
        let _headers: any = {}
        if (response.headers && typeof response.headers === 'object') {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k]
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data
            let result200: any = null
            let resultData200 = _responseText
            // result200 = JSON.parse(resultData200)
            return _responseText
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data
            return throwException(
                'An unexpected server error occurred.',
                status,
                _responseText,
                _headers
            )
        }
        return Promise.resolve<LinkResponse>(<any>null)
    }

    exchangePublicToken(
        publicToken: string,
        cancelToken?: CancelToken | undefined
    ): Promise<TokenResponse> {
        let url_ = this.baseUrl + '/api/v1/token'
        url_ = url_.replace(/[?&]$/, '')

        const content_ = JSON.stringify(publicToken)

        let options_ = <AxiosRequestConfig>{
            data: content_,
            method: 'POST',
            url: url_,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            cancelToken,
        }

        return this.instance
            .request(options_)
            .catch((_error: any) => {
                if (isAxiosError(_error) && _error.response) {
                    return _error.response
                } else {
                    throw _error
                }
            })
            .then((_response: AxiosResponse) => {
                return this.processExchangePublicToken(_response)
            })
    }

    protected processExchangePublicToken(
        response: AxiosResponse
    ): Promise<TokenResponse> {
        const status = response.status
        let _headers: any = {}
        if (response.headers && typeof response.headers === 'object') {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k]
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data
            let result200: any = null
            let resultData200 = _responseText
            // result200 = JSON.parse(resultData200)
            return _responseText
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data
            return throwException(
                'An unexpected server error occurred.',
                status,
                _responseText,
                _headers
            )
        }
        return Promise.resolve<TokenResponse>(<any>null)
    }
}

export interface LinkResponse {
    linkToken?: string | undefined
    expiration?: string | undefined
    requestId?: string | undefined
}

export interface TokenCreateDto {
    clientId?: string | undefined
    clientSecret?: string | undefined
    clientName?: string | undefined
    countryCodes?: string[] | undefined
    language?: string | undefined
    user?: User | undefined
    products?: string[] | undefined
}

export interface User {
    clientUserId?: string | undefined
}

export interface TokenResponse {
    accessToken?: string | undefined
    itemId?: string | undefined
    requestId?: string | undefined
}

export class ApiException extends Error {
    message: string
    status: number
    response: string
    headers: { [key: string]: any }
    result: any

    constructor(
        message: string,
        status: number,
        response: string,
        headers: { [key: string]: any },
        result: any
    ) {
        super()

        this.message = message
        this.status = status
        this.response = response
        this.headers = headers
        this.result = result
    }

    protected isApiException = true

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true
    }
}

function throwException(
    message: string,
    status: number,
    response: string,
    headers: { [key: string]: any },
    result?: any
): any {
    if (result !== null && result !== undefined) throw result
    else throw new ApiException(message, status, response, headers, null)
}

function isAxiosError(obj: any | undefined): obj is AxiosError {
    return obj && obj.isAxiosError === true
}
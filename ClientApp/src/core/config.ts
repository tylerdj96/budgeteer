const OKTA_DOMAIN = 'dev-6096813.okta.com'
const CLIENT_ID = '0oac5kzgkMCN1gqNZ5d5'
export const CALLBACK_PATH = '/login/callback'

const ISSUER = `https://${OKTA_DOMAIN}/oauth2/default`
const HOST = window.location.host
const REDIRECT_URI = `https://${HOST}${CALLBACK_PATH}`
const SCOPES = 'openid profile email'

export const config = {
    issuer: ISSUER,
    clientId: CLIENT_ID,
    redirectUri: REDIRECT_URI,
    scope: SCOPES.split(/\s+/),
}

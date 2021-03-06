import React from 'react'
import { Home } from './Home'
import { PlaidProvider } from './plaid/usePlaid'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { CALLBACK_PATH, config } from './core/config'
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react'
import { Login } from './Login'
import { ReactQueryDevtools } from 'react-query-devtools'
import { QueryCache, ReactQueryCacheProvider } from 'react-query'

const queryCache = new QueryCache()

function App() {
    return (
        <ReactQueryCacheProvider queryCache={queryCache}>
            <Router>
                <ReactQueryDevtools initialIsOpen={false} />
                <Security {...config}>
                    <Route path={CALLBACK_PATH} component={LoginCallback} />
                    <SecureRoute exact={true} path={'/'}>
                        <PlaidProvider>
                            <Home />
                        </PlaidProvider>
                    </SecureRoute>
                    <Route path={'/login'} component={Login} />
                </Security>
            </Router>
        </ReactQueryCacheProvider>
    )
}

export default App

import React from 'react'
import { Home } from './Home'
import { PlaidProvider } from './plaid/usePlaid'
function App() {
    return (
        <PlaidProvider>
            <Home />
        </PlaidProvider>
    )
}

export default App

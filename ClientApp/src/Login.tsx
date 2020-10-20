import { useOktaAuth } from '@okta/okta-react'
import React from 'react'

export const Login = () => {
    const { authState, authService } = useOktaAuth()
    const login = () => authService.login('/profile')

    if (authState.isPending) {
        return <div>Loading authentication...</div>
    } else if (!authState.isAuthenticated) {
        return (
            <div>
                <a onClick={login}>Login</a>
            </div>
        )
    } else return null
}

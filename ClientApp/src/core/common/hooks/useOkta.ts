import { useOktaAuth } from '@okta/okta-react'
import { useState, useEffect } from 'react'
import { OktaUser } from '../../models/OktaUser'

export const useOkta = () => {
    const { authState, authService } = useOktaAuth()
    const { accessToken } = authState
    const [userInfo, setUserInfo] = useState<OktaUser>()
    useEffect(() => {
        if (!authState.isAuthenticated) {
            // When user isn't authenticated, forget any user info
            setUserInfo(undefined)
        } else {
            authService.getUser().then((info: OktaUser) => {
                setUserInfo(info)
            })
        }
    }, [authState, authService])

    return {
        userInfo,
        accessToken,
    }
}

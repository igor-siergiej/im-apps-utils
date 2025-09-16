import { useCallback, useEffect, useState } from 'react';

import { useAuthConfig } from '../contexts/AuthConfigContext';
import { useAuth } from '../contexts/AuthContext';
import { removeStorageItem, tryRefreshToken } from '../utils';

export const useTokenInitialization = () => {
    const { login, isAuthenticated } = useAuth();
    const config = useAuthConfig();
    const [isInitializing, setIsInitializing] = useState(true);

    const initializeToken = useCallback(async () => {
        try {
            const newAccessToken = await tryRefreshToken(config);

            if (newAccessToken) {
                login(newAccessToken);
            }
        } catch {
            removeStorageItem(config.accessTokenKey!, config.storageType);
        } finally {
            setIsInitializing(false);
        }
    }, [login, config]);

    useEffect(() => {
        if (!isAuthenticated) {
            initializeToken();
        } else {
            setIsInitializing(false);
        }
    }, [initializeToken, isAuthenticated]);

    return { isInitializing };
};

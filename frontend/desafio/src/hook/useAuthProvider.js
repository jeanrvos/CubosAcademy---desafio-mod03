import { useState } from 'react';
import { useLocalStorage, useSetState } from 'react-use';

export default function useAuthProvider() {
    const [tokenPersistido, setTokenPersistido, removeTokenPersistido] = useLocalStorage('TOKEN', null);
    const [usuarioPersistido, setUsuarioPersistido, removeUsuarioPersistido] =
    useLocalStorage("USER", {});

    const [token, setToken] = useState(tokenPersistido);
    const [user, setUser] = useSetState(usuarioPersistido);


    const logar = (token) => {
        setToken(token);
        setTokenPersistido(token);
        setUsuarioPersistido(user);
        setUser(user);
    };

    const deslogar = () => {
        setToken(null);
        removeTokenPersistido();
        removeUsuarioPersistido();
        setUser({})
    };

    return {
        token,
        user,
        logar,
        deslogar
    };
}
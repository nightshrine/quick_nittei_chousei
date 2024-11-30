import { User as Auth0User, useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import { Loading } from './components/myui/Loading';
import { User } from './definitions/Auth';
import { UserService } from './services/UserService';
import { userContext } from './store/Auth';

type ProtectedRouteProps = {
    children: JSX.Element;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const {
        user: auth0User,
        isAuthenticated,
        isLoading,
        loginWithRedirect,
    } = useAuth0();
    const [userState, setUserState] = useState<User | null>(null);
    const [isUserLoading, setIsUserLoading] = useState(true); // ロード中の状態管理

    // ユーザー情報の取得・登録
    useEffect(() => {
        const fetchOrRegisterUser = async () => {
            if (!auth0User) return;

            try {
                const user = await UserService.getUser(auth0User.sub!);

                if (user) {
                    setUserState(user);
                    setIsUserLoading(false); // ロード完了
                    return;
                }

                // DBに存在しない場合、新規登録
                const newUser = await UserService.postUser(
                    auth0User as Auth0User
                );

                // ユーザー情報を状態にセット
                setUserState(newUser);
            } catch (error) {
                console.error('Error fetching or registering user:', error);
            } finally {
                setIsUserLoading(false); // ロード完了
            }
        };

        if (isAuthenticated && auth0User) {
            fetchOrRegisterUser();
        } else if (!isAuthenticated && !isLoading) {
            loginWithRedirect(); // 認証されていない場合はリダイレクト
        }
    }, [isAuthenticated, auth0User, isLoading, loginWithRedirect]);

    // 認証状態やロード中の場合の処理
    if (isLoading || isUserLoading) {
        return <Loading />;
    }

    if (!isAuthenticated || !userState) {
        return null; // ログインまたはユーザー情報の取得が完了するまで何もレンダリングしない
    }

    return (
        <userContext.Provider
            value={{
                user: userState,
                setUserName: (name: string) => {
                    setUserState((prev) => (prev ? { ...prev, name } : prev));
                },
            }}
        >
            {children}
        </userContext.Provider>
    );
};

export default ProtectedRoute;

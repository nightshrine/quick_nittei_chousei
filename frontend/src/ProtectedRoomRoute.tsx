import { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Loading } from './components/myui/Loading';
import { RoomService } from './services/RoomService';
import { userContext } from './store/Auth';

export default function ProtectedRoomRoute() {
    const { roomId } = useParams<{ roomId: string }>();
    const user = useContext(userContext)!.user;
    const navigate = useNavigate();
    // const [roomInfo, setRoomInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!roomId) return;

        async function fetchRoomData() {
            try {
                const isJoinRoom = await RoomService.isJoinRoom(
                    user.id,
                    Number(roomId)
                );

                if (!isJoinRoom) {
                    throw new Error('Room validation failed');
                }

                // const data = await response.json();
                // setRoomInfo(data); // 必要な情報を状態に保存
            } catch (error) {
                console.error('Error:', error);
                navigate('/not-found'); // 権限がない場合やエラー時にリダイレクト
            } finally {
                setLoading(false);
            }
        }

        fetchRoomData();
    }, [roomId, navigate, user.id]);

    if (loading) return <Loading />;

    return <Outlet />;
}

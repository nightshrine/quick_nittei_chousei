import { RoomService } from '@/services/RoomService';
import { userContext } from '@/store/Auth';
import { Box, Button, Fieldset, Input } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title } from '../myui/Title';
import { Field } from '../ui/field';
import { PasswordInput } from '../ui/password-input';
import { toaster } from '../ui/toaster';

export default function JoinRoom() {
    const [roomName, setRoomName] = useState('');
    const [password, setPassword] = useState('');
    const user = useContext(userContext)!.user;

    const navigate = useNavigate();

    const joinRoom = async (
        userId: number,
        roomName: string,
        password: string
    ): Promise<void> => {
        const roomId = await RoomService.joinRoom(userId, roomName, password);
        // TODO: エラー判定とかを用いた方が良い
        if (roomId === -1) {
            toaster.create({
                title: `部屋「${roomName}」に入室できませんでした。部屋が存在しないか、パスワードが間違っています`,
                type: 'error',
            });
            return;
        }

        toaster.create({
            title: `部屋「${roomName}」に入室しました`,
            type: 'success',
        });

        navigate(`/room/${roomId}`);
    };

    return (
        <>
            <Title title="部屋入室" />
            <Box
                w={{ base: '90%', lg: '50%' }}
                m="auto"
                p="4"
                borderWidth="2px"
                borderColor="fg"
                borderRadius="md"
            >
                <Fieldset.Root size="lg" maxW="md">
                    <Fieldset.Content>
                        <Field label="部屋名">
                            <Input
                                name="name"
                                value={roomName}
                                onChange={(e) => setRoomName(e.target.value)}
                            />
                        </Field>

                        <Field label="入室用パスワード">
                            <PasswordInput
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Field>
                    </Fieldset.Content>

                    <Button
                        type="submit"
                        alignSelf="flex-start"
                        onClick={() => joinRoom(user.id, roomName, password)}
                    >
                        部屋入室
                    </Button>
                </Fieldset.Root>
            </Box>
        </>
    );
}

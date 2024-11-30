import { RoomService } from '@/services/RoomService';
import { Box, Button, Fieldset, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title } from '../myui/Title';
import { Field } from '../ui/field';
import { PasswordInput } from '../ui/password-input';
import { toaster } from '../ui/toaster';

export default function CreateRoom() {
    const [roomName, setRoomName] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const createRoom = async (roomName: string, password: string) => {
        const isExistRoom = await RoomService.isExistRoom(roomName);
        if (isExistRoom) {
            toaster.create({
                title: `部屋「${roomName}」は既に存在します`,
                type: 'error',
            });
            return;
        }

        await RoomService.postRoom(roomName, password);
        toaster.create({
            title: `部屋「${roomName}」を作成しました`,
            type: 'success',
        });
        navigate('/');
    };

    return (
        <>
            <Title title="部屋作成" />
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
                        onClick={() => createRoom(roomName, password)}
                    >
                        部屋作成
                    </Button>
                </Fieldset.Root>
            </Box>
        </>
    );
}

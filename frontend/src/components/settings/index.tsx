import { UserService } from '@/services/UserService';
import { userContext } from '@/store/Auth';
import { Box, Editable, IconButton, Text } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { LuCheck, LuPencilLine, LuX } from 'react-icons/lu';
import Logout from '../myui/Logout';
import { toaster } from '../ui/toaster';

export default function Settings() {
    const user = useContext(userContext)!.user;
    const setUserName = useContext(userContext)!.setUserName;
    const [newName, setNewName] = useState(user.name);

    const updateUserName = async (newName: string) => {
        setUserName(newName);
        await UserService.updateUserName(user.id, newName);
        toaster.create({
            title: `名前を「${newName}」に変更しました`,
            type: 'success',
        });
    };

    return (
        <>
            <Text fontSize="2xl" mb="20" textAlign="center">
                設定画面
            </Text>
            <Box
                w={{ base: '90%', lg: '50%' }}
                m="auto"
                p="4"
                borderWidth="2px"
                borderColor="fg"
                borderRadius="md"
            >
                <Text fontSize="xl" fontWeight="bold" mb="4">
                    名前変更
                </Text>
                <Editable.Root
                    value={newName}
                    onValueChange={(e) => setNewName(e.value)}
                    onValueCommit={() => updateUserName(newName)}
                    mb="4"
                >
                    <Editable.Preview />
                    <Editable.Input />
                    <Editable.Control>
                        <Editable.EditTrigger asChild>
                            <IconButton variant="ghost" size="xs">
                                <LuPencilLine />
                            </IconButton>
                        </Editable.EditTrigger>
                        <Editable.CancelTrigger asChild>
                            <IconButton variant="outline" size="xs">
                                <LuX />
                            </IconButton>
                        </Editable.CancelTrigger>
                        <Editable.SubmitTrigger asChild>
                            <IconButton variant="outline" size="xs">
                                <LuCheck />
                            </IconButton>
                        </Editable.SubmitTrigger>
                    </Editable.Control>
                </Editable.Root>
                <Text fontSize="xl" fontWeight="bold" mb="4">
                    ログアウト
                </Text>
                <Logout />
            </Box>
        </>
    );
}

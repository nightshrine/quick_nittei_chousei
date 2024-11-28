import {
    Box,
    Button,
    GridItem,
    Input,
    SimpleGrid,
    Text,
} from '@chakra-ui/react';
import Logout from '../myui/Logout';
import { useContext, useState } from 'react';
import { userContext } from '@/store/Auth';
import { UserService } from '@/services/UserService';
import { toaster } from '../ui/toaster';

export default function Settings() {
    const [newName, setNewName] = useState('');
    const user = useContext(userContext)!.user;
    const setUserName = useContext(userContext)!.setUserName;

    const updateUserName = async () => {
        setUserName(newName);
        await UserService.updateUserName(user.auth0Id, newName);
        toaster.create({
            title: `名前を「${newName}」に変更しました`,
            type: 'success',
        });
    };

    return (
        <Box as="main" m="4" mt={{ base: '20', lg: '20' }}>
            <Box w={{ base: '100%', lg: '50%' }} m="auto" p="4">
                <Text fontSize="xl" fontWeight="bold" mb="4">
                    名前変更
                </Text>
                <SimpleGrid columns={5} gap={4} mb="8">
                    <GridItem colSpan={4}>
                        <Input
                            placeholder="名前"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                        />
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Button colorScheme="teal" onClick={updateUserName}>
                            保存
                        </Button>
                    </GridItem>
                </SimpleGrid>
                <Text fontSize="xl" fontWeight="bold" mb="4">
                    ログアウト
                </Text>
                <Logout />
            </Box>
        </Box>
    );
}

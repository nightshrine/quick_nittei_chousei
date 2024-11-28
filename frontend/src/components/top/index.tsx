import { Box, Button, GridItem, SimpleGrid, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { userContext } from '@/store/Auth';
import { useNavigate } from 'react-router-dom';

const Top = () => {
    const user = useContext(userContext)!.user;
    const navigate = useNavigate();

    return (
        <Box as="main" m="4" mt={{ base: '20', lg: '20' }} textAlign={'center'}>
            <Text fontSize="2xl" mb="20">
                ようこそ, {user.name}さん!
            </Text>
            <SimpleGrid
                columns={{ base: 1, lg: 3 }}
                gap={{ base: 12, lg: 4 }}
                pb="8"
                w={{ base: '90%', lg: '80%' }}
                m="auto"
            >
                <GridItem colSpan={{ base: 1, lg: 1 }} height="20">
                    <Button
                        colorScheme="teal"
                        variant="solid"
                        size="lg"
                        w="100%"
                        h="100%"
                        bg="teal.500"
                        onClick={() => navigate('/create-room')}
                    >
                        <Text fontSize="xl">部屋作成</Text>
                    </Button>
                </GridItem>
                <GridItem colSpan={{ base: 1, lg: 1 }} height="20">
                    <Button
                        colorScheme="teal"
                        variant="solid"
                        size="lg"
                        w="100%"
                        h="100%"
                        bg="teal.500"
                        onClick={() => navigate('/join-room')}
                    >
                        <Text fontSize="xl">部屋入室</Text>
                    </Button>
                </GridItem>
                <GridItem colSpan={{ base: 1, lg: 1 }} height="20">
                    <Button
                        colorScheme="teal"
                        variant="solid"
                        size="lg"
                        w="100%"
                        h="100%"
                        bg="teal.500"
                        onClick={() => navigate('/settings')}
                    >
                        <Text fontSize="xl">プロフィール設定</Text>
                    </Button>
                </GridItem>
            </SimpleGrid>
        </Box>
    );
};

export default Top;

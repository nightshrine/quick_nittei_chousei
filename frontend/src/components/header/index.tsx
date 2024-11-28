import { Box, Button, Flex } from '@chakra-ui/react';
import { ColorModeButton } from '../ui/color-mode';
import { useNavigate } from 'react-router-dom';
import { APP_NAME } from '../../constants/Util';

export default function Header() {
    const navigate = useNavigate();

    return (
        <Box
            as="header"
            position="fixed"
            top="0"
            left="0"
            width="100%"
            bg="teal.500"
            zIndex="1000"
            boxShadow="md"
        >
            <Flex align="center" justify="space-between" px="3" py="3">
                <Button
                    fontSize="xl"
                    colorScheme="whiteAlpha"
                    variant="ghost"
                    onClick={() => navigate('/')}
                >
                    {APP_NAME}
                </Button>

                <Flex gap="2">
                    <ColorModeButton />
                </Flex>
            </Flex>
        </Box>
    );
}

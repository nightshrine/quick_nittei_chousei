import { Box, Button, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <VStack colorPalette="red">
                <Text color="red.500" fontSize="6xl">
                    404 Not Found
                </Text>
                <Button onClick={() => navigate('/')}>
                    トップページに戻る
                </Button>
            </VStack>
        </Box>
    );
};

import { Box, Spinner, Text, VStack } from '@chakra-ui/react';

export const Loading = () => (
    <Box display="flex" justifyContent="center" alignItems="center" h="100vh">
        <VStack colorPalette="teal">
            <Spinner color="teal.500" size="xl" />
            <Text color="teal.500" fontSize="xl">
                Loading...
            </Text>
        </VStack>
    </Box>
);

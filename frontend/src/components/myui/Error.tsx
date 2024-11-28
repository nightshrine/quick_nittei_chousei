import { Box, Icon, Text, VStack } from '@chakra-ui/react';
import { MdError } from 'react-icons/md';

export const Error = ({ errorText }: { errorText: string }) => (
    <Box display="flex" justifyContent="center" alignItems="center" h="100vh">
        <VStack colorPalette="red">
            {/* TODO: なぜかIcon表示時にエラーが出る。Warningなので一旦無視 */}
            <Icon fontSize="6xl" color="red.500">
                <MdError />
            </Icon>
            <Text color="red.500" fontSize="xl">
                {errorText}
            </Text>
        </VStack>
    </Box>
);

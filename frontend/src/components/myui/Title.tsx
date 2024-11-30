import { Text } from '@chakra-ui/react';

export const Title = ({ title }: { title: string }) => (
    <Text fontSize="2xl" mb="20" textAlign="center">
        {title}
    </Text>
);

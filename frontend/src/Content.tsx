import React from 'react';
import { Box } from '@chakra-ui/react';

type ContentProps = {
    children: JSX.Element;
};

const Content: React.FC<ContentProps> = ({ children }) => {
    return (
        <Box as="main" m="4" mt="20">
            {children}
        </Box>
    );
};

export default Content;

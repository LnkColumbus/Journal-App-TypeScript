import { FC, ReactNode } from 'react';
import { Box, Toolbar } from '@mui/material';

import { Navbar, Sidebar } from '../components';

interface Props {
    children?: ReactNode | undefined;
}

const drawerWidth = 240;

export const JournalLayout: FC<Props> = ({ children }) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Navbar drawerWidth={ drawerWidth } />
            
            <Sidebar drawerWidth={ drawerWidth } />

            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3 }}
            >
                <Toolbar />
                { children }
            </Box>
        </Box>
    )
}

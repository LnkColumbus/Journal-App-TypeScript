import { FC } from 'react';
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { useAppDispatch } from '../../store/hooks';
import { authLogout } from '../../features/auth';

interface Props {
    drawerWidth: number;
}

export const Navbar: FC<Props> = ({ drawerWidth }) => {

    const dispatch = useAppDispatch();

    const onLogout = () => {
        console.log('onLogout');
        dispatch( authLogout() );
    }

    return (
        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${ drawerWidth }px)` },
                ml: { sm: `${ drawerWidth }px`}
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    edge="start"
                    sx={{ mr: 2, display: { sm: 'none' }}}
                >
                    <MenuOutlined />
                </IconButton>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography variant="h6" noWrap component="div">Journal App</Typography>
                    <IconButton
                        color="error"
                        onClick={onLogout}
                    >
                        <LogoutOutlined />
                    </IconButton>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

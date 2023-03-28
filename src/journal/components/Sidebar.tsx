import { FC } from 'react';
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { TurnedInNot } from '@mui/icons-material';
import { useAppSelector } from '../../store/hooks';

interface Props {
    drawerWidth: number;
}

export const Sidebar: FC<Props> = ({ drawerWidth }) => {

    const { displayName } = useAppSelector((state) => state.auth);

    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant="permanent"
                open
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >

                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        { displayName }
                    </Typography>
                </Toolbar>
                <Divider />

                <List>
                    { ['Enero', 'Febrero', 'Marzo', 'Abril'].map( text => (
                        <ListItem key={ text } disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <TurnedInNot />
                                </ListItemIcon>
                                <Grid container>
                                    <ListItemText primary={ text } />
                                    <ListItemText secondary={'In nisi consequat ea nostrud irure ullamco esse commodo fugiat magna consequat nulla est tempor.'} />
                                </Grid>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

        </Box>
    )
}

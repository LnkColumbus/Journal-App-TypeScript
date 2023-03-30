import { FC, useMemo } from 'react';
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { TurnedInNot } from '@mui/icons-material';

import { useAppDispatch } from '../../store/hooks';
import { INote } from '../../interfaces';
import { setActiveNote } from '../../features/journal';

interface Props {
    note: INote;
}

export const NoteItem: FC<Props> = ({ note }) => {

    const dispatch = useAppDispatch();

    const { title, body } = note;

    const newTitle = useMemo(() => {
        return title.length > 17
            ? title.substring(0, 17) + '...'
            : title;
    }, [ title ]);

    const onSetNote = () => {
        dispatch( setActiveNote(note) );
    }

    return (
        <ListItem onClick={onSetNote} disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={ newTitle } />
                    <ListItemText secondary={ body } />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}

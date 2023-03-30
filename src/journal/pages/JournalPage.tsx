import { IconButton, Typography } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';

import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createEmptyNote } from '../../features/journal/thunks';

export const JournalPage = () => {

  const { activeNote, isSaving } = useAppSelector((state) => state.journal);
  const dispatch = useAppDispatch();

  const onNewNote = () => {
    // Despachar una nota vacia
    console.log('onNewNote');
    dispatch( createEmptyNote() );
  }

  return (
    <JournalLayout>
      {/* <Typography>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt officiis tenetur ipsa iusto beatae voluptas id harum soluta qui? Nobis aliquid similique et quam velit reiciendis dolore magnam voluptatum obcaecati.</Typography> */}
      {
        !!activeNote
          ? <NoteView />
          : <NothingSelectedView />
      }

      <IconButton
        size="large"
        onClick={ onNewNote }
        disabled={isSaving}
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  )
}

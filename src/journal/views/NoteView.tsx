import { ChangeEvent, useEffect, useMemo, useRef } from 'react';
import { DeleteOutlined, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useSnackbar } from 'notistack'

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteNote, setActiveNote, updateNote, uploadFiles } from '../../features/journal';
import { ImageGallery } from '../components';

const schema = yup.object({
    title: yup.string()
      .required('El correo es obligatorio'),
    body: yup.string()
      .required('La contraseña es obligatoria')
  }).required();
type FormData = yup.InferType<typeof schema>;

export const NoteView = () => {

    const { activeNote, errorMessage, isSaving, messageSaved } = useAppSelector((state) => state.journal);
    const dispatch = useAppDispatch();

    const { register, setValue, watch, formState: { errors }, handleSubmit } = useForm<FormData>({
        defaultValues: {
            title: activeNote?.title || '',
            body: activeNote?.body || ''
        },
        resolver: yupResolver(schema)
    });

    const { enqueueSnackbar } = useSnackbar()

    const date = activeNote?.date || 0;
    const title = activeNote?.title || '';
    const body = activeNote?.body ||  '';

    const wTitle = watch('title');
    const wBody = watch('body');

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setValue('title', title);
        setValue('body', body);
    }, [setValue, title, body]);

    useEffect(() => {
        dispatch(
            setActiveNote({
                id: activeNote!.id,
                date: activeNote!.date,
                title: wTitle,
                body: wBody,
                imageUrls: activeNote!.imageUrls
            })
        );
    }, [wTitle, wBody]);

    useEffect(() => {
        if ( messageSaved.length > 0 ) {
            enqueueSnackbar( messageSaved, { variant: 'success' });
        };
    }, [messageSaved]);

    useEffect(() => {
        if (errorMessage) {
            enqueueSnackbar( errorMessage, { variant: 'error' });
        }
    }, [errorMessage]);

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        const formatDate = new Intl.DateTimeFormat('es-ES', {
            dateStyle: 'full'
        }).format(newDate);

        return formatDate.charAt(0).toUpperCase() + formatDate.slice(1);
    }, [date]);

    const onFileInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        if ( target.files?.length === 0 ) return;

        const images = target.files as unknown as Blob[];
        dispatch(uploadFiles( images ));

    }

    const onSaveNote = () => {
        dispatch( updateNote() );
    }

    const onDelete = () => {
        dispatch( deleteNote() );
    }

    return (
        <form onSubmit={handleSubmit(onSaveNote)}>
            <Grid
                className="animate__animated animate__fadeIn animate__faster"
                container
                alignItems="center"
                direction="row"
                justifyContent="space-between"
                sx={{ mb: 1 }}
            >
                <Grid item>
                    <Typography fontSize={ 39 } fontWeight="light">{ dateString }</Typography>
                </Grid>
                    <Grid item>
                        <input
                            type="file"
                            multiple
                            ref={ fileInputRef }
                            onChange={ onFileInputChange }
                            style={{ display: 'none' }}
                        />
                        <IconButton
                            color="primary"
                            disabled={isSaving}
                            onClick={ () => fileInputRef.current?.click() }
                        >
                            <UploadOutlined />
                        </IconButton>
                        <Button
                            type="submit"
                            color="primary"
                            disabled={isSaving}
                            sx={{ padding: 2 }}
                        >
                            <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                            Guardar
                        </Button>
                    </Grid>

                    <Grid container>
                        <TextField
                            type="text"
                            variant="filled"
                            fullWidth
                            placeholder="Ingrese un título"
                            label="Título"
                            { ...register('title') }
                            sx={{ border: 'none', mb: 1 }}
                        />

                        <TextField
                            type="text"
                            variant="filled"
                            fullWidth
                            multiline
                            placeholder="¿Qué sucedió en el día de hoy?"
                            minRows={ 5 }
                            { ...register('body') }
                        />
                    </Grid>

                    <Grid container justifyContent="end">
                        <Button
                            onClick={ onDelete }
                            sx={{ mt: 2 }}
                            color="error"
                        >
                            <DeleteOutlined />
                            Eliminar
                        </Button>
                    </Grid>

                <ImageGallery images={ activeNote!.imageUrls } />
                
            </Grid>
        </form>
    )
}

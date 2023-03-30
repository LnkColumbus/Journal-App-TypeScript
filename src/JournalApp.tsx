import { AppRouter } from './router/AppRouter';
import { SnackbarProvider } from 'notistack';

import { AppTheme } from './theme';

export const JournalApp = () => {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      autoHideDuration={2500}
      maxSnack={3}
    >
      <AppTheme>
        <AppRouter />
      </AppTheme>
    </SnackbarProvider>
  )
}

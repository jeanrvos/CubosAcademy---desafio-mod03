import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'grid',
      placeContent: 'center',
      minHeight: '100vh',
      gap: '3em',
    },
    botao: {
      display:'grid',
      placeContent: 'center',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    links: {
      display: 'flex',
      alignItems: 'center',
      gap: 20
    }
  }));

  export default useStyles;
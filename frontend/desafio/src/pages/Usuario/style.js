import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 138;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: 15,
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '30ch',
      },
    },  
    layout: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    icons: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
    divider: {
      marginBottom: 50,
    },
    button: {
      margin: theme.spacing(1),
    },  
    cardbottom: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    infoproduto: {
      display: 'flex',
      gap: 20,
    },
  }));


export default useStyles;
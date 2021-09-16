import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 138;

const useStyles = makeStyles((theme) => ({
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
    root: {
      maxWidth: 450,
      display: 'flex',
      flexDirection: 'column',
      marginBottom: 100,
      gap: '3em',
    },
    botao: {
      display:'flex',
      alignItems: 'center',
      gap: 20
    },   
    margin: {
      margin: theme.spacing(1),
    }, 
  }));


export default useStyles;
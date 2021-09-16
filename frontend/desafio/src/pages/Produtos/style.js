import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 138;

const useStyles = makeStyles((theme) => ({
    card: {
      maxWidth: 232,
      height: 433
    },
    cards: {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '24px',
      marginBottom: 20,
    },
    mediacontainer: {
      maxHeight: 230,
      width: 232,
      paddingTop: 20,
    },
    media: {
      height: 250,
      width: 232,
    },
    cardcontent: {
      marginTop: 40,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    },
    price: {
      marginLeft: 'auto',
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
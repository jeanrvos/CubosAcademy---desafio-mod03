import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useStyles from './style';
import useAuth from '../../hook/useAuth';
import { get } from '../../services/ApiClient';
import Alert from '@material-ui/lab/Alert';
import { 
  Typography, 
  Button, 
  TextField, 
  Backdrop, 
  CircularProgress, 
  Drawer,
  CssBaseline,
  List,
  ListItem,
  ListItemIcon,
  Divider
} from '@material-ui/core/';
import { 
  Storefront, 
  AccountCircle, 
  Cancel 
} from '@material-ui/icons';


function Perfil() {
  const { token, deslogar } = useAuth();
  const [perfil, setPerfil] = useState([]);
  const classes = useStyles();
  const history = useHistory();
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [open, setOpen] = useState(false);


  async function carregarPerfil() {
    setCarregando(true);
   
    try {
        const resposta = await get('perfil', token);
      
        // if (!resposta.ok) {
        //   setErro(resposta);
        //   return;
        // }
    
        setPerfil(resposta);

        setCarregando(false);
    } catch (error) {
        setErro(error.message);
      }
  }    
  
  useEffect(() => {
  carregarPerfil();
  }, []);
  

  const handleToggle = () => {
    setOpen(!open);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className={classes.layout}>
        <CssBaseline />
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <div className={classes.toolbar} />
          <div className={classes.icons}>
            <List>
              {['Loja', 'Perfil', 'Sair'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>{index === 0 ? <Storefront style={{ fontSize: 50 }} onClick={() => {history.push('/produtos')}} /> : (index === 1 ? <AccountCircle style={{ fontSize: 40 }} onClick={() => {history.push('/produtos')}} /> : <Cancel style={{ fontSize: 40 }} onClick={deslogar}/>)}
                  </ListItemIcon>
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
        <main className={classes.content}>
          <Typography className={classes.title} variant="h2" color="textPrimary">
            Perfil
          </Typography>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField disabled id="standard-disabled" label="Seu nome" defaultValue={perfil.nome} />
            <TextField disabled id="standard-disabled" label="Nome da loja" defaultValue={perfil.nome_loja} />
            <TextField disabled id="standard-disabled" label="E-mail" defaultValue={perfil.email} />
          </form>
            {erro && <Alert severity="error">{erro}</Alert>}
            <Divider className={classes.divider}/>
            <div  className={classes.botao}>
              <Button variant="contained" color="primary" onClick={handleToggle} type="submit">
                EDITAR PERFIL 
              </Button>
              {carregando && <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                <CircularProgress color="inherit" />
              </Backdrop>}
            </div>      
        </main>
      </div>




      

    </div>

  );
}

export default Perfil;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import useStyles from './style';
import useAuth from '../../hook/useAuth';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import StorefrontIcon from '@material-ui/icons/Storefront';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';


function NovoProduto() {  
  const classes = useStyles();
  const { token, deslogar } = useAuth();
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [open, setOpen] = useState(false);

  
  const handleToggle = () => {
    setOpen(!open);    
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  async function onSubmit (data) {
    setErro('');
    setCarregando(true);

    try {
      const resposta = await fetch("https://desafio-m03.herokuapp.com/produtos", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json',
          authorization: `Bearer ${token}`
        }
      });

      const dados = await resposta.json();

      history.push('/produtos');
  
      setCarregando(false);
  
      if (erro === '') {
        setErro(dados);
        return;
      } 

    } catch (error) {
      setErro(error.message);
    }
    setCarregando(false);        
  }

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
                  <ListItemIcon>{index === 0 ? <StorefrontIcon style={{ fontSize: 50 }} onClick={() => {history.push('/produtos')}} /> : (index === 1 ? <AccountCircleIcon style={{ fontSize: 40 }} /> : <CancelIcon style={{ fontSize: 40 }} onClick={deslogar}/>)}
                  </ListItemIcon>
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
        <main className={classes.content}>
          <Typography className={classes.title} variant="h2" color="textPrimary">
            Loja
          </Typography>
          <div className={classes.toolbar} />
          <form 
            className={classes.root} 
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >            
            <Typography variant="h4">
              Adicionar produto
            </Typography>
            <TextField label="Nome do produto" {...register('nome')}/>
            <TextField label="Preço" {...register('preco')} type="text" placeholder="R$" />
            <TextField label="Estoque" {...register('estoque')} placeholder="Un" />
            <TextField label="Descrição do produto" {...register('descricao')} />
            <TextField label="Imagem" {...register('imagem')} />
            {erro && <Alert severity="error">{erro}</Alert>}
            <Divider className={classes.divider}/>
            <div className={classes.botao}>
              <Button size="medium" className={classes.margin} onClick={() => {history.push('/produtos')}}>
                CANCELAR
              </Button>
              <Button variant="contained" color="primary" onClick={handleToggle} type="submit">
                Adicionar produto
              </Button>
              {carregando && 
                <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                  <CircularProgress color="inherit" />
                </Backdrop>}
            </div>
          </form>          
        </main>
      </div>
    </div>
  );
}

export default NovoProduto;

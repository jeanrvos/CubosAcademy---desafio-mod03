import React, { useState } from 'react';
import useStyles from './style';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { post } from '../../services/ApiClient';

import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import useAuth from '../../hook/useAuth';

function Login () {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const { logar } = useAuth();
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
      const { token, erro } = await post('login', data);

      setCarregando(false);

      if (erro) {
        setErro(erro);
        return;
      }

      logar(token);

      history.push('/produtos');

    } catch (error) {
      setErro(error.message);
    }


    setCarregando(false);    
  }

  return (
    <form 
      className={classes.root} 
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h3">
        Login
      </Typography>
      <TextField label="E-mail" {...register('email')} />
      <TextField label="Senha" {...register('senha')} type="password"/>
      {erro && <Alert severity="error">{erro}</Alert>}
      <div  className={classes.botao}>
        <Button variant="contained" color="primary" onClick={handleToggle} type="submit">
          Entrar 
        </Button>
        {carregando && <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
          <CircularProgress color="inherit" />
        </Backdrop>}
      </div>
      <div className={classes.links}>
        <p>Primeira vez aqui?</p>
        <nav>
          <a href="/cadastro">CRIE UMA CONTA</a>
        </nav>
      </div>
      
    </form>
  );
}

export default Login;
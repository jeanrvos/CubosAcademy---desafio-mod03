import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import useStyles from './style';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { post } from '../../services/ApiClient';


function Cadastro () {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  
  async function onSubmit (data) {
    setErro('');
    setCarregando(true);

    if (data.senha === data.repeticaoSenha) {
      try {

        const resposta = await post('usuarios', data);
    
        setCarregando(false);
    
        if (erro === '') {
          setErro(resposta);
          return;
        } 
                
        history.push('/');
  
      } catch (error) {
        setErro(error.message);
      }
    } else {
      setCarregando(false);    
      setErro('As senhas não conferem');
      return;
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
        Cadastro
      </Typography>
      <TextField label="Nome" {...register('nome')}/>
      <TextField label="Nome da loja" {...register('nome_loja')} type="text" />
      <TextField label="E-mail" {...register('email')} />
      <TextField label="Senha" {...register('senha')} type="password"/>
      <TextField label="Repita a senha" {...register('repeticaoSenha')} type="password"/>
      {erro && <Alert severity="error">{erro}</Alert>}
      <div  className={classes.botao}>
        <Button variant="contained" color="primary" onClick={handleToggle} type="submit">
          Cadastrar 
        </Button>
        {carregando && 
        <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
          <CircularProgress color="inherit" />
        </Backdrop>}
      </div>
      <div className={classes.links}>
        <p>Já possui uma conta?</p>
        <nav>
          <a href="/">ACESSE</a>
        </nav>
      </div>
    </form>
  );
}

export default Cadastro;
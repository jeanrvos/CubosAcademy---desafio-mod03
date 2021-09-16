import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useStyles from './style';
import useAuth from '../../hook/useAuth';
// import Alert from '@material-ui/lab/Alert';
import { get } from '../../services/ApiClient';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import StorefrontIcon from '@material-ui/icons/Storefront';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import AlertDialog from '../../components/Modal';


function Produtos() {
  const { token, deslogar } = useAuth();
  const [produtos, setProdutos] = useState([]);
  // const [erro, setErro] = useState('');
  const classes = useStyles();
  const history = useHistory();

  async function carregarProdutos() {
    const resposta = await get('produtos', token);
    
    setProdutos(resposta);
  
    // if (!resposta.ok) {
    //   setErro(resposta);
    //   return;
    // }

  }

  useEffect(() => {
    carregarProdutos();
  }, [produtos]);

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
                  <ListItemIcon>{index === 0 ? <StorefrontIcon style={{ fontSize: 50 }} onClick={() => {history.push('/produtos')}} /> : (index === 1 ? <AccountCircleIcon style={{ fontSize: 40 }} onClick={() => {history.push('/perfil')}} /> : <CancelIcon style={{ fontSize: 40 }} onClick={deslogar}/>)}
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
            <div className={classes.cards}>
              {produtos.map(produto => (
                  <Card className={classes.card} key={produto.id}>
                    <div className={classes.mediacontainer}>
                    <CardMedia
                      className={classes.media}
                      image={produto.imagem}
                      title="Paella dish"
                      />
                    </div>
                    <CardContent className={classes.cardcontent}>
                      <Typography variant="h6" color="textPrimary" component="p">
                        {produto.nome}
                      </Typography>
                      <Typography variant="body2" color="textPrimary" component="p">
                        {produto.descricao}
                      </Typography>
                      <div className={classes.cardbottom}>
                        <div className={classes.infoproduto}>
                          <Typography variant="body2" color="textSecondary" component="p">
                            {produto.estoque} UNIDADE(S)
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p" className={classes.price}>
                            R$ {(produto.preco / 100)}
                          </Typography>  
                        </div>   
                        <CardActions disableSpacing>
                          <Button size="small" color="primary">
                            Editar
                          </Button>                      
                          <AlertDialog title="Excluir" idProduto={produto.id}/>
                        </CardActions>                   
                      </div>
                      
                    </CardContent>                
                  </Card>
              ))}
            </div>      
          <Divider className={classes.divider}/>
          <Button variant="contained" color="primary" onClick={() => {history.push('/produtos/novo')}}>
          Adicionar produto
          </Button>
        </main>
      </div>
      {/* {erro && <Alert severity="error">{erro}</Alert>} */}
      
    </div>
  );
}

export default Produtos;

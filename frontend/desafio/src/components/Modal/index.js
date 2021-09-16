import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useAuth from '../../hook/useAuth';
import { del } from '../../services/ApiClient';

export default function AlertDialog(props) {
    const { token } = useAuth();
    const history = useHistory();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
    setOpen(true);
    };

  const handleClose = () => {
        setOpen(false);
        history.push('/produtos');
    };

    async function onDelete(idProduto) {

        handleClose();

        await del(`produtos/${idProduto}`, token);

        
    }

    return (
        <div>
        <Button color="secondary" onClick={handleClickOpen}>
            {props.title}
        </Button>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Remover produto do catálogo?"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Esta ação não pode ser desfeita.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                MANTER PRODUTO
            </Button>
            <Button onClick={() => onDelete(props.idProduto)} color="secondary" autoFocus>
                REMOVER
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}

import { makeStyles } from '@material-ui/core/styles';
import { Block } from '@material-ui/icons';

export default makeStyles((theme) => ({
  media: {
    height: 260,
  },
  root:{
    maxHeight: '100%',
    [theme.breakpoints.up('sm')]: {
      maxHeight: 500,
      minHeight:'100%'
    },
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cartActions: {
    justifyContent: 'space-between',
  },
  
  fixedIconButton: {
    position: 'inherit',
    bottom: 10,
    left: 10,
  },
  anchor: {
    display: 'Block',
    padding: '5px',
    color: '#fff',
    margin: '15px 0 0',
    background: '#333',
    textAlign: 'center',
    textDecoration: 'none',
    borderRadius: '5px',
    transition: '1s',
    '&:hover': {
      background: '#666',
      transition: '1s',
    },
  },
}));
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function AlertModal(props) {
  const classes = useStyles();

  const { isOpen, setIsOpen, emptyStocks } = props;

  return (
    <Modal
      className={classes.modal}
      open={isOpen}
      onClose={() => setIsOpen(false)}>
      <div className={classes.modalContent}>
        <List
          subheader={
            <ListSubheader color="primary" id="out-of-stock-subheader">
              <Typography component="h3">Out Of Stock</Typography>
            </ListSubheader>
          }>
          {emptyStocks.map((emptyStock) => (
            <ListItem key={emptyStock.id} divider={true}>
              <ListItemText
                primary={
                  <Typography component="h5">
                    {`${emptyStock.bookstore_id} - ${emptyStock.bookstore_name}`}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography component="h6">
                      {`${emptyStock.book_id} - ${emptyStock.book_title}`}
                    </Typography>
                    <span>{`By ${emptyStock.book_author}`}</span>
                  </>
                }
              />
              <List></List>
            </ListItem>
          ))}
        </List>
      </div>
    </Modal>
  );
}

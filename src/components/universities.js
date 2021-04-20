import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 15,
    boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
    textAlign: "center",
    flex: '0 1 300px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  }
}));

const Universities = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    props.universities.map((university) => (
      <Card className={classes.root}>
        <CardHeader
          title={university.name}
          subheader={university.country}
        />
        <CardMedia
          className={classes.media}
          image="/college.jpg"
          title="Univeristy"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {university.webpage}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
        <IconButton 
        aria-label="add to favorites"
        onClick={() => props.editUniversity(university)}>
          <EditIcon />
        </IconButton>
        <IconButton 
        aria-label="share"
        onClick={() => props.deleteUniversity(university.name)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
      </Card>
    ))
  )
};

export default Universities
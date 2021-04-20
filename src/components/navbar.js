import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import clsx from 'clsx';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


const useStyles = makeStyles((theme) => ({
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  button: {
    margin: theme.spacing(1),
  },
  drawer: {
    width: '900',
    flexShrink: 0,
  },
  drawerPaper: {
    width: '900',
  },

}));

export default function Navbar(props) {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false)
  let countries = []
  let domains = []
  const [country, setCountry] = useState([''])
  const [domain, setDomain] = useState([''])
  const [checked, setChecked] = React.useState(['']);


  const handleChange = (event) => {
      if(event.target.checked){
          console.log(event.target.value)
      }
    setChecked(event.target.checked);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpenDrawer({ ...openDrawer, [anchor]: open });
    let list = []
    for(let i in props.universities){
        list.push(props.universities[i].country)
    }
    countries = list.filter(function (x, i, a) { 
        return a.indexOf(x) === i; 
    });
    setCountry(countries)
    list = []
    for(let i in props.universities){
        list.push(props.universities[i].domain)
    }
    domains = list.filter(function(x, i, a){
        return a.indexOf(x) === i;
    });
    setDomain(domains)

  };

//   const list = (anchor) => (
//     <div
//       className={clsx(classes.list, {
//         [classes.fullList]: anchor === 'top' || anchor === 'bottom',
//       })}
//       role="presentation"
//       onClick={toggleDrawer(anchor, false)}
//       onKeyDown={toggleDrawer(anchor, false)}
//     >
//       <List>
//       <Typography className={classes.title} variant="h6" noWrap>
//         Country
//       </Typography>
//       <FormControl component="fieldset">
//         <FormLabel component="legend" >Country</FormLabel>
//         {country.map((text, index) => (
//                 <FormGroup aria-label="position" row>
//                   <FormControlLabel
//                     value={text}
//                     control={<Checkbox color="primary" />}
//                     label={text}
//                     labelPlacement="end"
//                     onChange={handleChange}
//                   />
//                 </FormGroup>
//         //   <ListItem button key={text}>
//         //     <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
//         //     <ListItemText primary={text} />
//         //   </ListItem>
//         ))}
//         </FormControl>
//       </List>
//       <List>
//       <Typography className={classes.title} variant="h6" noWrap>
//         Domain
//       </Typography>
//         {domain.map((text, index) => (
//           <ListItem button key={text}>
//             <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
//             <ListItemText primary={text} />
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            CreateYourAd
          </Typography>
        </Toolbar>
      </AppBar>
      <div>
      {/* <React.Fragment key={'right'}>
          <Button onClick={toggleDrawer('right', true)}>{'right'}</Button>
          <Drawer 
            anchor={'right'} 
            open={openDrawer['right']} 
            onClose={toggleDrawer('right', false)} 
            className={classes.drawer}>
            {list('right')}
          </Drawer>
        </React.Fragment> */}
      </div>
    </div>
  );
}

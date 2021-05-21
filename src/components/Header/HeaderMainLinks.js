/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

import firebase, {auth, db} from "../../firebase/Firebase";

const useStyles = makeStyles(styles);

export default function HeaderMainLinks(props) {
  const classes = useStyles();

  const handleLogout = (e) => {
    e.preventDefault();
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      alert(error.message);
    });
    localStorage.clear();
    window.location.reload(false);
  }
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Account"
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
          }}
          buttonIcon={Apps}
          dropdownList={[
            <a href="/profile-page" className={classes.dropdownLink}>
              Profile
            </a>,
            <p className={classes.dropdownLink} onClick={handleLogout}>
              Logout
            </p>,
          ]}
        />
      </ListItem>
    </List>
  );
}

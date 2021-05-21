import React, {useEffect} from "react";

import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import Datetime from "react-datetime";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import Business from "@material-ui/icons/Business";
import Home from "@material-ui/icons/Home";
import LocationCity from "@material-ui/icons/LocationCity";
import Language from "@material-ui/icons/Language";
import AllInbox from "@material-ui/icons/AllInbox";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";

import firebase, {auth, db} from "../../firebase/Firebase";

const useStyles = makeStyles(styles);

export default function SignupPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  // fieldStatus value is same as => 0: good, 1: empty field, 2: wrong email, 3: wrong confirm password
  const [fieldStatus, setFieldStatus] = React.useState(0);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [post, setPost] = React.useState("");

  setTimeout(function () {
    setCardAnimation("");
  }, 700);

  useEffect(() => {
  },[] );

  const handleSignup = e => {
    e.preventDefault();
    setFieldStatus("");
    setErrorMessage("");
    const checkFieldsValue = checkFields();
    if(checkFieldsValue) {
      auth.createUserWithEmailAndPassword(email, password)
      .then(async res => {
          console.log('sign up succeeded.')
          const token = await Object.entries(res.user)[5][1].b;
          localStorage.setItem('userId', res.user.uid);
          localStorage.setItem('userEmail', res.user.email);
          localStorage.setItem('firstName', firstName);
          localStorage.setItem('lastName', lastName);
          localStorage.setItem('token', token);
          props.history.push('/profile-page');
      })
      .catch(err => {
        setErrorMessage(err.message);
      })
    }
  }

  const selectCountry = val => {
    setCountry(val)
  }

  const checkFields = () => {
    const reqEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setFieldStatus(0);
    if(!firstName || !lastName || !email || !password || !confirmPassword || !company || !address || !city || !country || !post) {
      setFieldStatus(1);
    } else if(!reqEmail.test(String(email).toLowerCase())) {
        setFieldStatus(2);
    } else if(password !== confirmPassword) {
      setFieldStatus(3);
    } else {
      return true;
    }
    return false;
  }

  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="Material Kit React"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={5}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Sign up</h4>
                    {/* <div className={classes.socialLine}>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className={"fab fa-apple"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className={"fab fa-facebook"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className={"fab fa-google-plus-g"} />
                      </Button>
                    </div> */}
                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      labelText="First Name..."
                      id="first"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        value: firstName,
                        onChange: e => {setFirstName(e.target.value);},
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Last Name..."
                      id="last"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        value: lastName,
                        onChange: e => {setLastName(e.target.value);},
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Email..."
                      id="email"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "email",
                        value: email,
                        onChange: e => {setEmail(e.target.value);},
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Password"
                      id="pass"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "password",
                        value: password,
                        onChange: e => {setPassword(e.target.value);},
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                    />
                    <CustomInput
                      labelText="Confirm Password"
                      id="pass"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "password",
                        value: confirmPassword,
                        onChange: e => {setConfirmPassword(e.target.value);},
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                    />

                    <CustomInput
                      labelText="Company Name"
                      id="company"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        value: company,
                        onChange: e => {setCompany(e.target.value);},
                        endAdornment: (
                          <InputAdornment position="end">
                            <Business className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                    />
                    <CustomInput
                      labelText="Address"
                      id="address"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        value: address,
                        onChange: e => {setAddress(e.target.value);},
                        endAdornment: (
                          <InputAdornment position="end">
                            <Home className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                    />

                    <CustomInput
                      labelText="City"
                      id="city"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        value: city,
                        onChange: e => {setCity(e.target.value);},
                        endAdornment: (
                          <InputAdornment position="end">
                            <LocationCity className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                    />
                    <CustomInput
                      labelText="Country"
                      id="coutry"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        value: country,
                        onChange: e => {setCountry(e.target.value);},
                        endAdornment: (
                          <InputAdornment position="end">
                            <Language className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                    />
                    <GridContainer style={{marginTop: '-40px', opacity: '0'}}>
                      <GridItem xs={12} sm={12} md={12}>
                        <FormControl fullWidth>
                          {/* <Datetime
                            inputProps={{ placeholder: "Country" }}
                          /> */}
                          <CountryDropdown
                            value={country}
                            onChange={(val) => selectCountry(val)} 
                            inputProps={{ placeholder: "Country" }}
                            priorityOptions={true}
                          />
                        </FormControl>
                      </GridItem>
                    </GridContainer>

                    <CustomInput
                      labelText="Post Code"
                      id="post"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        value: post,
                        onChange: e => {setPost(e.target.value);},
                        endAdornment: (
                          <InputAdornment position="end">
                            <AllInbox className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                    />
                  </CardBody>
                  {
                    fieldStatus === 1 && (
                    <p className={classes.divider} style={{color: 'red'}}>Please fill out all fields.</p>
                   )
                  }
                  {
                    fieldStatus === 2 && (
                    <p className={classes.divider} style={{color: 'red'}}>Please check your email format again.</p>
                    )
                  }
                  {
                    fieldStatus === 3 && (
                    <p className={classes.divider} style={{color: 'red'}}>Please check your confirm password again.</p>
                    )
                  }
                  {
                    errorMessage && (
                    <p className={classes.divider} style={{color: 'red'}}>{errorMessage}</p>
                    )
                  }
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg" type="submit" onClick={handleSignup}>
                      Get started
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}

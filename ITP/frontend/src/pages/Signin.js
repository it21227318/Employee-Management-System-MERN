import React from 'react'
import { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { Login } from '../actions/authAction';

const Signin = () => {

  const dispatch = useDispatch();
  const [Admin_Email, setAdmin_Email] = useState('');
  const [Password, setPassword] = useState('');
  const authenticating = useSelector(state => state.auth.authenticating)
  const authenticated = useSelector(state => state.auth.authenticated)

  //toast
  useEffect(() => {
    if (authenticating === true) {
      toast.loading("Cheking...", {
        id: 'cheking'
      })
    }
    else if (authenticating === false) {
      toast.dismiss('cheking')
    }
  })

  const adminLogin = (e) => {
    console.log("hello")
    e.preventDefault();

    if (Admin_Email === '') {

      toast.error("Please Provide An Email..!", {
        id: "email"
      })
    }
    else if (Password === '') {

      toast.error("Please Provide the Password..!", {
        id: "'password'"
      })
    }
    else if (Admin_Email === '' && Password === '') {

      toast.error("Please provide the Credentials...!", {
        id: "credential"
      })
    }

    else if (Admin_Email !== '' & Password !== '') {
      const admin = {
        Admin_Email,
        Password
      }



      dispatch(Login(admin));
      setAdmin_Email('');
      setPassword('');
    }
  }

  if (authenticated) {
    return <Navigate to='/' />
  };


  return (
    <div className='bgimage' data-testid="login-id-1">

      <Container component="main" maxWidth="xs" style={{ backgroundColor: "#e9e9e9b4", marginTop: "4.5rem", paddingTop: "1rem", paddingBottom: "4rem" }}>
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={adminLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="Admin_Email"
              autoComplete="email"
              autoFocus
              value={Admin_Email}
              onChange={(e) => setAdmin_Email(e.target.value)}


            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              autoFocus
              value={Password}
              onChange={(e) => setPassword(e.target.value)}

            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>

              <Grid item  >
                <Link to='/Signup' variant="body2" className='link' style={{ textDecoration: 'none' }}>
                  Sign Up?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  )
}

export default Signin
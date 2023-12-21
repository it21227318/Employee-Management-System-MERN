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
import {SignUp} from '../actions/authAction'

const Register = () => {

    const dispatch = useDispatch();
    const [Admin_Email, setAdmin_Email] = useState('');
    const [Password, setPassword] = useState('');
    const [Full_Name , setFullName] = useState('');
    const [Contact_no,setContactNo] = useState('');
    const loading = useSelector(state => state.auth.loading)
    const authenticated = useSelector(state => state.auth.authenticated)



    useEffect(() => {
        if (loading === true) {
            toast.loading('loading...', {
                id: 'loading'
            })
        }
        else if (loading === false) {
            toast.dismiss('loading')
        }

    }, [loading]);

    
    const sendData = (e) => {

        e.preventDefault()

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (Full_Name === '') {
            toast.error("Please enter your name..", {
                id: 'name'
            })
        }
        else if (Contact_no === '') {
            toast.error("Please Provide your contact no..", {
                id: 'contactno'
            })
        }
        else if (Admin_Email === '') {
            toast.error("Please Provide Your email ..", {
                id: 'pmail'
            })
        }
        else if (!emailRegex.test(Admin_Email) ) {
            toast.error("Please Provide a valid email..", {
                id: 'valid'
            })
        }

        else if (Password === '') {
            toast.error("Please Provide a Password..", {
                id: 'pwd'
            })
        }
        else if (Password.length < 8) {
            toast.error("Password should be at least 8 characters long", {
                id: 'pwdLength'
            })
        }

        else if (Full_Name !== '' && Contact_no !== '' && Admin_Email !== '' && Password !== '') {
            const form ={
                Full_Name : Full_Name,
                Contact_no : Contact_no,
                Admin_Email : Admin_Email,
                Password : Password
            }
            const form2 ={                
                Admin_Email :Admin_Email,
                Password:Password                
            }

            dispatch(SignUp(form,form2))
            setFullName('')
            setContactNo('')
            setAdmin_Email('')
            setPassword('')

        }

    }

    if (authenticated) {
        return <Navigate to='/' />
      };

    return (
        <div className='bgimage' data-testid="login-id-1">

            <Container component="main" maxWidth="xs" style={{ backgroundColor: "#e9e9e9b4", marginTop: "2.5rem", paddingTop: "1rem", paddingBottom: "2rem" }}>
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
                        Sign Up
                    </Typography>
                    <Box component="form" onSubmit={sendData} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Full Name"
                            name="Full_Name"
                            value={Full_Name}
                            onChange={(e) => setFullName(e.target.value)}


                        />
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
                            id="contactno"
                            label="Contact No"
                            name="Contact_no"
                            value={Contact_no}
                            onChange={(e) => setContactNo(e.target.value)}


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
                                <Link to='/login' variant="body2" className='link' style={{ textDecoration: 'none' }}>
                                    Sign In?
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    )
}

export default Register
import { Box, Button, Flex, Heading, Input } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Appcontext } from '../components/AppContext';

const Login = () => {

  const [user, setUser] = useState({ username: '', password: '' });
  const { authenticate, setAuthentication } = useContext(Appcontext);
  const navigate = useNavigate();


  //for getting the username and password
  const handleChange = (e) => {

    const { name, value } = e.target;

    setUser({ ...user, [name]: value });

  }

  //maintaining the login validation
  const handleLogin = () => {

    if (user.username === 'foo' && user.password === "bar") {
      setAuthentication(true);
    } else {
      alert("input right credentials")

    }
  }

  //will navigate to login page if not loggedin
  if (authenticate) {
    setTimeout(() => {
      console.log(authenticate)
      navigate('/home');

    }, 0)
  }

  //destructuring the username and password from user state
  const { username, password } = user;

  return (
    <Box w={{ base: "70%", sm: "70%", md: "30%" }} m='3em auto' boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"} >

      <Flex gap='1rem' pt='1em' px={[2, 3, 5]} direction={'column'} pb="2rem">

        <Heading
          children={"Login"}
          mb='1rem'
          fontFamily={'cursive'}
          fontSize={[20, 25, 20]}
        />

        <Input
          name="username"
          placeholder='Enter username '
          value={username}
          onChange={handleChange}
        />

        <Input
          name="password"
          placeholder='Enter Password '
          value={password}
          onChange={handleChange}
        />

        <Button children={"Login"} colorScheme="yellow" p=".3rem" onClick={handleLogin} />

      </Flex>
    </Box>
  )
}

export default Login;
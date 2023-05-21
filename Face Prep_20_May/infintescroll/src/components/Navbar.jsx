import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { Appcontext } from './AppContext'
import logo from '../assets/facePrepLogo.jpg'


const Navbar = () => {

  const navigate = useNavigate();
  const { authenticate,setAuthentication } = useContext(Appcontext);

  const handleLogout = () => {
 setAuthentication(false)
    navigate('/');
  }


  return (
    <Box boxShadow={"rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"}>
      <Flex justify={'space-between'} align={"center"}>

        <Box w={[10,20,50]}>
          <Image src={logo} w="100%" />
        </Box>

        <Flex p='.8rem' gap="2rem">
          <Link to="/home">Home</Link>
          {authenticate ? <Text onClick={handleLogout} cursor={'pointer'}>Logout</Text>:<Link to="/">Login</Link> }
        </Flex>

      </Flex>
    </Box>
  )
}

export default Navbar
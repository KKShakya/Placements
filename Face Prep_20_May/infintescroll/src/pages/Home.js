import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { Avatar, Box, Flex, Grid, Image, Text } from '@chakra-ui/react'
import Loader from '../components/Loader';


const Home = () => {


  const [profiles, setProfiles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);


  //getting data from the api call
  const getUsers = async (page = 1) => {

    let res = await fetch(`https://randomuser.me/api/?page=${page}&results=10&inc=gender,name,picture,id`);
    res = await res.json();
    console.log(res.results)
    res.results.sort((a, b) => a.name.first - b.name.first)

    setProfiles((prev) => [...prev, ...res.results]);

  }

  const handleScroll = () => {
    //hnadleScroll for infinite scroll
    if (document.documentElement.scrollTop + window.innerHeight + 1 >= document.documentElement.scrollHeight) {
      setLoading((prev) => !prev)
      setPage((page) => page + 1);
    }
  }


  useEffect(() => {
    setTimeout(() => {

      getUsers();
    }, 1000)

  }, [page])


  //useeffect for window scrolll
  useEffect(() => {

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])



  return (
    <Flex
      m='2em auto'
      w={{ base: "70%", sm: "80%", md: "30%" }}
      justify={'center'}
      align="center"
    >
      <Flex
        direction='column'
        gap='2em'>

        {profiles.map((item) => (
          
          <Grid
            key={item.picture.medium}
            templateColumns={'repeat(2,1fr)'}
            gap={'2rem'}
            alignItems={'center'}
            p='1em'
            boxShadow={' rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;'}
          >
            <Text fontFamily={'sans-serif'}>{item.name.first}{'   '}{item.name.last}</Text>


            <Avatar size={{ base: "sm", sm: "md", md: "xl", }} src={item.picture.medium} />

          </Grid>
        ))}
        {loading ? <Loader /> : <Text></Text>}

      </Flex>
    </Flex>
  )
}

export default Home
import { Box, Flex, Image,
    Input,
    Text,
    FormControl,
    FormLabel,
    useToast,
    Button,
    Select} from "@chakra-ui/react";
  import React, { useState } from "react";
  import bg from './img/bg.svg'
  import avatar from './img/avatar.svg'
  import { Link, useNavigate } from "react-router-dom";
  import axios from 'axios';
  function Signup() {
  const toast = useToast()
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
    const navigate = useNavigate();
  
    const handleSubmit = async(e) => {
      e.preventDefault();
      setLoading(true)
      try {
      let newUser = {
        name , email , role , password
      }  
      let signUser = await axios.post('https://sore-erin-cougar-tam.cyclic.app/auth/signup' , newUser);
      let data = await signUser.data;
      if(data.status){
        toast(
            {
              title: 'Signup Success',
              description: data.message,
              status: 'success',
              duration: 3000,
              position: "top",
              isClosable: true,
            }
          )
          setEmail('')
          setName('')
          setPassword('')
          setRole('')
          setLoading(false)
          navigate('/login')
      }
      else{
        toast(
            {
              title: 'Signup Failed',
              description: data.message,
              status: 'error',
              duration: 3000,
              position: "top",
              isClosable: true,
            }
          )
          setLoading(false)

      }

      } catch (error) {
         setLoading(false)
         toast(
            {
              title: 'Signup Failed',
              description: error.message,
              status: 'error',
              duration: 3000,
              position: "top",
              isClosable: true,
            }
          )
      }
          
  }
  
  return <Box w='100%' h='100vh' m='auto' backgroundRepeat='no-repeat' backgroundImage='url(https://i.ibb.co/6HWp0Vh/wave.png)'>
          <Flex justifyContent='center' gap='100px' pt={['60px','60px','10px','0px']}>
         <Flex display={['none','none','none','flex']} alignItems='center' mt='20px' justifyContent='center'>
                <Image maxW='600px'  src={bg} />
        </Flex>
        <Box w='300px' m='auto'>
          <Flex justifyContent='center' mb='40px'>
            <Image maxW='70px' src={avatar} mt='30px'/>
          </Flex>
        <form onSubmit={handleSubmit}>
            <FormLabel color="blackAlpha.800" fontSize="14px">
              Username
            </FormLabel>
            <Input
              onChange={({target}) => setName(target.value)}
              value={name}
              mb="15px"
              type="text"
              placeholder="Type in your username"
              isRequired
            />
          <FormControl>
            <FormLabel color="blackAlpha.800" fontSize="14px">
              Email
            </FormLabel>
            <Input
              onChange={({target}) => setEmail(target.value)}
              value={email}
              mb="15px"
              type="email"
              placeholder="Type in your email address"
              isRequired
            />
            <FormLabel color="blackAlpha.800" fontSize="14px">
              Password
            </FormLabel>
            <Input
              onChange={({target}) => setPassword(target.value)}
              value={password}
              mb="15px"
              type="password"
              placeholder="Type in your password"
              isRequired
            />
             <FormLabel color="blackAlpha.800" fontSize="14px">
              Role
            </FormLabel>
          <Select   mb="15px" value={role} onChange={(e)=>setRole(e.target.value)}>
            <option value=''>Select Role</option>
            <option value="CREATOR">CREATOR</option>
            <option value="VIEW_ALL">READER</option>
          </Select>
            <Button
              isLoading={loading}
              w="100%"
              mb="15px"
              fontSize="14px"
              color="white"
              type="submit"
              cursor="pointer"
              bg="#10847e"
              fontWeight="500"
              _hover={{ bg: "#10847e" }}
            >Signup</Button>
          </FormControl>
         
          </form>
          <Text textAlign='center' mb="16px !important">
            Already have an account?
            <Link
              style={{color:'blue' , fontWeight:'500', marginLeft:'7px'}}
              to='/login'
            >
              Login
            </Link>
          </Text>
        </Box>
      </Flex>
        </Box>
  }
  
  export default Signup;
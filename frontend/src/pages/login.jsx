import { Box, Flex, Image,
    Input,
    Text,
    FormControl,
    FormLabel,
    useToast,
    Button} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import bg from './img/bg.svg'
import avatar from './img/avatar.svg'
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/user";
import axios from "axios";
function Login() {
  const {setIsAuth , setUser , setToken} = useContext(AuthContext)
  const toast = useToast()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading , setLoading] = useState(false)
  const navigate = useNavigate();

  
  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
    try {
    let logUser = await axios.post('https://wandering-cyan-brown-bear.cyclic.app/auth/login' , {email , password});
    let data = await logUser.data;
    console.log(data)
    if(data.status){
        setUser(data.user);
        setIsAuth(true);
        setToken(data.token)
        localStorage.setItem('userEng' , JSON.stringify(data.user))
        localStorage.setItem('tokenEng' , JSON.stringify(data.token))
        setEmail('')
        setPassword('')
        setLoading(false)
        navigate('/')
        toast(
            {
              title: 'Login Success',
              description: data.message,
              status: 'success',
              duration: 3000,
              position: "top",
              isClosable: true,
            }
          )
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
						<Image maxW='150px' src={avatar} />
					</Flex>
				<form onSubmit={handleSubmit}>
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
            >LOGIN</Button>
          </FormControl>
          </form>
          <Text textAlign='center' mb="16px !important">
            Don’t have an account yet?{" "}
            <Link
			  style={{color:'blue' , fontWeight:'500'}}
              to='/signup'
            >
              Sign up
            </Link>
          </Text>
				</Box>
			</Flex>
        </Box>
}

export default Login;
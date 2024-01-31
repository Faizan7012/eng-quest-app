import { Box, Button, Divider, Flex, Heading, SimpleGrid, Text, useDisclosure ,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Input,
    FormLabel,
    FormControl,
    Select,
    useToast,
    Skeleton,
    

} from "@chakra-ui/react";

import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/user";
import { createBook, getAllBooks, getNewBooks, getOldBooks } from "./bookapi";
import axios from "axios";
import TableBooks from "./Table";

let init = {
    author : '',
    title : '',
    publishedYear: 2024
}

export default function Books(){
    const {user , logout , token} = useContext(AuthContext);
    const [data , setData] = useState([]);
    const [loading , setLoading ] = useState(false);
    const [newbook , setNewBook] = useState(init)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
    const toast = useToast()

    useEffect(()=>{
       getAllBooks(axios, setData , setLoading)
    },[])

    const handleChange = (e)=>{
       e.preventDefault();
       const {name , value} = e.target;
       if(name == 'publishedYear'){
        setNewBook({...newbook , [name] : Number(value) })
    }
         setNewBook({...newbook , [name] : value })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        let res = await createBook(axios , newbook , token , setLoading , setNewBook , toast , user);
        let re1 = await res;
        if(re1){
            getAllBooks(axios, setData , setLoading)
        }
    }
    return <Box>
          <Flex justifyContent='space-between' p='10px 20px' alignItems={'center'} flexWrap={'wrap'} columnGap={'30px'}>
                <Text color={'red'} fontWeight={600} fontSize={'20px'}>
                    Books<span style={{color:'blue'}}>Library</span>
                </Text>
                <Flex flexDir='column' justifyContent={'center'} alignItems='center' fontStyle={'italic'} fontWeight={500}>
                      <Text>{user?.name} {`[ ${user?.role} ]`}</Text>
                      <Text>{user?.email}</Text>
                </Flex>
                <Button color={'white'} bg='teal' _hover={{bg:'teal'}} onClick={()=>logout()}>Logout</Button>
          </Flex>
          <Divider  mb='40px' borderTop={'1px solid gray'}/>
          <Flex w={['100%','100%','90%','90%']} p={'20px'} m='auto' justifyContent={'space-between'}>
            <Heading>
                 Books :
            </Heading>
            <SimpleGrid gap='10px' columns={['1','2','3',user.role === 'CREATOR' ?'4':'3']}>
               <Button w='150px' color={'white'} bg='teal' _hover={{bg:'teal'}} onClick={()=> getAllBooks(axios, setData , setLoading)}>View All</Button>
               <Button w='150px' color={'white'} bg='teal' _hover={{bg:'teal'}} onClick={()=> getNewBooks(axios, setData , setLoading)}>Last 10min</Button>
               <Button w='150px' color={'white'} bg='teal' _hover={{bg:'teal'}} onClick={()=> getOldBooks(axios, setData , setLoading)}>Older than 10min</Button>
               <Button display={user.role === 'CREATOR' ? 'block':'none'} w='150px' color={'white'} bg='teal' _hover={{bg:'teal'}} ref={btnRef} onClick={onOpen}>Create New +</Button>

               <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Add New Book</DrawerHeader>

          <DrawerBody>
          <form onSubmit={handleSubmit}>
          <FormControl>
         
            <FormLabel color="blackAlpha.800" fontSize="14px">
              Title
            </FormLabel>
            <Input
              onChange={(e)=>handleChange(e)}
              value={newbook.title}
              name = 'title'
              mb="15px"
              type="text"
              isRequired
            />
            <FormLabel color="blackAlpha.800" fontSize="14px">
              Author
            </FormLabel>
            <Input
              onChange={(e)=>handleChange(e)}
              value={newbook.author}
              name= 'author'
              mb="15px"
              type="text"
              isRequired
            />

            <FormLabel color="blackAlpha.800" fontSize="14px">
              Published Year
            </FormLabel>
            <Select
              onChange={(e)=>handleChange(e)}
              value={newbook.publishedYear}
              name = 'publishedYear'
              mb="15px"
              isRequired
            >
    
              <option value='2024'>2024</option>
              <option value='2023'>2023</option>
              <option value='2022'>2022</option>
              <option value='2021'>2021</option>
              <option value='2020'>2020</option>
              <option value='2019'>2019</option>
              <option value='2018'>2018</option>
              <option value='2017'>2017</option>
              <option value='2016'>2016</option>
              <option value='2015'>2015</option>
              <option value='2014'>2014</option>
              <option value='2013'>2013</option>
              <option value='2012'>2012</option>
              <option value='2011'>2011</option>

            </Select>
           
          </FormControl>
          <DrawerFooter mt='50px'>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              w="100%"
              fontSize="14px"
              color="white"
              type="submit"
              cursor="pointer"
              bg="#10847e"
              fontWeight="500"
              _hover={{ bg: "#10847e" }}
            >Add</Button>
          </DrawerFooter>
          </form>
          </DrawerBody>

        
        </DrawerContent>
      </Drawer>
            </SimpleGrid>
          </Flex>


      {
    loading  ? <Skeleton w={'90%'} m='auto' h='500px'>

        </Skeleton> :
        <TableBooks data={data}  setLoading={setLoading} token={token} setData={setData} toast={toast}/>
      }
        

    </Box>
}
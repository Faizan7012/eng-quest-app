import { Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Box,
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
    Button,
    useDisclosure,
    } from "@chakra-ui/react"
import { delBook, getAllBooks , editBook } from "./bookapi"
import axios from "axios"
import { useContext, useRef, useState } from "react"
import { AuthContext } from "../context/user"

const init = {
  title :'',
  author:'',
  publishedYear: 2024
}
export default function TableBooks({data , setLoading , token , setData , toast}){
    const {user} = useContext(AuthContext)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [newbook , setNewBook] = useState(init)
    const [currId , setCurrId] = useState('')
    const btnRef = useRef()

const handleDelete = async(id)=>{
    let res = await delBook(axios, setLoading , id, token , toast , user);
    let re1 = await res;
    if(re1){
        getAllBooks(axios, setData , setLoading)
    }
}

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
   let res = await editBook(axios, setLoading , currId, toast , user , newbook);
   let re1 = await res;
   if(re1){
       setNewBook(init)
       getAllBooks(axios, setData , setLoading)
   }
}

const handleOpen = (id)=>{
   setCurrId(id);
   onOpen();
}
   if(data.length ==0){
    return <Box mt='70px' textAlign={'center'} fontFamily={'cursive'} fontSize={'20px'} fontWeight={500}>
        No Books Found
    </Box>
   }
    return <TableContainer w='90%' m='auto'>
    <Table  >
      <Thead>
        <Tr>
          <Th>Author</Th>
          <Th>Title</Th>
          <Th>Published Year</Th>
          <Th>Posted By</Th>
          <Th>Delete</Th>
        </Tr>
      </Thead>
      <Tbody>
       
      {
        data?.map((ele)=>{
               return  <Tr key={ele._id} fontFamily='cursive' _hover={{bg:'gray.200'}}>
               <Td>{ele.author}</Td>
               <Td>{ele.title}</Td>
               <Td>{ele.publishedYear}</Td>
               <Td>{ele.postedBy}</Td>
               <Td display={user.email === ele.creatorEmail ? 'block':'none'} onClick={()=>handleDelete(ele._id)}color={'red'} cursor={'pointer'}>Delete</Td>
               <Td display={user.email === ele.creatorEmail ? 'block':'none'} ref={btnRef} onClick={()=>handleOpen(ele._id)} color={'blue'} cursor={'pointer'} >Edit</Td>
    
             </Tr>
        })
      }

      </Tbody>
    </Table>
    <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Edit Book</DrawerHeader>

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
            >Edit</Button>
          </DrawerFooter>
          </form>
          </DrawerBody>

        
        </DrawerContent>
      </Drawer>
  </TableContainer>
}
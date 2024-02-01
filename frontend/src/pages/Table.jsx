import { Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Box,
    } from "@chakra-ui/react"
import { delBook, getAllBooks } from "./bookapi"
import axios from "axios"
import { useContext } from "react"
import { AuthContext } from "../context/user"


export default function TableBooks({data , setLoading , token , setData , toast}){
    const {user} = useContext(AuthContext)

const handleDelete = async(id)=>{
    let res = await delBook(axios, setLoading , id, token , toast , user);
    let re1 = await res;
    if(re1){
        getAllBooks(axios, setData , setLoading)
    }
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
               <Td display={user.role === 'CREATOR' ? 'block':'none'} onClick={()=>handleDelete(ele._id)} color={'red'} cursor={'pointer'}>Delete</Td>
             </Tr>
        })
      }

      </Tbody>
    </Table>
  </TableContainer>
}
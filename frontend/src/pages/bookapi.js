const getAllBooks = async(axios , setData , setLoading )=>{
    setLoading(true)
   try {
    let res = await axios.get('https://sore-erin-cougar-tam.cyclic.app/books');
    let ans = await res.data;
    if(ans.status){
        setData(ans.data);
        setLoading(false);
    }
    else{
        setLoading(false);
        alert('Something went wrong try again!')

    }

   } catch (error) {
      setLoading(false);
      alert(error.message)
   }
}

const getNewAndOldBooks = async(axios , setData , setLoading , id )=>{
    setLoading(true)
   try {
    let res = await axios.get(`https://sore-erin-cougar-tam.cyclic.app/books/get/${id}`);
    let ans = await res.data;
    if(ans.status){
        setData(ans.data);
        setLoading(false);
    }
    else{
        setLoading(false);
        alert('Something went wrong try again!')

    }

   } catch (error) {
      setLoading(false);
      alert(error.message)
   }
}

const createBook = async(axios , book , token , setLoading , setNewBook , toast , user)=>{
    setLoading(true)
   try {

    
    let res = await axios.post('https://sore-erin-cougar-tam.cyclic.app/books' , {book , token , user},{
      headers : {token}
    });
    let ans = await res.data;
    console.log(res)
    if(ans.status){
        setLoading(false);
        setNewBook({
            author:'',
            postedBy :'',
            title : '',
            publishedYear : 2024
        })
        toast(
            {
              title: 'Book Added',
              description: ans.message,
              status: 'success',
              duration: 3000,
              position: "top",
              isClosable: true,
            }
          )
        return true
    }
    else{
        setLoading(false);
        alert('Something went wrong try again!')
        toast(
            {
              title: 'Error',
              description: ans.message,
              status: 'error',
              duration: 3000,
              position: "top",
              isClosable: true,
            }
          )
        return false
       
    }

   } catch (error) {
      setLoading(false);
      toast(
        {
          title: 'Failed',
          description: error.message,
          status: 'error',
          duration: 3000,
          position: "top",
          isClosable: true,
        }
      )
      return false

   }
}


const delBook = async(axios, setLoading , id, token, toast , user)=>{
  console.log(user.email)
    setLoading(true)
   
   try {
    let res = await axios.delete(`https://sore-erin-cougar-tam.cyclic.app/books/delete/${id}`,{'creatorEmail': user.email});
    let ans = await res.data;
    console.log(res)
    if(ans.status){
        toast(
            {
              title: 'Deleted',
              description: ans.message,
              status: 'success',
              duration: 3000,
              position: "top",
              isClosable: true,
            }
          )
        setLoading(false);
        return true
    }
    else{
        setLoading(false);
        toast(
            {
              title: 'Failed',
              description: ans.message,
              status: 'error',
              duration: 3000,
              position: "top",
              isClosable: true,
            }
          )
        return false
       
    }

   } catch (error) {
      setLoading(false);
      toast(
        {
          title: 'Failed',
          description: error.message,
          status: 'error',
          duration: 3000,
          position: "top",
          isClosable: true,
        }
      )

      return false

   }
}


const editBook = async(axios, setLoading , id, toast , user , newEditBook)=>{
  setLoading(true)
 
 try {
  let res = await axios.put(`https://sore-erin-cougar-tam.cyclic.app/books/edit/${id}`,{creatorEmail: user.email , book : newEditBook});
  let ans = await res.data;
  if(ans.status){
      toast(
          {
            title: 'Edited',
            description: ans.message,
            status: 'success',
            duration: 3000,
            position: "top",
            isClosable: true,
          }
        )
      setLoading(false);
      return true
  }
  else{
      setLoading(false);
      toast(
          {
            title: 'Failed',
            description: ans.message,
            status: 'error',
            duration: 3000,
            position: "top",
            isClosable: true,
          }
        )
      return false
     
  }

 } catch (error) {
    setLoading(false);
    toast(
      {
        title: 'Failed',
        description: error.message,
        status: 'error',
        duration: 3000,
        position: "top",
        isClosable: true,
      }
    )

    return false

 }
}
export {
    getAllBooks , getNewAndOldBooks , createBook , delBook , editBook
}
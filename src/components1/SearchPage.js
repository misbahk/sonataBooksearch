import React, { useState } from 'react';
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import books from './images/books.jpg'
import { Card , Modal} from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import './App.css'
 


const SearchPage = (props) => {

   
    const [bookname, setbookname] = useState('');
    const[details,setDetails]=useState('');

  const[perPage, setperPage]= useState(10)
  const[currentPage, setcurrentPage]=useState(0)
  const[offset, setoffset]=useState(0);

const[orgtableData, setorgtableData]=useState([])
const[pageCount,setpageCount]=useState()
const[tableData, settableData]=useState([])


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  


    

              const booksearch=(e)=>{
                setbookname(e.target.value)
                
                    console.log( bookname,"Bookname consooo")
                
            }


const submit=(e)=>{
    axios.get(`https://openlibrary.org/search.json?title=${bookname}`)
.then(
    (res)=>{



      var tdata = res.data.docs;
      console.log('data-->'+JSON.stringify(tdata))
var slice = tdata.slice(offset, 
         offset + perPage)
   
          setpageCount(Math.ceil(tdata.length / perPage))
          setorgtableData (tdata)
          settableData(slice)
  
        // setData(result.data.docs)
        // console.log(result.data)
    })
}


const handlePageClick=(e)=>{
  const selectedPage = e.selected;
  const offset = selectedPage * perPage;

  setcurrentPage(selectedPage)
  setoffset(offset)
  
    loadMoreData()


}

 const loadMoreData=(e) =>{
  const data = orgtableData;
  
  const slice = data.slice(offset, offset + perPage)

    setpageCount(Math.ceil(data.length / perPage))
    settableData(slice)


  }


  
  return (
    
    <>

    <div style={{width:"100%",height:"max-content",backgroundColor:"#ebc9e0"}}> 
          <center >  
         
    <div style={{position:"sticky", top:"0"}}>
         
 <img class="img-fluid" style={{width:"100%", height:"33rem"}} src={books} alt="booksPhoto"/>

<span style={{position:"absolute", top:"50%", left:"50%", transform:"translate(-50%, -50%)"}}>
   <h1 style={{textShadow:"1px 5px 3px #202020", color:"#ffff"}}>Search your Books and Authors here</h1>


<input placeholder='Search books here...'
onChange={booksearch}
style={{boxShadow:" 1px 2px 21px 7px #d77ebb", width:"22rem", border:"0", borderRadius:"19px", height:"37px", fontSize:"17px"}}
    
    />
  <BsSearch onClick={submit}
   style={{color:"#8b85e3", marginLeft:"-2rem", cursor:"pointer"}}/>
</span>
</div>
    </center>


    <br/>

<div>

<table class="table">
  <thead>
    <tr>
 
      <th scope="col" style={{color:"#6c0478", fontSize:"18px"}}>Book Name</th>
      <th scope="col"style={{color:"#6c0478", fontSize:"18px"}}>Author Name</th>
      <th scope="col"style={{color:"#6c0478", fontSize:"18px"}}>Language </th>
      <th scope="col"style={{color:"#6c0478", fontSize:"18px"}}> Time</th>

    </tr>
  </thead>

  {tableData.map(item => {
      return(
  <tbody>
<tr> 
      <td key={item.title} style={{fontSize:"15px"}}>   {item.title}</td>
      <spam onClick={handleShow}>
      <td onClick={()=>{
setDetails(item);
      } } style={{fontSize:"15px", cursor:"pointer"}}>{item.author_name}</td>
      <td style={{fontSize:"15px"}}>{item.language}</td>
      </spam>

     <td style={{fontSize:"15px"}}>{item.time}</td>

      </tr>
      
 
  </tbody>
  
        ) })}


</table>



</div>
  </div>


<Modal show={show} onHide={handleClose} closeButton>
   
       
        <Card style={{ width: '29rem', border:"0" }}>


  <Card.Body>
    <Card.Title style={{color:"rgb(213 16 98)", borderRadius:"10px", boxShadow:"0px 4px 16px 1px #1e3aa1", fontSize:"26px",
border:"1px solid #767474", textAlign:"left", padding:"4px"}}>
    Author Details</Card.Title>

    <spam>
    <label style={{color:"rgb(24 14 177)", fontSize:"19px", fontWeight:"500"}}>  
   1. AUTHOR KEY:</label> <p style={{color:"rgb(17 113 213)", fontSize:"18px", marginTop:"2px", 
   fontWeight:"500",marginRight:"5rem"}}>{details.author_key}</p>
  
    </spam>

    <spam>
    <label style={{color:"rgb(24 14 177)", fontSize:"19px", fontWeight:"500"}}>  
 2. Author Facet: </label> <p style={{color:"rgb(17 113 213)", fontSize:"18px", marginTop:"2px", fontWeight:"500"
    ,marginRight:"5rem"}}>{details.author_facet}</p>
  
    </spam>

    <spam>
    <label style={{color:"rgb(24 14 177)", fontSize:"19px", fontWeight:"500"}}>  
   3. Edition Key: </label> <p style={{color:"rgb(17 113 213)", fontSize:"18px", marginTop:"2px", 
   fontWeight:"500",marginRight:"5rem"}}>{details.edition_key}</p>
  
    </spam>

    <spam>
    <label style={{color:"rgb(24 14 177)", fontSize:"19px", fontWeight:"500"}}>  
   4. Author Alternative Name: </label> <p style={{color:"rgb(17 113 213)", fontSize:"18px", 
   marginTop:"2px", fontWeight:"500"
    ,marginRight:"5rem"}}>{details.author_alternative_name}</p>
  
    </spam>

  </Card.Body>
</Card>
        
        <Modal.Footer>


        <span style={{padding:"15px", border:"1px solid rgb(237 173 212)", borderRadius:"30px"}}>
    <button   onClick={handleClose} style={{backgroundColor:"#e13762", color:"#ffff", borderRadius:"20px", padding:"4px 24px", border:"0"}}>
    Close</button>   
    </span>


    
        </Modal.Footer>
      </Modal>



      <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>

    </>
   );
}



 

export default SearchPage

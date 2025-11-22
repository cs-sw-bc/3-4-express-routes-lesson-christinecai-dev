import express from "express";
import books from "./data/books.json" with {type:'json'};

const app = express();
const PORT = 3000;

/* ---------------------------------------------
   SERVER LISTEN
---------------------------------------------- */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`This library has ${books.length} books`)
});

app.get('/books', (req, res)=>{
  console.log("New request received");
  let result = [...books]; 

  if(req.query.maxPages){
      result = [result.find(book => book.pageCount <= req.query.maxPages)];
      //from the result, find the books that have a page count less than/equal to maxPages(requested by user)
  }

  if(req.query.minYear){
    result = [result.find(book => book.year >= req.query.minYear)];
  }

  res.json(result); 
});

app.get('/books/:id',(req,res)=>{
  //if, else, while, for
  let searchId = Number(req.params.id);
  console.log(searchId);
  let result = null;

  // FILTER functionm - goes through a list of objects and find your object based on your condition.

  result = books.find((book)=>book.id==searchId);
  //From the list of books
  //Find the book(book) 
  //which has an id(book.id) equals to the searchID

  // Declarative/functional programming
  // this is going to empty

  //display result 
  if(result){
    //result variable is not null
    res.json(result);
  }else{
  //404
  res.status(404).send("The book you are looking for does not exist");
  }

  


  //for loop,
  /*
  for(let i=0;i<books.length;i++){
    console.log(books[i].id);
    //search for id
      if(books[i].id == searchId){
        console.log(books[i].id+"Found");
        result=books[i];
        break;
      }
  }
  */
});

app.get("/books/:id/author",(req,res)=>{
  let searchId = Number(req.params.id);
  let result = books.find((book)=>book.id==searchId); //find the book
  //display result 
  if(result){
    res.json(result.author); //result's author
  }else{
  //404
  res.status(404).send("The book you are looking for does not exist");
  }
});

//books/:id/reviews -> should return a books reviews
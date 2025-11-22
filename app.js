import express from "express";
import books from "./data/books.json" with {type:'json'} //books is customizable but with third party package like express we must use express while importing


const app = express();
const PORT = 3000;

/* ---------------------------------------------
   SERVER LISTEN
---------------------------------------------- */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`This library has ${books.length} books`)
});


app.get('/books',(req,res)=>{
  //copy it to a different variable
  //let results = books;//if you change books, results will also change
  let result = [...books]; //it will copy books to results and unlink them. If you change result, books will not change

  if(req.query.maxPages){
      result = [result.find(book => book.pageCount <= req.query.maxPages)];
      //from the result, find the books that have a page count less than/equal to maxPages(requested by user)
  }

  if(req.query.minYear){
    result = [result.find(book => book.year >= req.query.minYear)];
  }


  res.json(result);
  // res.send(result);//send a string
});

app.get('/books/:id',(req,res)=>{
  let searchId = Number(req.params.id);
  let result = null;
  // //step 1: write a for loop
  // for(let i=0; i<books.length; i++){
  //   //search for id
  //   if(books[i].id == searchId){
  //     result = books[i];
  //     break;
  //   }
  // }

  //cleaner way: filter function - goes through a list of objects and find your object based on your condition

  result = books.find((book)=>book.id == searchId); //Declarative programming/ functional programming
  //From the list of books, find the book which has an id equals to the searchID


  // //display result

  if(result){
    //result variable is not null
    res.json(result);
  }else{
    //404
    res.status(404).send("The book you are looking for does not exist");
  }  
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

//books/:id/reviews -> should return a books reviewsau
import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Book from "../../components/Book";
import Axios from "axios";
import { ContainerBooks } from "./styles";
const Gallery = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

  async function getBooks() {
    const url = "http://localhost:3000/api/v1/book/";
    try {
      const response = await Axios.get(url, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response.data.books);
      setBooks(response.data.books);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Header />
      <ContainerBooks>
        Gallery
        {books.map((book, index) => (
          <Book
            image={book.book_cover}
            title={book.title}
            showInfo={book.description}
            id={book.id}
            refreshBooks={getBooks}
            key={index}
          />
        ))}
        {/* <Book
          image={books[1].book_cover}
          title={books[1].title}
          showInfo={books[1].description}
        />
        <Book
          image={books[2].book_cover}
          title={books[2].title}
          showInfo={books[2].description}
        /> */}
      </ContainerBooks>
      <Footer />
    </>
  );
};

export default Gallery;

import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import GET_BOOKS from '../Queries/GET_DATA'
import gql from 'graphql-tag';

export default function Books(props) {

	const [books, setBooks] = useState([])
	const client = useApolloClient();
	const dataTitle = React.createRef();
	const dataAuthor = React.createRef();
	const dataDescription = React.createRef();

	const { loading, error, data } = useQuery(GET_BOOKS);

	useEffect(() => {
		if (data) setBooks(data.books)
	}, [data]);
	
	if (error) throw new error()

	const deleteBook = async (_id) => {
		const deletedBook = await client.mutate({
			variables: { _id },
			mutation: gql`
        mutation deleteBook($_id: String){
          deleteBook(_id: $_id) { id }
        }
    `,
		})
		const deletedId = await deletedBook.data.deleteBook.id;
		setBooks(books.filter(book => book.id !== deletedId))
	}

	const addBook = async () => {
		const res = await client.mutate({
			variables: {
				title: dataTitle.current.value,
				author: dataAuthor.current.value,
				description: dataDescription.current.value
			},
			mutation: gql`
        mutation addBook($title: String, $author: String, $description: String){
          addBook(title: $title, author: $author, description: $description) {
            id
            title
            author
            description
          }
        }
    `,
		})

		const book = await res.data.addBook;
		setBooks([...books, book]);
	}

	if (loading) {
		return <p>Loading...</p>
	} else if (books.length > 0) {
		return (
			<div>
				<input ref={dataTitle} placeholder="Title" />
				<br />
				<input ref={dataAuthor} placeholder="Author" />
				<br />
				<input ref={dataDescription} placeholder="Description" />
				<br />
				<button onClick={() => addBook()}>Send</button>
				<br />
				<p id="req-response">request's response goes here...</p>
				{books.map(books =>
					<div key={books.id}>
						<h3 style={{ display: "inline" }}>{books.title}</h3>
						<Button onClick={() => deleteBook(books.id)} style={{
							background: "#000",
							color: "#fff",
							marginLeft: 10
						}}>X</Button>
						<p>{books.author}</p>
						<i>{books.description}</i>
					</div>
				)}
			</div>
		)
	} else return null
}
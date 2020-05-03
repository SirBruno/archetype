import React from 'react';
import { Button } from '@material-ui/core';

export default function Books(props) {

	return (
		<div>
			{props.books.map(books =>
				<div key={books.id}>
					<h3 style={{ display: "inline" }}>{books.title}</h3>
					<Button onClick={() => props.deleteBook(books.id)} style={{
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
}
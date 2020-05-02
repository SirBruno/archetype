import React, { useState, useEffect, useContext } from 'react';
import ApolloClient, { gql } from 'apollo-boost';
import EnvContext from '../Contexts/EnvContext';

export default function Books() {

	const [books, setBooks] = useState([]);
	const lastId = books[books.length - 1]?.id;
	const uri = useContext(EnvContext);

	useEffect(() => {

		const client = new ApolloClient({ uri });

		client.query({
			query: gql`
                {
									books {
										id
										title
										author
										description
									}
                }
            `
		}).then(result => {
			setBooks(result.data.books);
			console.log(lastId);
		});
	}, [lastId, uri]);

	return (
		<div>
			{books.map(books =>
				<div key={books.id}>
					<h3>{books.title}</h3>
					<p>{books.author}</p>
					<i>{books.description}</i>
				</div>
			)}
		</div>
	)
}
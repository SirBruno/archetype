import gql from 'graphql-tag';

const GET_BOOKS = gql`
{
  books {
    id
    title
    author
    description
  }
}
`

export default GET_BOOKS;
const {gql} = require('apollo-server-express');

const schema = gql`
{
    books {
        id
        title
        author
        description
    }
}
`

module.exports = schema;
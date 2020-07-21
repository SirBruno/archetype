const axios = require("axios")

test('Check if a query is returning \'OK\'', () => {
  return axios({
    url: 'http://archetypeofficial.herokuapp.com/graphql',
    method: 'post',
    data: {
      query: `
        query {
          posts {
            id
          }
        }
        `
    }
  }).then(res => {
    expect(res.status).toBe(200);
  });
});
const axios = require("axios")

test('Check if a query is returning \'OK\'', () => {
  return axios({
    url: 'http://localhost:4000/graphql',
    method: 'post',
    data: { query: `query { posts( pageSize: 10) { hasMore cursor posts { id } } }` }
  }).then(res => { expect(res.status).toBe(200) })
})

test('Check if adding a Report is working', async () => {

  let req = await axios({
    url: 'http://localhost:4000/graphql',
    method: 'post',
    data: { query: `mutation {
      addReport (
        postId: "Post Test DELETE AFTER"
        userId: "User Test DELETE AFTER"
        reportTitle: "Post ofensivo"
        reportBody: "O post contém material ofensivo."
      ) {
        id
        postId
        commentId
        userId
        reportTitle
        reportBody
        solved
      }
    }` }
  }).then(res => {
    expect(res.data.data.addReport.postId).toBe("Post Test DELETE AFTER"),
    expect(res.data.data.addReport.userId).toBe("User Test DELETE AFTER"),
    expect(res.data.data.addReport.reportTitle).toBe("Post ofensivo"),
    expect(res.data.data.addReport.reportBody).toBe("O post contém material ofensivo.");
    return res;
  });

  return axios({
    url: 'http://localhost:4000/graphql',
    method: 'post',
    data: { query: `mutation {
      deleteReport (
        _id: "${req.data.data.addReport.id}"
        ) {
          id
        }
    }`}}).then(res => {
      expect(res.data.data.deleteReport.id).toBe(req.data.data.addReport.id);
      return res;
  });

})
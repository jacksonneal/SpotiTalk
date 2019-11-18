function forumSearch(query) {
    const obj = [{
        id: 1,
        content: "This is an example post",
        comments: [
            {
                id: 1,
                content: "Wow greate post."
            }
        ]
    }];
    return new Promise(resolve => resolve(obj));
};

function createPost(post) {

}

function deletePost(post) {

}

function updatePost(post) {

}

function createComment(comment) {
    // Add comment object
}

function deleteComment(comment) {

}

function updateComment(comment) {

}

module.exports = {
    forumSearch
}
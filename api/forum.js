function search(query) {
    return {
        id: 1,
        content: "This is an example post",
        comments: [
            {
                id: 1,
                content: "Wow greate post."
            }
        ]
    };
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

export default { search, createPost, deletePost, updatePost, createComment, deleteComment, updateComment }
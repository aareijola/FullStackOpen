const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let sum = 0
    blogs.forEach(blog => {
        sum += blog.likes
    });
    return sum
}

const favoriteBlog = (blogs) => {
    let topBlog = {likes: -1}
    blogs.forEach(blog => {
        if (blog.likes > topBlog.likes) {
            topBlog = blog
        }
    })
    return topBlog.likes >= 0 ? topBlog : {}
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
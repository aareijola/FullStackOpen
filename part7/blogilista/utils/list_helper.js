const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let sum = 0
    blogs.forEach(blog => {
        sum += blog.likes
    })
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

const mostBlogs = (blogs) => {
    let topAuthor = {
        author: "",
        blogs: 0
    }
    let authors = []
    blogs.forEach(blog => {
        if (!authors.find(a => a.author === blog.author)) {
            authors = authors.concat({
                author: blog.author,
                blogs: 1
            })
        } else {
            authors = authors.map(a => a.author === blog.author
                ? {...a, blogs: a.blogs + 1}
                : a
                )
        }
    })
    authors.forEach(author => {
        if (author.blogs > topAuthor.blogs) {
            topAuthor = author
        }
    })
    return (topAuthor.blogs > 0) ? topAuthor : {}
}

const mostLikes = (blogs) => {
    let topAuthor = {
        author: "",
        likes: 0
    }
    let authors = []
    blogs.forEach(blog => {
        if (!authors.find(a => a.author === blog.author)) {
            authors = authors.concat({
                author: blog.author,
                likes: blog.likes
            })
        } else {
            authors = authors.map(a => a.author === blog.author
                ? {...a, likes: a.likes + blog.likes}
                : a
                )
        }
    })
    authors.forEach(author => {
        if (author.likes > topAuthor.likes) {
            topAuthor = author
        }
    })
    return (topAuthor.likes > 0) ? topAuthor : {}
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
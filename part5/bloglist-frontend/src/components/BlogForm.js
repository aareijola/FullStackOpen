import react, {useState} from "react"

const NewBlogForm = ({createBlog}) => {
    const [newBlog, setNewBlog] = useState(null)
    
    const addBlog = (event) => {
        event.preventDefault()
        createBlog(newBlog)
        setNewBlog(null)
    }

    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={addBlog}>
                <div>
                title:
                    <input
                    type="text"
                    name="title"
                    onChange={({target}) => setNewBlog({...newBlog, title: target.value})}
                    />
                </div>
                <div>
                author:
                    <input
                    type="text"
                    name="author"
                    onChange={({target}) => setNewBlog({...newBlog, author: target.value})}
                    />
                </div>
                <div>
                url:
                    <input
                    type="text"
                    name="url"
                    onChange={({target}) => setNewBlog({...newBlog, url: target.value})}
                    />
                </div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default NewBlogForm
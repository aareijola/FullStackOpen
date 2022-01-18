import react from "react"

const NewBlogForm = ({onSubmit}) => {
    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={onSubmit}>
                <div>
                title:
                    <input
                    type="text"
                    name="title"
                    />
                </div>
                <div>
                author:
                    <input
                    type="text"
                    name="author"
                    />
                </div>
                <div>
                url:
                    <input
                    type="text"
                    name="url"
                    />
                </div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default NewBlogForm
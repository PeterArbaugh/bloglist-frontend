const BlogForm = ({ 
    onSubmit, 
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange, 
    titleValue,
    authorValue,
    urlValue
 }) => {
    return (
        <form onSubmit={onSubmit}>
        <div>
          title:
            <input
              type="text"
              value={titleValue}
              name="Title"
              onChange={handleTitleChange}
              />
        </div>
        <div>
          author
            <input
              type="text"
              value={authorValue}
              name="Author"
              onChange={handleAuthorChange}
              />
        </div>
        <div>
          url
            <input
              type="text"
              value={urlValue}
              name="Url"
              onChange={handleUrlChange}
              />
        </div>
        <button type='submit'>Create</button>
      </form>
    )
}

export default BlogForm
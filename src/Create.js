import { useState } from "react";
import { useHistory } from 'react-router-dom'

const Create = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('Kibria');
    const history = useHistory();

    const [ispending, setIsPending] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body, author };
        

        setIsPending(true);

        fetch(`http://localhost:8000/blogs`, {
            method: 'POST',
            headers: { "content-type": "application/json" },
            body: JSON.stringify(blog)
        }).then(() => {
            setIsPending(false)
            history.push('/');
        })

    }

    return ( 
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit = {handleSubmit}>
                <label>Blog Title:</label>
                <input 
                    type="text"
                    required
                    value={title}
                    onChange = {(e) => setTitle(e.target.value)}
                    />

                <label>Blog Contents:</label>
                <textarea 
                    required
                    value={body}
                    onChange = {(e) => setBody(e.target.value)}
                >
                </textarea>
                <label>Blog Author:</label>
                <select
                    value = {author}
                    onChange = {(e) => setAuthor(e.target.value)}
                >
                    <option value="Kibria">Kibria</option>
                    <option value="Shuvo">Shuvo</option>
                </select>
                { !ispending && <button>Add Blog</button> }
                { ispending && <button disabled>Adding Blog...</button> }
            </form>
        </div>
     );
}
 
export default Create;
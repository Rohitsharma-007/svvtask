import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

const fetchTodos = async (userId) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos?userId=${userId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }
  return response.json();
};

const fetchPosts = async (userId) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};

const fetchComments = async (postId) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }
  return response.json();
};
const UserDetails = () => {
  const { id } = useParams();
  const [todos, setTodos] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  const fetchData = async () => {
    try {
      const todosData = await fetchTodos(id);
      setTodos(todosData);

      const postsData = await fetchPosts(id);
      setPosts(postsData);

      if (postsData.length > 0) {
        const commentsData = await fetchComments(postsData[0].id);
        setComments(commentsData);
      }
    } catch (error) {
      console.error("Error fetching additional data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {
        <div>
          <Card className="m-3">
            <h4 className="m-3">Todos</h4>
            <ul>
              {todos.map((todo) => (
                <li key={todo.id}>{todo.title}</li>
              ))}
            </ul>
          </Card>
          <Card className="m-3 overflow-hidden">
            <h4 className="m-3">Posts</h4>
            <ul>
              {posts.map((post) => (
                <li key={post.id}>{post.title}</li>
              ))}
            </ul>
          </Card>
          <Card className="m-3 overflow-hidden">
            <h4 className="m-3">Comments</h4>
            <ul>
              {comments.map((comment) => (
                <li key={comment.id}>{comment.body}</li>
              ))}
            </ul>
          </Card>
        </div>
      }
    </div>
  );
};

export default UserDetails;

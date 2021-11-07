import { useEffect, useState } from 'react';
import map from 'lodash.map';
import { Button, Row, Container, Modal, Form, Table } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [id, setId] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [showUpdate, setShowUpdate] = useState(false);
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState();

  const getAllPosts = async () => {
    fetch('http://localhost:5000/posts')
      .then(response => response.json())
      .then(data => setPosts(data));
  }



  const addPost = async () => {

    await fetch('http://localhost:5000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        description: description
      })
    }).then(() => {
      window.location.reload(false);
    });
  }


  const deletePost = async (id) => {
    fetch(`http://localhost:5000/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(() => {
      window.location.reload(false);
    })
  }


  const updatePost = async () => {

    fetch(`http://localhost:5000/posts/${id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({
        title: title,
        description: description
      })
    }).then(() => setShowUpdate(false)).then(() => {
      window.location.reload(false);
    });

  }

  const setData = (post) => {
    setId(post._id);
    setTitle(post.title);
    setDescription(post.description);
    setShowUpdate(true)


  }

  useEffect(() => {
    getAllPosts();
  }, [])


  return (
    <div className="App">
      <Container className='container-posts'>
        <Row className='post-row'><Button className='btn-success button-green' onClick={() => setShow(true)}>Add Post</Button></Row>
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control required size="lg" type="text" onChange={(e) => setTitle(e.target.value)} placeholder="Post Title" />
            <br />
            <Form.Control required size="lg" type="text" onChange={(e) => setDescription(e.target.value)} placeholder="Post Description" />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(true)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => addPost()}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showUpdate} onHide={() => setShowUpdate(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Update Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control required size="lg" value={title} type="text" onChange={(e) => setTitle(e.target.value)} placeholder="Post Title" />
            <br />
            <Form.Control required size="lg" value={description} type="text" onChange={(e) => setDescription(e.target.value)} placeholder="Post Description" />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowUpdate(true)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => updatePost()}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Post ID</th>
              <th>Title</th>
              <th>Description</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {map(posts, (post) => {
              return <tr key={post._id}>
                <td>{post._id}</td>
                <td>{post.title}</td>
                <td>{post.description}</td>
                <td><Button className='btn-primary btn-sm' onClick={() => setData(post)}>Update Post</Button></td>
                <td><Button className='btn-danger btn-sm' onClick={() => deletePost(post._id)}>Delete Post</Button></td>
              </tr>

            })}
          </tbody>
        </Table>



      </Container>

    </div>
  );
}

export default App;

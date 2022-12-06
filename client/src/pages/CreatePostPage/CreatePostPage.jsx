import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import * as postAPI from "../../utilities/post-api";

export default function CreatePostPage() {
  const [post, setPost] = useState({
    code: "",
    title: "",
    description: "",
    public: false
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handlePublic = (e) => {
      setPost({...post, public:e.target.checked})
  }

  const handleSave = async (e) => {
    e.preventDefault();
    await postAPI.createNewPost(post);
    navigate("/myposts");
  };

  return (
    <>
      <div style={{ width: "70%", margin: "50px auto" }}>
        <Form onSubmit={(e) => handleSave(e)}>
          <InputGroup size="lg" className="mb-3">
            <Form.Control
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              placeholder="Title"
              value={post.title}
              required
              maxLength="65"
              name="title"
              onChange={handleChange}
              style={{backgroundColor: '#d7eefa'}}
            />
          </InputGroup>
          <FloatingLabel
            controlId="floatingTextarea"
            label="Description"
            className="mb-3"
          >
            <Form.Control
              as="textarea"
              placeholder="Description"
              value={post.description}
              name="description"
              required
              onChange={handleChange}
              style={{height:'100px', backgroundColor: '#d7eefa', cursor:'initial'}}
            />
          </FloatingLabel>

          <InputGroup className="mb-3">
            <Form.Check type="switch" id="custom-switch" onClick={handlePublic} label="Public" value={post.public}/>
          </InputGroup>

          <CodeEditor
            value={post.code}
            language="js"
            placeholder="Paste snipped here"
            onChange={handleChange}
            name="code"
            required
            padding={15}
            style={{
              fontSize: 12,
              height:'400px',
              backgroundColor: "#0D004D",
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            }}
          />
          <Button variant="primary" type="submit" size="lg" style={{marginTop:'15px'}}>
            Save
          </Button>
        </Form>
      </div>
    </>
  );
}

import React, { useState } from "react";
import axios from "axios";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const AdminBlogEditor = () => {

  const [title,setTitle] = useState("");
  const [excerpt,setExcerpt] = useState("");
  const [image,setImage] = useState("");
  const [tags,setTags] = useState("");
  const [content,setContent] = useState("");
  const [published,setPublished] = useState(true);
  const [loading,setLoading] = useState(false);

  const submitBlog = async () => {

    try{

      setLoading(true);

      const token = localStorage.getItem("token");

      await axios.post("/api/blog",
      {
        title,
        excerpt,
        image,
        tags,
        content,
        published
      },
      {
headers:{
 Authorization: `Bearer ${token}`
}
      });

      alert("Blog Published Successfully 🚀");

      setTitle("");
      setExcerpt("");
      setImage("");
      setTags("");
      setContent("");

    }catch(err){

      console.error(err);
      alert("Error publishing blog");

    }

    setLoading(false);

  };

  return (

    <div className="min-h-screen bg-gray-100 py-20">

      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl p-10">

        <h1 className="text-3xl font-bold mb-8">
          Create Blog Post ✍
        </h1>

        {/* TITLE */}
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        {/* EXCERPT */}
        <textarea
          placeholder="Short description"
          value={excerpt}
          onChange={(e)=>setExcerpt(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        {/* IMAGE URL */}
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e)=>setImage(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        {/* TAGS */}
        <input
          type="text"
          placeholder="Tags (react,nodejs,mern)"
          value={tags}
          onChange={(e)=>setTags(e.target.value)}
          className="w-full border p-3 rounded mb-6"
        />

        {/* MARKDOWN EDITOR */}
        <SimpleMDE
          value={content}
          onChange={setContent}
        />

        {/* PUBLISH */}
        <div className="mt-6 flex items-center gap-4">

          <label className="flex items-center gap-2">

            <input
              type="checkbox"
              checked={published}
              onChange={()=>setPublished(!published)}
            />

            Publish Now

          </label>

        </div>

        <button
          onClick={submitBlog}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          {loading ? "Publishing..." : "Publish Blog"}
        </button>

      </div>

    </div>

  );
};

export default AdminBlogEditor;
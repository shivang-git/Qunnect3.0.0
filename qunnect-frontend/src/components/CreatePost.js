import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../features/posts/postSlice";
import { AiOutlineClose } from "react-icons/ai";


const PostSchema = Yup.object({
  text: Yup.string().required("Required"),
  postImage: Yup.mixed().required("Required"),
});

const CreatePost = () => {
  const dispatch = useDispatch();
  const [imagePreview, setimagePreview] = useState(null);
  const fileInputRef = React.useRef(null);

  const formik = useFormik({
    initialValues: {
      text: "",
      postImage: null || undefined,
    },
    validationSchema: PostSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("text", values.text);
      formData.append("postImage", values.postImage);
      dispatch(createPost(formData))
        .unwrap()
        .then(() => {
          formik.resetForm();

          if (fileInputRef.current) {
            fileInputRef.current.value = null;
          }
          setimagePreview(null);
        })
        .catch((error) => {
          console.error("Error creating post:", error);
        });
    },
  });


  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file.type.startsWith('image/')) {
      formik.setFieldValue("postImage", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setimagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select an image file.');
    }
  };

  const handleDeleteImage = () => {
    setimagePreview(null);
    formik.setFieldValue("postImage", null);
  };

  return (
    <>
      <form
        className="bg-white shadow rounded-lg mb-6 p-4 w-1/2"
        onSubmit={formik.handleSubmit}
      >
        <textarea
          name="text"
          id="text"
          placeholder="Type something..."
          className=" focus:outline-none  w-full rounded-lg p-2 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400"
          value={formik.values.text}
          onChange={formik.handleChange("text")}
          onBlur={formik.handleBlur("text")}
        ></textarea>

        {imagePreview && (
          <div className="mt-4 relative w-36 h-36 bg-gray-100 border border-gray-300 rounded-lg shadow-md overflow-hidden">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={handleDeleteImage}
              className="absolute top-1 right-1 bg-white rounded-full p-1 text-gray-600 hover:text-gray-900"
            >
              <AiOutlineClose />
            </button>
          </div>
        )}
        <footer className="flex justify-between mt-2">
          <div className="flex gap-2">
            <label htmlFor="postImage">
              <span className="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer">
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="css-i6dzq1"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                <input
                  id="postImage"
                  name="postImage"
                  type="file"
                  className="sr-only"
                  onChange={handleFileChange}
                  onBlur={formik.handleBlur("postImage")}
                />
              </span>
            </label>
            <span className="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="css-i6dzq1"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </span>
            <span className="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="css-i6dzq1"
              >
                <polyline points="4 17 10 11 4 5"></polyline>
                <line x1="12" y1="19" x2="20" y2="19"></line>
              </svg>
            </span>
          </div>
          <button
            type="submit"
            className="flex items-center py-2 px-4 rounded-lg text-sm bg-blue-600 text-white shadow-lg"
          >
            Send
            <svg
              className="ml-1"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </footer>
      </form>
    </>
  );
};

export default CreatePost;

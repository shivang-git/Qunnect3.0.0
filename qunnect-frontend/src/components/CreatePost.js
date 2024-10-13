'use client'

import React, { useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createPost } from "../features/posts/postSlice";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { X, Image, MapPin, Smile } from "lucide-react";

const PostSchema = Yup.object().shape({
  text: Yup.string().required("Required"),
  postImage: Yup.mixed().required("Required"),
});

const  CreatePost=()=> {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      text: "",
      postImage: null,
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
          setImagePreview(null);
        })
        .catch((error) => {
          console.error("Error creating post:", error);
        });
    },
  });

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file && file.type.startsWith('image/')) {
      formik.setFieldValue("postImage", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select an image file.');
    }
  };

  const handleDeleteImage = () => {
    setImagePreview(null);
    formik.setFieldValue("postImage", null);
  };

  return (
    (<Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-4">
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <Textarea
            placeholder="What's on your mind?"
            className="w-full min-h-[100px] resize-none"
            {...formik.getFieldProps('text')} />
          {imagePreview && (
            <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="absolute top-2 right-2"
                onClick={handleDeleteImage}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current.click()}>
                <Image className="h-4 w-4 mr-2" />
                Photo
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*" />
              <Button type="button" variant="outline" size="sm">
                <MapPin className="h-4 w-4 mr-2" />
                Location
              </Button>
              <Button type="button" variant="outline" size="sm">
                <Smile className="h-4 w-4 mr-2" />
                Feeling
              </Button>
            </div>
            <Button type="submit">Post</Button>
          </div>
        </form>
      </CardContent>
    </Card>)
  );
}

export default CreatePost
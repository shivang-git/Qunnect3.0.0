import React, { useState, useRef } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { X, Upload, Camera, Edit2 } from 'lucide-react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Label } from "../components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog"

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  bio: Yup.string().max(200, 'Bio must be 200 characters or less'),
  links: Yup.string().url('Must be a valid URL'),
})

export default function EditProfile({ isOpen, onClose, initialValues }) {
  const [profilePhoto, setProfilePhoto] = useState(initialValues.profilePhoto)
  const [backgroundPhoto, setBackgroundPhoto] = useState(initialValues.backgroundPhoto)
  const fileInputRef = useRef(null)

  const handleSubmit = (values) => {
    console.log({ ...values, profilePhoto, backgroundPhoto })
    onClose()
  }

  const handlePhotoChange = (event, setPhoto) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhoto(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handlePhotoChange({ target: { files: e.dataTransfer.files } }, setBackgroundPhoto)
    }
  }

  const triggerFileInput = (e) => {
    e.preventDefault()
    fileInputRef.current.click()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[1024px] p-0">
        <DialogHeader className="p-6 bg-secondary">
          <DialogTitle className="text-2xl font-bold">Edit Profile</DialogTitle>
        </DialogHeader>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col md:flex-row p-6 gap-6">
              <div className="md:w-1/3 space-y-6">
                <div className="space-y-4">
                  <Label>Profile Photo</Label>
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src={profilePhoto} alt="Profile" />
                      <AvatarFallback>
                        {initialValues.firstName[0]}
                        {initialValues.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <label htmlFor="profile-photo-upload" className="cursor-pointer">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <Camera className="h-4 w-4" />
                        Change Photo
                      </div>
                      <input
                        id="profile-photo-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handlePhotoChange(e, setProfilePhoto)}
                      />
                    </label>
                  </div>
                </div>
                <div className="space-y-4">
                  <Label>Profile Background</Label>
                  <div
                    className="flex justify-center rounded-lg border border-dashed border-input p-4 relative h-48"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    {backgroundPhoto ? (
                      <div className="absolute inset-0 w-full h-full">
                        <img
                          src={backgroundPhoto}
                          alt="Background"
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={triggerFileInput}
                          >
                            <Edit2 className="h-4 w-4 mr-2" />
                            Change Background
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                        <div className="mt-4 flex flex-col text-sm leading-6 text-muted-foreground">
                          <label
                            htmlFor="background-upload"
                            className="relative cursor-pointer rounded-md bg-background font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary/80"
                          >
                            <span>Upload a file</span>
                          </label>
                          <p className="mt-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-muted-foreground mt-2">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      id="background-upload"
                      name="background-upload"
                      type="file"
                      className="hidden"
                      onChange={(e) => handlePhotoChange(e, setBackgroundPhoto)}
                      accept="image/*"
                    />
                  </div>
                </div>
              </div>
              <div className="md:w-2/3 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Field
                      as={Input}
                      id="firstName"
                      name="firstName"
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && touched.firstName && (
                      <p className="text-sm text-destructive">{errors.firstName}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Field
                      as={Input}
                      id="lastName"
                      name="lastName"
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && touched.lastName && (
                      <p className="text-sm text-destructive">{errors.lastName}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Field
                    as={Textarea}
                    id="bio"
                    name="bio"
                    placeholder="Write a few sentences about yourself"
                    className="h-32"
                  />
                  {errors.bio && touched.bio && (
                    <p className="text-sm text-destructive">{errors.bio}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="links">Links</Label>
                  <Field
                    as={Input}
                    id="links"
                    name="links"
                    placeholder="Other Social Profiles"
                  />
                  {errors.links && touched.links && (
                    <p className="text-sm text-destructive">{errors.links}</p>
                  )}
                </div>
                <div className="flex justify-end gap-4 pt-4">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}
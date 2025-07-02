import { useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { usePostStore } from "../../store/usePostStore";
import { Loader, X } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const CreatePostPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    content: "",
    coverImg: null,
    contentImages: [],
    category: [],
  });
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const quillRef = useRef(null);

  const { isLoading, createNewPost, createdPost, error } = usePostStore();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const handleCoverImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const options = {
          maxSizeMB: 2,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);

        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prev) => ({
            ...prev,
            coverImg: reader.result,
          }));
          setCoverImagePreview(reader.result);
        };
        reader.readAsDataURL(compressedFile);
      } catch (e) {
        toast.error("Error compressing image");
        console.error(e);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.desc ||
      !formData.content ||
      !formData.category ||
      !formData.coverImg
    ) {
      toast.error("All fields are required");
      return;
    }

    try {
      const postData = {
        title: formData.title,
        desc: formData.desc,
        content: formData.content,
        category: formData.category,
        coverImg: formData.coverImg,
        contentImg:
          formData.contentImages.length > 0 ? formData.contentImages[0] : null,
      };
      console.log("Submitting data:", postData);
      const newPost = await createNewPost(postData, axiosPrivate);
      if (newPost && newPost.slug) {
        navigate(`/posts/${newPost.slug}`);
        toast.success("Post Created Successfully!");
      } else {
        toast.error("Error creating post: Missing slug");
      }
    } catch (e) {
      console.error("Submission error:", e?.response?.data?.error || e); // Better error logging
      toast.error(error || "Error creating post");
      return;
    }
  };

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        try {
          const options = {
            maxSizeMB: 2,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
          };
          const compressedFile = await imageCompression(file, options);

          const reader = new FileReader();
          reader.onloadend = () => {
            const range = quillRef.current.getEditor().getSelection();
            quillRef.current
              .getEditor()
              .insertEmbed(range.index, "image", reader.result);

            setFormData((prev) => ({
              ...prev,
              contentImages: [...prev.contentImages, reader.result],
            }));
          };
          reader.readAsDataURL(compressedFile);
        } catch (e) {
          toast.error("Error compressing Images");
          console.error(e);
        }
      }
    };
  };

  const quillModules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
        clipboard: {
          matchvisual: false,
        },
        preservewhitespace: true,
      },
    }),
    []
  );

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
  ];

  return (
    <div className="bg-base-200 min-h-screen">
      <div className="max-w-[60rem] mx-auto px-4 py-6">
        <h1 className="text-3xl font-semibold text-center">
          Create a New Post
        </h1>
        <form
          className="flex flex-col items-center py-16 space-y-6"
          onSubmit={handleSubmit}
        >
          {/* Cover Image*/}
          <div className="flex flex-col items-center">
            <input
              className="hidden"
              type="file"
              accept="image/*"
              id="coverImage"
              onChange={handleCoverImage}
            />
            <label
              htmlFor="coverImage"
              className="btn btn-wide bg-base-300 cursor-pointer"
            >
              Upload Cover Image
            </label>
            {coverImagePreview && (
              <div className="relative w-full max-w-xl">
                <img
                  src={coverImagePreview}
                  alt="cover-image-preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 btn btn-circle btn-sm"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, coverImg: null }));
                    setCoverImagePreview(null);
                  }}
                >
                  <X />
                </button>
              </div>
            )}
          </div>
          {/* Post Title */}
          <div className="space-x-6">
            <input
              type="text"
              placeholder="Post Title"
              name="title"
              className="px-16 py-3 rounded-lg text-center"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>
          {/* Category */}
          <div className="space-x-3">
            <label htmlFor="" className="text-sm">
              Choose a category:
            </label>
            <select
              name="category"
              className="p-2 rounded-lg items-center text-center"
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, category: [e.target.value] }))
              }
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="General">General</option>
              <option value="design">Design</option>
              <option value="Team">Team</option>
              <option value="UI/UX">UI/UX</option>
              <option value="AI">AI</option>
              <option value="Interface">Interface</option>
              <option value="Software-Development">Software Development</option>
            </select>
          </div>
          {/* Description */}
          <div className="">
            <textarea
              className="w-[35rem] h-[8rem] p-4 rounded-xl text-start resize-none"
              name="desc"
              placeholder="A Short Description..."
              value={formData.desc}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, desc: e.target.value }))
              }
            />
          </div>
          {/* Markdown */}
          <div className="w-full h-[30rem] pb-16">
            <ReactQuill
              key="quill-editor"
              theme="snow"
              ref={quillRef}
              modules={quillModules}
              formats={quillFormats}
              value={formData.content}
              onChange={(content) =>
                setFormData((prev) => ({ ...prev, content }))
              }
              className="h-full"
            />
          </div>
          {/* Submit Button */}
          <div>
            <button
              className="btn btn-wide bg-base-300"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex justify-center">
                  <Loader />
                </div>
              ) : (
                <div>Submit Post</div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostPage;

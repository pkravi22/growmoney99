import mongoose from "mongoose";
import slugify from "slugify";

const blogSchema = new mongoose.Schema(
  {
    // Blog Title
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Auto-generated slug
    slug: {
      type: String,
      unique: true,
      index: true,
    },

    // Main blog content
    content: {
      type: String,
      required: true,
    },

    // Short summary for previews or SEO
    excerpt: {
      type: String,
      trim: true,
      maxlength: 250,
    },

    // Blog category
    category: {
      type: String,
      trim: true,
      default: "General",
    },

    // Tags array
    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    // Cover image (renamed from thumbnail for frontend consistency)
    coverImage: {
      type: String,
      default: "",
    },

    // Author name
    author: {
      type: String,
      default: "Admin",
    },

    // Estimated reading time in minutes
    readTime: {
      type: Number,
      default: 3,
    },

    // SEO fields
    metaTitle: {
      type: String,
      trim: true,
    },
    metaDescription: {
      type: String,
      trim: true,
      maxlength: 160,
    },

    // Published or draft
    published: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// ✅ Generate slug automatically
blogSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;

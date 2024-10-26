import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "src/content/blog",
        defaultItem: () => ({
          title: "New Post",
          layout: "../layouts/PostDetails.astro",
          pubDatetime: new Date(),
          tags: [],
        }),
        fields: [
          {
            type: "string",
            label: "Title",
            name: "title",
            required: true,
            isTitle: true,
          },
          {
            type: "string",
            label: "Description",
            name: "description",
            required: true,
          },
          {
            type: "string",
            label: "Author",
            name: "author",
            required: true,
          },
          {
            type: "datetime",
            label: "Publication Date",
            name: "pubDatetime",
            required: true,
          },
          {
            type: "string",
            label: "Slug",
            name: "slug",
            required: true,
          },
          {
            type: "boolean",
            label: "Featured",
            name: "featured",
            required: true,
          },
          {
            type: "boolean",
            label: "Draft",
            name: "draft",
            required: true,
          },
          {
            type: "string",
            label: "Tags",
            name: "tags",
            list: true,
            required: false,
          },
          {
            type: "string",
            label: "Canonical URL",
            name: "canonicalURL",
            required: false,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});

import { defineField, defineType } from "sanity";
import { PlayIcon } from '@sanity/icons';

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: PlayIcon,
  fields: [
    defineField({
      name: "id",
      type: "number",
    }),
    defineField({
      name: "name",
      type: "string",
    }),
    defineField({
      name: "username",
      type: "string",
    }),
    defineField({
      name: "email",
      type: "string",
    }),
    defineField({
      name: "image",
      type: "url",
    }),
    defineField({
      name: "bio",
      type: "text",
    }),
    defineField({
        name: "password",
        type: "string",
        hidden: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
  },
});
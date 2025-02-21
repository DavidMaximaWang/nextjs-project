import { defineQuery } from 'next-sanity';

export const STARTUPS_QUERY = defineQuery(`*[_type == "startup" && defined(slug.current) && (!defined($search) || title match $search || category match $search || author->name match $search)]  | order(_createdAt desc) {
  _id,
  title,
  slug,
  _createdAt,
  author -> {
    _id, name, image, bio
  },
  views,
  description,
  category,
  image,
}`);


// import { client } from "@/sanity/lib/client";

// export async function getDraftData() {
//   const query = `*[_type == "post" && _id in path("drafts.**")]`;
//   return await client.fetch(query);
// }
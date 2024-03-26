// src/routes/categories/[name]/+page.server.ts
import { error } from '@sveltejs/kit';
import { getPostsByCategoryIds } from "$lib/helpers/data/posts.js";

export async function load({ params }) {
  const { name } = params;
  const categoriesPost = await getPostsByCategoryIds(name);


  if (!categoriesPost || categoriesPost.length === 0) {
    return {
      status: 404,
      error: `No posts found for category: ${name}`,
    };
  }

  return {
      categoriesPost,
      categoryName: name,
  };
}
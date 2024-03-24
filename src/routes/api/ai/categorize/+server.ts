// Assuming these imports are correct and you have installed the @types/node package for Node.js types
import { json } from "@sveltejs/kit";
import OpenAI from "openai";
import { API_KEY } from "$env/static/private";
import { dbClient } from "$lib/server/db.js";
import {
  categoriesTable,
  postsTable,
  categoriesToPostsTable,
} from "$lib/server/schema";
import { eq } from "drizzle-orm";

const openai = new OpenAI({
  apiKey: API_KEY,
});

// :) a a
async function getCategoryIdBySentiment(sentiment: string): Promise<string> {
  const categories = await dbClient
    .select({ id: categoriesTable.id })
    .from(categoriesTable)
    .where(eq(categoriesTable.name, sentiment))
    .execute();

  if (categories.length === 0) {
    throw new Error(`No category found for sentiment: ${sentiment}`);
  }

  return categories[0].id;
}
export const POST = async (request) => {
  const session = request.locals.session;
  if (!session) return json({ error: true, message: "Not logged in" });

  const { postId } = await request.request.json();
  const posts = await dbClient
    .select({ content: postsTable.content })
    .from(postsTable)
    .where(eq(postsTable.id, postId));

  if (posts.length === 0)
    return json({ error: true, message: "Post not found" });

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are going to categorize a post based on the sentiment it expresses. The categories are as following: sad, comedy, and happy. The number of categories can be maximum of 3. Ensure that the sentiment(s) you give are expressed in only 1 word per sentiment. Just anwer comedy, happy or sad",
      },
      {
        role: "user",
        content: posts[0].content,
      },
    ],
  });

  // :) a a

  const sentiment = completion.choices?.[0]?.message?.content?.trim();
  if (!sentiment) {
    return json({ error: true, message: "Failed to categorize post" });
  }

  const categoryId = await getCategoryIdBySentiment(sentiment);
  // :)a a
  await dbClient.insert(categoriesToPostsTable).values({
    postId: postId,
    categoryId: categoryId,
  });

  return json({ success: true, message: "Post categorized successfully" });
};

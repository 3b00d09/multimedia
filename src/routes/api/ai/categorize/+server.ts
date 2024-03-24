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
import { eq, inArray } from "drizzle-orm";

const openai = new OpenAI({
  apiKey: API_KEY,
});


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

  const categorieRows = await dbClient.select({name: categoriesTable.name}).from(categoriesTable)

  if(categorieRows.length === 0) return json({error: true, message: "Error loading categories."})

  const categories = categorieRows.map((item)=>item.name).join(",")

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          `You are going to categorize a post based on the sentiment it expresses. The categories are as following: ${categories}. The number of categories can be at most 3. Ensure that the sentiment(s) you give are expressed in only 1 word per sentiment.`,
      },
      {
        role: "user",
        content: posts[0].content,
      },
    ],
  });

  

  const _sentiments = completion.choices?.[0]?.message?.content;
  if (!_sentiments) {
    return json({ error: true, message: "Failed to categorize post" });
  }

  const sentiments = _sentiments.split(",").map((el)=> el.trim())

  try {
    const categoryIds = await dbClient
      .select({ id: categoriesTable.id })
      .from(categoriesTable)
      .where(inArray(categoriesTable.name, sentiments));

    const newEntries = categoryIds.map((item) => {
      const row: typeof categoriesToPostsTable.$inferInsert = {
        postId: postId,
        categoryId: item.id,
      };
      return row;
    });

    await dbClient.insert(categoriesToPostsTable).values([...newEntries]);

    return json({ success: true, message: "Post categorized successfully" });
  } 
  
  catch (e) {
    return json({
      error: true,
      message: "An error updating categories occured",
      e,
    });
  }
  
};

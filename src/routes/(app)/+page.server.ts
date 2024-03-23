import {
  getPosts,
  getTextOnlyPosts,
  getMediaPosts,
} from "$lib/helpers/data/posts.js";
import { dbClient } from "$lib/server/db";
import {
  commentsTable,
  postsTable,
  usersTable,
  notificationsTable,
} from "$lib/server/schema";
import type { PostWithProfile } from "$lib/helpers/types.js";
import { redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { SUPABASE_URL, KEY,API_KEY } from "$env/static/private";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";

export const load = async (request) => {
 
  const session = request.locals.session;
  let rows;


  let userPreference = "all";


  if (session) {
    // The user is logged in, fetch their preferences
    const results = await dbClient
      .select({
        userPreference: usersTable.postPreference,
      })
      .from(usersTable)
      .where(eq(usersTable.id, session.userId));

    if (results.length > 0 && results[0].userPreference) {
      userPreference = results[0].userPreference;
    }
  } else {
    // The user is not logged in
    userPreference = "all";
  }



  if (userPreference === "textOnly") {
    rows = await getTextOnlyPosts();
  } else if (userPreference === "mediaOnly") {
    rows = await getMediaPosts();
  } else {
    rows = await getPosts();
  }

  rows = rows.filter((data) => data.author && data.post) as PostWithProfile[];

  const openai = new OpenAI({
    apiKey:API_KEY ,
    dangerouslyAllowBrowser: true
  })
  let sentimentResults = [];

  for (const row of rows) {
    const postContent = row.post;
      try {
        const completion = await openai.chat.completions.create({
          messages: [
            {
              role: "system",
              content: "Categorize the following post based on the sentiment it expresses: sad, comedy, and happy. The number of categories can be a maximum of 3. Ensure that the sentiment(s) you give are expressed in only one word per sentiment."
            },
            {
              role: "user",
              content: postContent.content, 
            }
          ],
          model: "gpt-3.5-turbo"
        });
  

        
        const sentimentAnalysisResult = completion.choices[0]?.message?.content || 'Sentiment analysis failed';
        console.log(sentimentAnalysisResult);
      } catch (error) {
 
      }
    
  }






  return {
    rows
  };
};

export const actions = {
  post: async (request) => {
    const session = request.locals.session;
    if (!session) throw redirect(301, "/");

    const data1 = await request.request.formData();
    const postContent = data1.get("post-content")?.toString();
    const postAuthor = session.userId;
    if (!postAuthor || !postContent) {
      return { error: "missing field" };
    }

    const date = new Date();
    let videoUrl: string | null = null;
    const imageUUID = uuidv4();
    const videoUUID = uuidv4();
    const fileName1 = `post_video_${videoUUID}.mp4`;
    const fileName = `image_${imageUUID}.JPG`;
    const img = data1.get("pictureUrl") as File;
    const video = data1.get("video") as File;
    let pictureUrl: string | null = null;
    if (img.size > 0) {
      const supabase = createClient(SUPABASE_URL, KEY);
      const { data, error } = await supabase.storage
        .from("test2")
        .upload(fileName, img, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) {
        console.error("Upload error", error);
        return;
      }

      if (data) {
        pictureUrl = `https://ikcxvcutdjftdsvbpwsa.supabase.co/storage/v1/object/public/test2/${fileName}`;
      }
    }

    if (video.size > 0) {
      const supabase = createClient(SUPABASE_URL, KEY);
      const { data, error } = await supabase.storage
        .from("test2")
        .upload(fileName1, video, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) {
        console.error("Upload error", error);
        return;
      }

      if (data) {
        videoUrl = `https://ikcxvcutdjftdsvbpwsa.supabase.co/storage/v1/object/public/test2/${fileName1}`;
      }
    }
    const newPost = {
      id: uuidv4(),
      content: postContent,
      videoUrl: videoUrl,
      pictureUrl: pictureUrl,
      author: postAuthor,
      timestamp: date,
    };
    const createPost = await dbClient.insert(postsTable).values(newPost);
  },

  comment: async (request) => {
    const session = request.locals.session;
    if (!session) throw redirect(301, "/");

    const data = await request.request.formData();
    const commentContent = data.get("comment-content")?.toString();
    const commentAuthor = session.userId;
    const date = new Date();
    const postId = data.get("post_id")?.toString();

    if (!postId) {
      return { status: 401, success: false };
    }

    const newCommentId = uuidv4();
    if (commentContent && commentAuthor) {
      const newComment: typeof commentsTable.$inferInsert = {
        id: newCommentId,
        comment: commentContent,
        author: commentAuthor,
        post: postId,
        date: date,
      };
      const createComment = await dbClient
        .insert(commentsTable)
        .values(newComment);

      if (createComment) {
        const targetUser = await dbClient
          .select({ userId: usersTable.id })
          .from(postsTable)
          .where(eq(postsTable.id, postId))
          .leftJoin(usersTable, eq(usersTable.id, postsTable.author));

          if(session.userId != targetUser[0].userId){
            await dbClient.insert(notificationsTable).values({
              id: uuidv4(),
              sourceUser: session.userId,
              targetUser: targetUser[0].userId!,
              entityId: newCommentId,
              entityType: "comment",
            });
          }

      }
    }
  },

  reply: async (request) => {
    const session = request.locals.session;
    if (!session) throw redirect(301, "/");

    const data = await request.request.formData();
    const replyContent = data.get("reply-content")?.toString();
    const postId = data.get("postId")?.toString();
    const replyAuthor = session.userId;
    const date = new Date();
    const parentCommentId = data.get("parent_comment_id")?.toString();

    if (!parentCommentId || !postId) {
      return { status: 401, success: false };
    }
    
    if (replyContent && replyAuthor) {
      const replyId = uuidv4();
      const newComment: typeof commentsTable.$inferInsert = {
        id: replyId,
        comment: replyContent,
        author: replyAuthor,
        date: date,
        parentCommentId: parentCommentId,
        post: postId
      };
      const createReply = await dbClient
        .insert(commentsTable)
        .values(newComment);

      if(createReply){
        const targetUser = await dbClient
          .select({ userId: usersTable.id })
          .from(postsTable)
          .where(eq(postsTable.id, postId))
          .leftJoin(usersTable, eq(usersTable.id, postsTable.author));

          if(session.userId != targetUser[0].userId){
            await dbClient.insert(notificationsTable).values({
              id: uuidv4(),
              sourceUser: session.userId,
              targetUser: targetUser[0].userId!,
              entityId: replyId,
              entityType: "reply",
            });
          }
      }
    }
  },
};

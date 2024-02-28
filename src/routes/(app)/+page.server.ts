import {
  getPosts,
  getTextOnlyPosts,
  getMediaPosts,
} from "$lib/server/data/posts.js";
import { dbClient } from "$lib/server/db";
import { auth } from "$lib/server/lucia.js";
import {
  commentsTable,
  postsTable,
  usersTable,
  likesPostTable,
  notificationsTable,
  likesCommentTable,
} from "$lib/server/schema";
import type { PostWithProfile } from "$lib/types.js";
import { redirect } from "@sveltejs/kit";
import { count, desc, eq, like, sql } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { SUPABASE_URL, KEY } from "$env/static/private";
import { createClient } from "@supabase/supabase-js";
type Post = typeof postsTable.$inferInsert;
type Comment = typeof commentsTable.$inferInsert;

export const load = async (request) => {
 
  const session = request.locals.session;

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

  let rows;

  if (userPreference === "textOnly") {
    rows = await getTextOnlyPosts();
  } else if (userPreference === "mediaOnly") {
    rows = await getMediaPosts();
  } else {
    rows = await getPosts();
  }

  rows = rows.filter((data) => data.author && data.post) as PostWithProfile[];

  return {
    rows,
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

        console.log("Post with picture created successfully", pictureUrl);
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

        console.log("Post with video created successfully", videoUrl);
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
        await dbClient.insert(notificationsTable).values({
          id: uuidv4(),
          sourceUser: session.userId,
          targetUser: targetUser[0].userId!,
          postId: postId,
          commentId: newCommentId,
          type: "comment",
        });
      }
    }
  },

  reply: async (request) => {
    const session = request.locals.session;
    if (!session) throw redirect(301, "/");

    const data = await request.request.formData();
    const replyContent = data.get("reply-content")?.toString();
    const replyAuthor = session.userId;
    const date = new Date();
    const parentCommentId = data.get("parent_comment_id")?.toString();

    if (!parentCommentId) {
      return { status: 401, success: false };
    }

    if (replyContent && replyAuthor) {
      const newComment: typeof commentsTable.$inferInsert = {
        id: uuidv4(),
        comment: replyContent,
        author: replyAuthor,
        date: date,
        parentCommentId: parentCommentId,
      };
      const createReply = await dbClient
        .insert(commentsTable)
        .values(newComment);
    }
  },
};

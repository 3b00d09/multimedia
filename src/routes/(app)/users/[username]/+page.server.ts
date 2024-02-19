import { dbClient } from "$lib/server/db.js";
import { auth } from "$lib/server/lucia";
import {
  postsTable,
  userFollowsTable,
  usersTable,
} from "$lib/server/schema.js";
import { createClient } from "@supabase/supabase-js";
import { redirect } from "@sveltejs/kit";
import { and, eq, ilike } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { SUPABASE_URL, KEY } from "$env/static/private";
import { getPostByUser } from "$lib/server/data/posts.js";
export const load = async ({ params }) => {
  const username = params.username;

  const user = await dbClient
    .select()
    .from(usersTable)
    .where(eq(usersTable.username, username));

  if (!user[0]) {
    return { 404: "explosion" };
  }

  const userPosts = getPostByUser(user[0].id);

  return {
    userPosts,
  };
};

export const actions = {
  follow: async (request) => {
    const session = request.locals.session
    if(!session) throw redirect(301, "/")

    const username = request.params.username;

    // woohoo case sensitivity
    const _followedUser = await dbClient
      .select()
      .from(usersTable)
      .where(ilike(usersTable.username, username));
    const followedUser = _followedUser[0].id;

    const row = await dbClient.insert(userFollowsTable).values({
      follower: session.userId,
      following: followedUser,
      id: uuidv4(),
    });
  },

  updateProfileImage: async (request) => {
    const session = request.locals.session
    if(!session) throw redirect(301, "/")

    const imageUUID = uuidv4();
    const fileName = `image_${imageUUID}.JPG`;

    const _data = await request.request.formData();
    const img = _data.get("image");
    if (!img) return;

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
      const imageUrl = `https://ikcxvcutdjftdsvbpwsa.supabase.co/storage/v1/object/public/test2/${fileName}`;

      await dbClient
        .update(usersTable)
        .set({ profilePictureUrl: imageUrl })
        .where(eq(usersTable.id, session.userId));

      console.log("Profile image updated successfully", imageUrl);
    } else {
      console.log("Failed to upload image");
    }
  },

  deleteProfileImage: async (request) => {
    const session = request.locals.session
    if(!session) throw redirect(301, "/")

    const defaultImageUrl =
      "https://ikcxvcutdjftdsvbpwsa.supabase.co/storage/v1/object/sign/profile-images/default-img.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm9maWxlLWltYWdlcy9kZWZhdWx0LWltZy5wbmciLCJpYXQiOjE3MDM0ODg4NjYsImV4cCI6MjAxODg0ODg2Nn0.EeYXUptq697XMxEb5XpbVTtwzm2qwrI2w8cxrD4OySk&t=2023-12-25T07%3A21%3A06.400Z";

    await dbClient
      .update(usersTable)
      .set({ profilePictureUrl: defaultImageUrl })
      .where(eq(usersTable.id, session.userId));

    console.log("Profile image set to default successfully", defaultImageUrl);
  },

  unfollow: async (request) => {
    const session = request.locals.session
    if(!session) throw redirect(301, "/")

    const username = request.params.username;

    const user = await dbClient.select().from(usersTable).where(ilike(usersTable.username, username))

    const row = await dbClient
      .delete(userFollowsTable)
      .where(
        and(
          ilike(userFollowsTable.follower, session.userId),
          ilike(userFollowsTable.following, user[0].id)
        )
      );

  },
};

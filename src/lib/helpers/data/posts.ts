import {
  postsTable,
  usersTable,
  likesPostTable,
  commentsTable,
  userFollowsTable,
  categoriesToPostsTable,
  categoriesTable,
} from "../../server/schema";
import { dbClient } from "../../server/db";
import {
  eq,
  desc,
  getTableColumns,
  count,
  like,
  ilike,
  and,
  isNull,
  or,
  
} from "drizzle-orm";
import type { PostWithProfile } from "../types";

export async function getPosts() {
  // using subqueries because jamming both aggregating count functions into one query is causing a cartesian product issue
  const likeSubquery = dbClient
    .select({
      likeCount: count(likesPostTable.id).as("likeCount"),
      post: likesPostTable.post,
    })
    .from(likesPostTable)
    .groupBy(likesPostTable.post)
    .as("likeSubquery");
  const commentSubquery = dbClient
    .select({
      commentCount: count(commentsTable.post).as("commentCount"),
      post: commentsTable.post,
    })
    .from(commentsTable)
    .groupBy(commentsTable.post)
    .as("commentSubquery");


  const _rows = (await dbClient
    .select({
      post: {
        ...getTableColumns(postsTable),
        likeCount: likeSubquery.likeCount,
        commentCount: commentSubquery.commentCount,
      },
      author: { ...getTableColumns(usersTable) },
    })
    .from(postsTable)
    .leftJoin(usersTable, eq(postsTable.author, usersTable.id))
    .leftJoin(likeSubquery, eq(postsTable.id, likeSubquery.post))
    .leftJoin(commentSubquery, eq(postsTable.id, commentSubquery.post))
    .orderBy(desc(postsTable.timestamp))) as PostWithProfile[];

  const rows = _rows.map((data) => {
    if (data.post.commentCount === null) {
      data.post.commentCount = 0;
    }
    if (data.post.likeCount === null) {
      data.post.likeCount = 0;
    }
    return data;
  });

  return rows;
}

export async function getPostById(id: string) {
  const likeSubquery = dbClient
    .select({
      likeCount: count(likesPostTable.id).as("likeCount"),
      post: likesPostTable.post,
    })
    .from(likesPostTable)
    .groupBy(likesPostTable.post)
    .as("likeSubquery");
  const commentSubquery = dbClient
    .select({
      commentCount: count(commentsTable.post).as("commentCount"),
      post: commentsTable.post,
    })
    .from(commentsTable)
    .groupBy(commentsTable.post)
    .as("commentSubquery");

  const _rows = (await dbClient
    .select({
      post: {
        ...getTableColumns(postsTable),
        likeCount: likeSubquery.likeCount,
        commentCount: commentSubquery.commentCount,
      },
      author: { ...getTableColumns(usersTable) },
    })
    .from(postsTable)
    .where(eq(postsTable.id, id))
    .leftJoin(usersTable, eq(postsTable.author, usersTable.id))
    .leftJoin(likeSubquery, eq(postsTable.id, likeSubquery.post))
    .leftJoin(commentSubquery, eq(postsTable.id, commentSubquery.post))
    .orderBy(desc(postsTable.timestamp))) as PostWithProfile[];

  const rows = _rows.map((data) => {
    if (data.post.commentCount === null) {
      data.post.commentCount = 0;
    } 
    if (data.post.likeCount === null) {
      data.post.likeCount = 0;
    }
    return data;
  });

  return rows[0];
}

export async function getPostByUser(userId: string) {
  const likeSubquery = dbClient
    .select({
      likeCount: count(likesPostTable.id).as("likeCount"),
      post: likesPostTable.post,
    })
    .from(likesPostTable)
    .groupBy(likesPostTable.post)
    .as("likeSubquery");
  const commentSubquery = dbClient
    .select({
      commentCount: count(commentsTable.post).as("commentCount"),
      post: commentsTable.post,
    })
    .from(commentsTable)
    .groupBy(commentsTable.post)
    .as("commentSubquery");

  const _rows = (await dbClient
    .select({
      post: {
        ...getTableColumns(postsTable),
        likeCount: likeSubquery.likeCount,
        commentCount: commentSubquery.commentCount,
      },
      author: { ...getTableColumns(usersTable) },
    })
    .from(postsTable)
    .where(eq(usersTable.id, userId))
    .leftJoin(usersTable, eq(postsTable.author, usersTable.id))
    .leftJoin(likeSubquery, eq(postsTable.id, likeSubquery.post))
    .leftJoin(commentSubquery, eq(postsTable.id, commentSubquery.post))
    .orderBy(desc(postsTable.timestamp))) as PostWithProfile[];

  const rows = _rows.map((data) => {
    if (data.post.commentCount === null) {
      data.post.commentCount = 0;
    } 
    if (data.post.likeCount === null) {
      data.post.likeCount = 0;
    }
    return data;
  });

  return rows;
}

export async function getLikedPosts(userId: string) {
  const likeSubquery = dbClient
    .select({
      likeCount: count(likesPostTable.id).as("likeCount"),
      post: likesPostTable.post,
    })
    .from(likesPostTable)
    .groupBy(likesPostTable.post)
    .as("likeSubquery");
  const commentSubquery = dbClient
    .select({
      commentCount: count(commentsTable.post).as("commentCount"),
      post: commentsTable.post,
    })
    .from(commentsTable)
    .groupBy(commentsTable.post)
    .as("commentSubquery");

  const _rows = (await dbClient
    .select({
      post: {
        ...getTableColumns(postsTable),
        likeCount: likeSubquery.likeCount,
        commentCount: commentSubquery.commentCount,
      },
      author: { ...getTableColumns(usersTable) },
    })
    .from(likesPostTable)
    .where(eq(likesPostTable.author, userId))
    .leftJoin(postsTable, eq(postsTable.id, likesPostTable.post))
    .leftJoin(usersTable, eq(usersTable.id, postsTable.author))
    .leftJoin(likeSubquery, eq(postsTable.id, likeSubquery.post))
    .leftJoin(commentSubquery, eq(postsTable.id, commentSubquery.post))
    .orderBy(desc(postsTable.timestamp))) as PostWithProfile[];

  const rows = _rows.map((data) => {
    if (data.post.commentCount === null) {
      data.post.commentCount = 0;
    } 
    if (data.post.likeCount === null) {
      data.post.likeCount = 0;
    }
    return data;
  });

  return rows;
}

export async function getFollowingPosts(userId: string) {
  const likeSubquery = dbClient
    .select({
      likeCount: count(likesPostTable.id).as("likeCount"),
      post: likesPostTable.post,
    })
    .from(likesPostTable)
    .groupBy(likesPostTable.post)
    .as("likeSubquery");
  const commentSubquery = dbClient
    .select({
      commentCount: count(commentsTable.post).as("commentCount"),
      post: commentsTable.post,
    })
    .from(commentsTable)
    .groupBy(commentsTable.post)
    .as("commentSubquery");

  const _rows = (await dbClient
    .select({
      post: {
        ...getTableColumns(postsTable),
        likeCount: likeSubquery.likeCount,
        commentCount: commentSubquery.commentCount,
      },
      author: { ...getTableColumns(usersTable) },
    })
    .from(postsTable)
    .leftJoin(userFollowsTable, eq(userFollowsTable.follower, userId))
    .where(eq(postsTable.author, userFollowsTable.following))
    .leftJoin(usersTable, eq(postsTable.author, usersTable.id))
    .leftJoin(likeSubquery, eq(postsTable.id, likeSubquery.post))
    .leftJoin(commentSubquery, eq(postsTable.id, commentSubquery.post))
    .orderBy(desc(postsTable.timestamp))) as PostWithProfile[];

  const rows = _rows.map((data) => {
    if (data.post.commentCount === null) {
      data.post.commentCount = 0;
    }
    if (data.post.likeCount === null) {
      data.post.likeCount = 0;
    }
    return data;
  });

  return rows;
}

export async function queryPost(query: string) {
  // using subqueries because jamming both aggregating count functions into one query is causing a cartesian product issue
  const likeSubquery = dbClient
    .select({
      likeCount: count(likesPostTable.id).as("likeCount"),
      post: likesPostTable.post,
    })
    .from(likesPostTable)
    .groupBy(likesPostTable.post)
    .as("likeSubquery");
  const commentSubquery = dbClient
    .select({
      commentCount: count(commentsTable.post).as("commentCount"),
      post: commentsTable.post,
    })
    .from(commentsTable)
    .groupBy(commentsTable.post)
    .as("commentSubquery");

  const _rows = (await dbClient
    .select({
      post: {
        ...getTableColumns(postsTable),
        likeCount: likeSubquery.likeCount,
        commentCount: commentSubquery.commentCount,
      },
      author: { ...getTableColumns(usersTable) },
    })
    .from(postsTable)
    .leftJoin(usersTable, eq(postsTable.author, usersTable.id))
    .leftJoin(likeSubquery, eq(postsTable.id, likeSubquery.post))
    .leftJoin(commentSubquery, eq(postsTable.id, commentSubquery.post))
    .where(ilike(postsTable.content, `%${query}%`))
    .orderBy(desc(postsTable.timestamp))) as PostWithProfile[];

  const rows = _rows.map((data) => {
    if (data.post.commentCount === null) {
      data.post.commentCount = 0;
    }
    if (data.post.likeCount === null) {
      data.post.likeCount = 0;
    }
    return data;
  });

  return rows;
}

export async function getTextOnlyPosts() {
  const likeSubquery = dbClient
    .select({
      likeCount: count(likesPostTable.id).as("likeCount"),
      post: likesPostTable.post,
    })
    .from(likesPostTable)
    .groupBy(likesPostTable.post)
    .as("likeSubquery");
  const commentSubquery = dbClient
    .select({
      commentCount: count(commentsTable.post).as("commentCount"),
      post: commentsTable.post,
    })
    .from(commentsTable)
    .groupBy(commentsTable.post)
    .as("commentSubquery");

  const _rows = await dbClient
    .select({
      post: {
        ...getTableColumns(postsTable),
        likeCount: likeSubquery.likeCount,
        commentCount: commentSubquery.commentCount,
      },
      author: { ...getTableColumns(usersTable) },
    })
    .from(postsTable)
    .leftJoin(usersTable, eq(postsTable.author, usersTable.id))
    .leftJoin(likeSubquery, eq(postsTable.id, likeSubquery.post))
    .leftJoin(commentSubquery, eq(postsTable.id, commentSubquery.post))

    .where(
      and(
        or(isNull(postsTable.videoUrl), eq(postsTable.videoUrl, "")),
        or(isNull(postsTable.pictureUrl), eq(postsTable.pictureUrl, ""))
      )
    )
    .orderBy(desc(postsTable.timestamp));

  const rows = _rows.map((data) => {
    if (data.post.commentCount === null) {
      data.post.commentCount = 0;
    }
    if (data.post.likeCount === null) {
      data.post.likeCount = 0;
    }
    return data;
  });

  return rows;
}

export async function getMediaPosts() {
  const likeSubquery = dbClient
    .select({
      likeCount: count(likesPostTable.id).as("likeCount"),
      post: likesPostTable.post,
    })
    .from(likesPostTable)
    .groupBy(likesPostTable.post)
    .as("likeSubquery");
  const commentSubquery = dbClient
    .select({
      commentCount: count(commentsTable.post).as("commentCount"),
      post: commentsTable.post,
    })
    .from(commentsTable)
    .groupBy(commentsTable.post)
    .as("commentSubquery");

  const _rows = await dbClient
    .select({
      post: {
        ...getTableColumns(postsTable),
        likeCount: likeSubquery.likeCount,
        commentCount: commentSubquery.commentCount,
      },
      author: { ...getTableColumns(usersTable) },
    })
    .from(postsTable)
    .leftJoin(usersTable, eq(postsTable.author, usersTable.id))
    .leftJoin(likeSubquery, eq(postsTable.id, likeSubquery.post))
    .leftJoin(commentSubquery, eq(postsTable.id, commentSubquery.post))
    .where(
      or(
        ilike(postsTable.videoUrl, "%://%"),
        ilike(postsTable.pictureUrl, "%://%")
      )
    )
    .orderBy(desc(postsTable.timestamp));

  const rows = _rows.map((data) => {
    if (data.post.commentCount === null) {
      data.post.commentCount = 0;
    }
    if (data.post.likeCount === null) {
      data.post.likeCount = 0;
    }
    return data;
  });

  return rows;
}


export async function getPostsByCategoryIds(categoryName: string) {
  
  const Categories = await dbClient
    .select({
      id: categoriesTable.id,
    })
    .from(categoriesTable)
    .where(eq(categoriesTable.name, categoryName))
  

  
  if (!Categories.length) return []; 

  const mltiCategoryId = Categories[0].id;

  const likeSubquery = dbClient
  .select({
    likeCount: count(likesPostTable.id).as("likeCount"),
    post: likesPostTable.post,
  })
  .from(likesPostTable)
  .groupBy(likesPostTable.post)
  .as("likeSubquery");
const commentSubquery = dbClient
  .select({
    commentCount: count(commentsTable.post).as("commentCount"),
    post: commentsTable.post,
  })
  .from(commentsTable)
  .groupBy(commentsTable.post)
  .as("commentSubquery");




  const _rows = (await dbClient
    .select({
      post: {
        ...getTableColumns(postsTable),
        likeCount: likeSubquery.likeCount,
        commentCount: commentSubquery.commentCount,
      },
      author: { ...getTableColumns(usersTable) },
    })
    .from(postsTable)
    .leftJoin(usersTable, eq(postsTable.author, usersTable.id))
    .leftJoin(likeSubquery, eq(postsTable.id, likeSubquery.post))
    .leftJoin(commentSubquery, eq(postsTable.id, commentSubquery.post))
    .leftJoin(categoriesToPostsTable, eq(postsTable.id, categoriesToPostsTable.postId))
    .where(eq(categoriesToPostsTable.categoryId, mltiCategoryId))
    .orderBy(desc(postsTable.timestamp))) as PostWithProfile[];



    const rows = _rows.map((data) => {
      if (data.post.commentCount === null) {
        data.post.commentCount = 0;
      }
      if (data.post.likeCount === null) {
        data.post.likeCount = 0;
      }
      return data;
    });
  
    return rows;
  }




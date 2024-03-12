import type { PostWithProfile } from '$lib/helpers/types.js'
import { dbClient } from '$lib/server/db.js'
import { commentsTable, groupMembers, groupPosts, groupsTable, likesPostTable, postsTable, usersTable } from '$lib/server/schema.js'
import { redirect } from '@sveltejs/kit'
import { desc, count, eq, getTableColumns } from 'drizzle-orm'

export const load = async(request) =>{
    const session =  request.locals.session

    if(!session) throw redirect(301, "/")

    const groupId = request.params.id

    const group = await dbClient.select().from(groupsTable).where(eq(groupsTable.id, groupId))

    if(group.length === 0) return{}

    const joinedGroups = await dbClient.select({...getTableColumns(groupsTable)}).from(groupsTable).leftJoin(groupMembers, eq(groupMembers.group, groupsTable.id)).where(eq(groupMembers.member, session.userId))
    if(joinedGroups.length === 0) return{}

    const groups = joinedGroups
    
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
    
    const _posts = await dbClient.select(
    {
      post: {
        ...getTableColumns(postsTable),
        likeCount: likeSubquery.likeCount,
        commentCount: commentSubquery.commentCount,
      },
      author: { ...getTableColumns(usersTable) },
    }
    ).from(groupPosts).where(eq(groupPosts.group, groupId)).leftJoin(postsTable, eq(postsTable.id, groupPosts.post)).leftJoin(usersTable,eq(postsTable.author, usersTable.id))    
    .leftJoin(likeSubquery, eq(postsTable.id, likeSubquery.post))
    .leftJoin(commentSubquery, eq(postsTable.id, commentSubquery.post))
    .orderBy(desc(postsTable.timestamp)) as PostWithProfile[];

    const posts = _posts.map((data) => {
    if (data.post.commentCount === null) {
      data.post.commentCount = 0;
    }
    if (data.post.likeCount === null) {
      data.post.likeCount = 0;
    }
    return data;
  });

    return{
        posts, groups
    }
}   
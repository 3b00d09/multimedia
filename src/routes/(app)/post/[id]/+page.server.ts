import { dbClient } from '$lib/server/db.js'
import { commentsTable, postsTable, usersTable, likesPostTable } from '$lib/server/schema.js'
import { eq, getTableColumns } from 'drizzle-orm'
import { error } from '@sveltejs/kit'
import type { CommentWithProfile, PostWithProfile } from '$lib/helpers/types'
import { getPostById } from '$lib/helpers/data/posts.js'
import { getComments } from '$lib/helpers/data/comments.js'


export const load = async({params})=>{

    const postId = params.id

    const post = await getPostById(postId)

    if(!post){
        throw error(500, {message:"Post not found."})
    }

    const comments = await getComments(postId)
    return {
        post, comments,
    }
}
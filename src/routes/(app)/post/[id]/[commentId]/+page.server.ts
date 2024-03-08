import { getCommentById, getReplies } from '$lib/helpers/data/comments.js'
import { getPostById } from '$lib/helpers/data/posts.js'
import { dbClient } from '$lib/server/db.js'
import type { CommentWithProfile, PostWithProfile } from '$lib/helpers/types.js'
import { error } from '@sveltejs/kit'

export const load = async({url, params})=>{
    const commentId = params.commentId
    const postId = params.id

    const post = await getPostById(postId)
    
    if(!post){
        throw error(500, {message:"Post not found."})
    }

    const _parentComment = await getCommentById(commentId)

    if(!_parentComment){
        throw error(500, "Invalid comment")
    }

    const parentComment = _parentComment
    const childComments = await getReplies(parentComment.comment.id)

    let topLevelComment:CommentWithProfile | null;

    if(parentComment.comment.parentCommentId){
        topLevelComment = await getCommentById(parentComment.comment.parentCommentId)
    }else{
        topLevelComment = null
    }

    return {
        post, childComments, parentComment, topLevelComment
    }

}
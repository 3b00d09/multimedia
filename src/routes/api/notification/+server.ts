import { dbClient } from '$lib/server/db.js'
import { commentsTable, likesCommentTable, likesPostTable, notificationsTable, postsTable, usersTable } from '$lib/server/schema.js'
import { json } from '@sveltejs/kit'
import { eq, getTableColumns, like } from 'drizzle-orm'


export const POST = async({locals, request}) =>{
    
    const {notificationId} = await request.json()
    
    await dbClient.update(notificationsTable).set({read: true}).where(eq(notificationsTable.id, notificationId))
    
    return json({})
}


export const GET = async(request)=>{
    const session = request.locals.session

    if(!session) return json({error: true, message: "User not logged in"})

    const notificationId = request.url.searchParams.get("id")
    const type = request.url.searchParams.get("type")
    if(!notificationId || !type) return json({error: true, message: "Missing notification data"})

    const notification = await dbClient.select().from(notificationsTable).where(eq(notificationsTable.id, notificationId))

    if(!notification) return json ({error: true, message: "Invalid notification"})

    let data;

    if(!notification[0].entityId) return json({error: true, message: "Unknown error occured"})

    if(type === "post_like") data = await postLikeNotification(notification[0].entityId)
    else if (type === "comment_like") data = await commentLikeNotification(notification[0].entityId)
    else if (type === "comment") data = await CommentNotification(notification[0].entityId)
    else if (type === "reply") data = await replyNotification(notification[0].entityId)

    const {password, ...rest} = getTableColumns(usersTable)

    const sourceUser = await dbClient.select({...rest}).from(usersTable).where(eq(usersTable.id, notification[0].sourceUser))

    return json({success: true, data: {
        content: data,
        sourceUser: sourceUser[0]
    }})

}


async function postLikeNotification(id: string){
    const content = await dbClient.select({content: postsTable.content}).from(postsTable).where(eq(postsTable.id, id))
    return content[0];
}

async function commentLikeNotification(id: string){
    const row = await dbClient.select({content: commentsTable.comment, postId: commentsTable.post}).from(commentsTable).where(eq(commentsTable.id, id))
    return row[0];
}

async function CommentNotification(id: string){
    const row = await dbClient.select({content: commentsTable.comment, postId: commentsTable.post}).from(commentsTable).where(eq(commentsTable.id, id))
    return row[0]
}

async function replyNotification(id: string){
    const row = await dbClient.select().from(likesPostTable).where(eq(likesPostTable.id, id)).leftJoin(postsTable, eq(likesPostTable.post, postsTable.id))
    return row[0];
}

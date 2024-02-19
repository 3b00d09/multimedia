import { getFollowingPosts } from '$lib/server/data/posts.js'
import { redirect } from '@sveltejs/kit'

export const load = async(request) =>{
    const session = request.locals.session
    if(!session) throw redirect(301, "/")
  
    const posts = await getFollowingPosts(session.userId)

    return {
        posts
    }
}
import { getFollowingPosts } from '$lib/server/data/posts.js'
import { redirect } from '@sveltejs/kit'

export const load = async({locals}) =>{
    const session = await locals.auth.validate()

    if(!session){
        throw redirect(301, "/login")
    }

    const posts = await getFollowingPosts(session.user.userId)

    return {
        posts
    }
}
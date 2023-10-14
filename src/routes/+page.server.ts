import { dbClient } from "$lib/server/db"
import { postsTable } from "$lib/server/schema"

export const load = async() =>{
    const data = await dbClient.select().from(postsTable)
    return {
        data
    }
}
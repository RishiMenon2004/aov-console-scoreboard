import { Id } from "./_generated/dataModel"
import { mutation, query } from "./_generated/server"
 
 export const getClubStandings = query(async ({db}) => {
	const clubs = await db.query("participating_clubs").collect()
	clubs.sort((a, b) => b.points - a.points)
	return clubs
 })

 export const newParticipatingClub = mutation(async ({db}, { clubId }: { clubId: string }) => {
	const clubDocId = await db.insert("participating_clubs", { id: clubId, wins: 0, losses: 0, points: 0, out: false})

	console.info(`New Club added: ${clubId} | Document: ${clubDocId}`)

	return
 })

 export const removeParticipant = mutation(async ({db}, { docId }: { docId: Id<"participating_clubs">}) => {
	await db.delete(docId)
 })
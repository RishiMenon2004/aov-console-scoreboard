import { Id } from "./_generated/dataModel"
import { mutation, query } from "./_generated/server"
 
 export const getFixtures = query(async ({db}) => {
	const clubs = await db.query("fixtures_day_1").collect()
	
	clubs.sort((a, b) => {
		
		const aTimeParts = a.time.split(":")
		const aTime = new Date()
		aTime.setHours(parseInt(aTimeParts[0]), parseInt(aTimeParts[1]))
		
		const bTimeParts = b.time.split(":")
		const bTime = new Date()
		bTime.setHours(parseInt(bTimeParts[0]), parseInt(bTimeParts[1]))


		if (aTime < bTime) { return -1 }
		if (aTime > bTime) { return 1 }
		return 0
	})

	return clubs
 })

 export const newFixture = mutation(async ({db}, {fixtureData}: {fixtureData: {
	team1_id: string,
	team2_id: string,
	time: string
 }}) => {
	const fixtureId = await db.insert("fixtures_day_1", fixtureData )

	console.log(`New Fixture Created: ${JSON.stringify(fixtureData)} | Document: ${fixtureId}`)

	return
 })

 export const removeFixture = mutation(async ({db}, { docId }: { docId: Id<"participating_clubs">}) => {
	await db.delete(docId)
 })
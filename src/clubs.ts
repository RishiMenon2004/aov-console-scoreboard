import arsenal from "./assets/club_icons/arsenal.svg"
import burnley from "./assets/club_icons/burnley.svg"

export interface ClubItem {
	label: string,
	short: string,
	icon: string
}

export interface LeagueItem {
	label: string,
	clubs: (keyof typeof Clubs)[]
}

export const Clubs: { [key: string]: ClubItem } = {
	arsenal: {
		label: "Arsenal",
		short: "ARS",
		icon: arsenal
	},
	burnley: {
		label: "Burnley",
		short: "BUR",
		icon: burnley
	}
}

export const Leagues: { [key: string]: LeagueItem } = {
	premier_league: {
		label: "Premier League",
		clubs: [
			"arsenal",
			"burnley"
		]
	}
}
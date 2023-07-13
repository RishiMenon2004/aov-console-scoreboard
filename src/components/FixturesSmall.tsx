import { useQuery } from "convex/react";
import FixtureItem from "./FixtureItem";
import { api } from "../../convex/_generated/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { useState, useContext } from "react";
import FixtureEditor from "./FixtureEditor";
import { EditorContext } from "../App";

export default function FixturesSmall() {

	const fixtures = useQuery(api.fixtures.getFixtures) || []

	const [fixtureEditorIsActive, setFixtureEditorIsActive] = useState(false)

	const {displayMode} = useContext(EditorContext)

	return <>
		<div className="fixtures-small">
			<div className="title-header">
				<h2>Day 1</h2>
			</div>
			<div className="fixture-date">
				Friday 20 October
			</div>
			<div className="fixture-items">
				{fixtures.map(fixtureItem => {
					return <FixtureItem team1={fixtureItem.team1_id} time={fixtureItem.time} team2={fixtureItem.team2_id} key={fixtureItem._id}/>
				})}

				{!displayMode && <div className="fixture-item button" onClick={() => setFixtureEditorIsActive(true)}>
					<FontAwesomeIcon icon={faClock}/>
					New Fixture
				</div>}
			</div>
		</div>
		{fixtureEditorIsActive && <>
			<FixtureEditor confirmCallback={() => setFixtureEditorIsActive(false)} cancelCallback={() => setFixtureEditorIsActive(false)} />
		</>}
	</>
}
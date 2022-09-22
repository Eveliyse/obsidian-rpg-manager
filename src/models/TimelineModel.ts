import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {TimelineResponse} from "../data/responses/TimelineResponse";
import {TimelineElementResponse} from "../data/responses/TimelineElementResponse";
import {TimelineResponseInterface} from "../interfaces/response/TimelineResponseInterface";
import {RecordType} from "../enums/RecordType";
import {EventInterface} from "../interfaces/data/EventInterface";
import {ClueInterface} from "../interfaces/data/ClueInterface";
import {CharacterInterface} from "../interfaces/data/CharacterInterface";
import {ActInterface} from "../interfaces/data/ActInterface";
import {RecordInterface} from "../interfaces/database/RecordInterface";
import {BannerComponent} from "../components/BannerComponent";

export class TimelineModel extends AbstractModel {
	protected currentElement: RecordInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addComponent(BannerComponent,this.currentElement);

		const timeline = new TimelineResponse(this.app);

		if (this.sourceMeta.events === true){
			this.addEvents(timeline);
		}

		if (this.sourceMeta.clues === true){
			this.addClues(timeline);
		}

		if (this.sourceMeta.births === true){
			this.addBirths(timeline);
		}

		if (this.sourceMeta.deaths === true){
			this.addDeaths(timeline);
		}

		if (this.sourceMeta.acts === true){
			this.addActs(timeline);
		}

		timeline.sort();
		this.response.addElement(timeline);

		return this.response;
	}

	private addEvents(
		timeline: TimelineResponseInterface,
	): void {
		const events = this.database.readList<EventInterface>(
			RecordType.Event,
			this.currentElement.id,
		);

		events.filter((data: EventInterface) => data.date != null).forEach((event: EventInterface) => {
			if (event.date != null) {
				let time = (<Date>event.date).toLocaleTimeString();
				time = time.substring(0, time.length-3);
				timeline.elements.push(
					new TimelineElementResponse(
						event.date,
						(<Date>event.date).toDateString(),
						time,
						'event',
						event.synopsis ?? '',
						event.link,
					)
				)
			}
		});
	}

	private addClues(
		timeline: TimelineResponseInterface,
	): void {
		const clues = this.database.readList<ClueInterface>(
			RecordType.Clue,
			this.currentElement.id,
		);
		clues.filter((data: ClueInterface) => data.isFound === true).forEach((clue: ClueInterface) => {
			if (clue.found != null) {
				timeline.elements.push(
					new TimelineElementResponse(
						clue.found,
						(<Date>clue.found).toDateString(),
						'00:00',
						'clue',
						clue.synopsis ?? '',
						clue.link,
					)
				)
			}
		});
	}

	private addBirths(
		timeline: TimelineResponseInterface,
	): void {
		const characters = this.database.readList<CharacterInterface>(
			RecordType.Character | RecordType.NonPlayerCharacter,
			this.currentElement.id,
		);
		characters.filter((data: CharacterInterface) => data.dob != null).forEach((character: CharacterInterface) => {
			if (character.dob != null) {
				timeline.elements.push(
					new TimelineElementResponse(
						character.dob,
						(<Date>character.dob).toDateString(),
						'00:00',
						'birth',
						character.synopsis ?? '',
						character.link,
					)
				)
			}
		});
	}

	private addDeaths(
		timeline: TimelineResponseInterface,
	): void {
		const characters = this.database.readList<CharacterInterface>(
			RecordType.Character | RecordType.NonPlayerCharacter,
			this.currentElement.id,
		);
		characters.filter((data: CharacterInterface) => data.death != null).forEach((character: CharacterInterface) => {
			if (character.death != null) {
				timeline.elements.push(
					new TimelineElementResponse(
						character.death,
						(<Date>character.death).toDateString(),
						'00:00',
						'death',
						character.synopsis ?? '',
						character.link,
					)
				)
			}
		});
	}

	private addActs(
		timeline: TimelineResponseInterface,
	): void {
		const acts = this.database.readList<ActInterface>(
			RecordType.Act,
			this.currentElement.id,
		);
		acts.filter((data: ActInterface) => data.date != null).forEach((act: ActInterface) => {
			if (act.date != null) {
				timeline.elements.push(
					new TimelineElementResponse(
						act.date,
						(<Date>act.date).toDateString(),
						'00:00',
						'act',
						act.synopsis ?? '',
						act.link,
					)
				)
			}
		});
	}
}

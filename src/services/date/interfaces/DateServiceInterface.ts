import {ModelInterface} from "../../../api/modelsManager/interfaces/ModelInterface";
import {DateInterface} from "./DateInterface";
import {FantasyCalendarDateInterface} from "../../fantasyCalendar/interfaces/FantasyCalendarDateInterface";
import {DatabaseInterface} from "../../../database/interfaces/DatabaseInterface";

export interface DateServiceInterface {
	getDate(
		metadataDate: string|undefined,
		frontmatterDate: FantasyCalendarDateInterface|undefined,
		component: ModelInterface,
	): DateInterface|undefined;

	getReadableDate(
		date: DateInterface|undefined,
		component: ModelInterface,
	): string;

	getAge(
		dob: DateInterface|undefined,
		death: DateInterface|undefined,
		currentDate: DateInterface|undefined,
		component: ModelInterface,
	): number|undefined;
}

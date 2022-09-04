import {CampaignDataInterface} from "../interfaces/data/CampaignDataInterface";
import {DataviewInlineApi} from "obsidian-dataview/lib/api/inline-api";
import {App} from "obsidian";
import {AdventureModel} from "../settings/Agnostic/models/AdventureModel";
import {CampaignModel} from "../settings/Agnostic/models/CampaignModel";
import {CampaignNavigationModel} from "../settings/Agnostic/models/CampaignNavigationModel";
import {ClueModel} from "../settings/Agnostic/models/ClueModel";
import {ErrorModel} from "../settings/Agnostic/models/ErrorModel";
import {EventModel} from "../settings/Agnostic/models/EventModel";
import {FactionModel} from "../settings/Agnostic/models/FactionModel";
import {LocationModel} from "../settings/Agnostic/models/LocationModel";
import {NotesModel} from "../settings/Agnostic/models/NotesModel";
import {NpcModel} from "../settings/Agnostic/models/NpcModel";
import {PcModel} from "../settings/Agnostic/models/PcModel";
import {SceneModel} from "../settings/Agnostic/models/SceneModel";
import {SceneNavigationModel} from "../settings/Agnostic/models/SceneNavigationModel";
import {SessionModel} from "../settings/Agnostic/models/SessionModel";
import {SessionNavigationModel} from "../settings/Agnostic/models/SessionNavigationModel";
import {TimelineModel} from "../settings/Agnostic/models/TimelineModel";

const ModelsMap = {
	AgnosticAdventure: AdventureModel,
	AgnosticCampaign: CampaignModel,
	AgnosticCampaignNavigation: CampaignNavigationModel,
	AgnosticClue: ClueModel,
	AgnosticError: ErrorModel,
	AgnosticEvent: EventModel,
	AgnosticFaction: FactionModel,
	AgnosticLocation: LocationModel,
	AgnosticNotes: NotesModel,
	AgnosticNpc: NpcModel,
	AgnosticPc: PcModel,
	AgnosticScene: SceneModel,
	AgnosticSceneNavigation: SceneNavigationModel,
	AgnosticSession: SessionModel,
	AgnosticSessionNavigation: SessionNavigationModel,
	AgnosticTimeline: TimelineModel,
};
type ModelsMapType = typeof ModelsMap;
type ModelKeys = keyof ModelsMapType;
type Tuples<T> = T extends ModelKeys ? [T, InstanceType<ModelsMapType[T]>] : never;
export type SingleModelKey<K> = [K] extends (K extends ModelKeys ? [K] : never) ? K : never;
type ModelClassType<A extends ModelKeys> = Extract<Tuples<ModelKeys>, [A, any]>[1];

export class ModelFactory {
	static create<K extends ModelKeys>(
		k: SingleModelKey<K>,
		app: App,
		campaign: CampaignDataInterface,
		current: Record<string, any>,
		dv: DataviewInlineApi,
		source: string,
		sourcePath: string,
		contentEl: HTMLElement,
	): ModelClassType<K> {
		return new ModelsMap[k](app, campaign, current, dv, source, sourcePath, contentEl);
	}
}
import {CampaignSetting} from "../../../databases/enums/CampaignSetting";
import {ComponentType} from "../../../databases/enums/ComponentType";
import {ComponentFrontmatterTemplateFactoryInterface} from "./ComponentFrontmatterTemplateFactoryInterface";

export interface TemplateFactoryInterface {
	create(
		settings: CampaignSetting,
		type: ComponentType,
		templateName: string,
		name: string,
		campaignId: number|undefined,
		adventureId: number|undefined,
		actId: number|undefined,
		sceneId: number|undefined,
		sessionId: number|undefined,
		additionalInformation?: any|null,
	): ComponentFrontmatterTemplateFactoryInterface;
}
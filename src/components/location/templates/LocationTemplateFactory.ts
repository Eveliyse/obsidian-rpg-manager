import {AbstractComponentTemplateFactory} from "../../../core/abstracts/AbstractComponentTemplateFactory";
import {ControllerMetadataInterface} from "../../../api/controllerManager/interfaces/ControllerMetadataInterface";
import {LocationMetadataInterface} from "../interfaces/LocationMetadataInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {CampaignSetting} from "../../campaign/enums/CampaignSetting";

export class LocationTemplateFactory extends AbstractComponentTemplateFactory {
	protected generateDataCodeBlock(
	): string {
		const metadata: LocationMetadataInterface = {
			data: {
				synopsis: '',
				complete: false,
				address: ''
			}
		};
		return this.generateRpgManagerDataCodeBlock(metadata);
	}

	public generateInitialCodeBlock(
	): string {
		const metadata: ControllerMetadataInterface = {
			models: {
				header: true,
				lists: {
					pcs: {},
					npcs: {},
					events: {},
					clues: {},
					locations: [
						{
							relationship: "parent",
							title: "Inside"
						},
						{
							relationship: "child",
							title: "Contains"
						}
					],
				}
			},
		};

		return this.generateRpgManagerCodeBlock(metadata);
	}

	public generateID(
	): string {
		return ComponentType.Location + '-' + CampaignSetting.Agnostic + '-' + this.campaignId;
	}
}

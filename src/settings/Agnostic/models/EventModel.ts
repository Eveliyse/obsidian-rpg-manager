import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {ResponseData} from "../../../data/responses/ResponseData";
import {ComponentFactory, SingleComponentKey} from "../../../factories/ComponentFactory";
import {CampaignSetting} from "../../../enums/CampaignSetting";
import {DataType} from "../../../enums/DataType";
import {ResponseLine} from "../../../data/responses/ResponseLine";
import {ContentFactory} from "../../../factories/ContentFactory";
import {ContentType} from "../../../enums/ContentType";
import {EventDataInterface} from "../../../interfaces/data/EventDataInterface";

export class EventModel extends AbstractModel {
	generateData(): ResponseDataInterface {
		const response = new ResponseData();

		response.addElement(this.generateBreadcrumb());

		const status = new ResponseLine();
		status.content =ContentFactory.create(
			((<EventDataInterface>this.specificData).synopsis != null && (<EventDataInterface>this.specificData).synopsis !== ''
				? (<EventDataInterface>this.specificData).synopsis
				: '<span class="rpgm-missing">Synopsis missing</span>'),
			ContentType.Markdown,
		);
		response.addElement(status);

		response.addElement(
			ComponentFactory.create(
				CampaignSetting[this.campaign.settings] + 'CharacterTable' as SingleComponentKey<any>,
				this.io,
				this.io.getRelationshipList(
					DataType.Character,
				),
			)
		);

		response.addElement(
			ComponentFactory.create(
				CampaignSetting[this.campaign.settings] + 'ClueTable' as SingleComponentKey<any>,
				this.io,
				this.io.getRelationshipList(
					DataType.Clue,
				),
			)
		);

		response.addElement(
			ComponentFactory.create(
				CampaignSetting[this.campaign.settings] + 'LocationTable' as SingleComponentKey<any>,
				this.io,
				this.io.getRelationshipList(
					DataType.Location,
				),
			)
		);

		return response;
	}

	/*
	public async render() {
		this.image(450);
		this.synopsis();
	}

	 */
}
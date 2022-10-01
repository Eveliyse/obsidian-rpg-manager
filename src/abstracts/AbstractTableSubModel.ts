import {AbstractSubModel} from "./AbstractSubModel";
import {
	RpgManagerAdvancedSettingsListElementInterface,
	RpgManagerAdvancedSettingsListsInterface
} from "../settings/RpgManagerSettingsInterface";
import {ContentType} from "../enums/ContentType";
import {ContentInterface} from "../interfaces/ContentInterface";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";
import {ResponseDataElementInterface} from "../interfaces/response/ResponseDataElementInterface";
import {ResponseTable} from "../responses/ResponseTable";
import {TableField} from "../enums/TableField";
import {ComponentV2Interface} from "../_dbV2/interfaces/ComponentV2Interface";

export abstract class AbstractTableSubModel extends AbstractSubModel {
	protected advancedSettings: RpgManagerAdvancedSettingsListsInterface;

	public async generateData(
		relationships: RelationshipInterface[],
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseDataElementInterface|null> {
		if (relationships.length === 0) return null;

		const response = new ResponseTable(this.app, this.currentElement);
		response.open = this.advancedSettings.defaultVisible;

		response.addTitle(title ? title : this.advancedSettings.title);

		response.addHeaders(
			this.generateHeader(this.advancedSettings.fields)
		);

		let index=0;
		relationships.forEach((relationship: RelationshipInterface) => {
			const record: ComponentV2Interface|undefined = relationship.component;
			if (record !== undefined) {
				index++;
				response.addContent(
					this.generateContent<ComponentV2Interface>(index, this.advancedSettings.fields, record, relationship),
				);
			}
		});

		return response;
	}

	protected generateHeader(
		fields: Array<RpgManagerAdvancedSettingsListElementInterface>,
	): Array<ContentInterface> {
		const response: Array<ContentInterface> = []

		fields.forEach((listElement: RpgManagerAdvancedSettingsListElementInterface) => {
			if (listElement.checked) {
				const content: ContentInterface | undefined = this.generateHeaderElement(listElement.field);
				if (content !== undefined) response.push(content);
			}
		});

		return response;
	}

	protected generateHeaderElement(
		fieldType: TableField,
	): ContentInterface|undefined {
		switch (fieldType) {
			case  TableField.Index:
				return this.factories.contents.create('#', ContentType.String, true);
				break;
			case  TableField.Date:
				return this.factories.contents.create('Date', ContentType.String, true);
				break;
			case  TableField.Image:
				return this.factories.contents.create('', ContentType.String, true);
				break;
			case  TableField.Name:
				return this.factories.contents.create('Name', ContentType.String);
				break;
			case  TableField.Synopsis:
				return this.factories.contents.create('Synopsis', ContentType.String);
				break;
			case  TableField.Url:
				return this.factories.contents.create('Url', ContentType.String);
				break;
		}

		return this.factories.contents.create('', ContentType.String);
	}

	protected generateContent<T extends ComponentV2Interface>(
		index: number,
		fields: Array<RpgManagerAdvancedSettingsListElementInterface>,
		record: T,
		relationship: RelationshipInterface,
	): Array<ContentInterface> {
		const response: Array<ContentInterface> = []

		fields.forEach((listElement: RpgManagerAdvancedSettingsListElementInterface) => {
			if (listElement.checked) {
				const content: ContentInterface | undefined = this.generateContentElement<T>(index, listElement.field, record, relationship);
				if (content !== undefined) response.push(content);
			}
		});

		return response;
	}

	protected generateContentElement<T extends ComponentV2Interface>(
		index: number,
		fieldType: TableField,
		record: T,
		relationship: RelationshipInterface,
	): ContentInterface|undefined {
		switch (fieldType) {
			case  TableField.Name:
				return this.factories.contents.create(record.file.path, ContentType.Link);
				break;
			case  TableField.Image:
				return this.factories.contents.create(record.image, ContentType.Image, true);
				break;
			case  TableField.Synopsis:
				return this.factories.contents.create(relationship.description !== '' ? relationship.description : record.synopsis, ContentType.Markdown);
				break;
		}

		return this.factories.contents.create('', ContentType.String);
	}
}

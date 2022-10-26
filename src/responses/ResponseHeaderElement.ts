import {AbstractResponse} from "./abstracts/AbstractResponse";
import {HeaderResponseElementInterface} from "./interfaces/HeaderResponseElementInterface";
import {HeaderResponseType} from "./enums/HeaderResponseType";
import {App} from "obsidian";
import {ContentType} from "./enums/ContentType";
import {ContentInterface} from "./contents/interfaces/ContentInterface";
import {ModelInterface} from "../api/modelsManager/interfaces/ModelInterface";

export class ResponseHeaderElement extends AbstractResponse implements HeaderResponseElementInterface {
	public value: ContentInterface;

	constructor(
		app: App,
		currentComponent: ModelInterface,
		public title: string,
		content: any,
		public type: HeaderResponseType,
		public additionalInformation: any|undefined=undefined,
	) {
		super(app, currentComponent);
		this.value = this.factories.contents.create(content, ContentType.Markdown);
	}
}

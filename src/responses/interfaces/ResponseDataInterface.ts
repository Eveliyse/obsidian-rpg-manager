import {ResponseDataElementInterface} from "./ResponseDataElementInterface";
import {ModelInterface} from "../../api/modelsManager/interfaces/ModelInterface";
import {RelationshipInterface} from "../../services/relationshipsService/interfaces/RelationshipInterface";

export interface ResponseDataInterface {
	elements: ResponseDataElementInterface[];

	addSubModel<T>(
		type: T,
		currentComponent: ModelInterface,
		data: ModelInterface[]|ModelInterface|RelationshipInterface[],
		title?: string|undefined,
		additionalInformation?: any|undefined,
		position?: number|undefined,
	): Promise<void>;

	addElement(
		element: ResponseDataElementInterface|null,
		position?: number|null,
	): void;
}

import {ComponentNotesTemplateFactoryInterface} from "../../../core/interfaces/ComponentNotesTemplateFactoryInterface";
import {AbstractTemplate} from "../../../core/abstracts/AbstractTemplate";

export class SceneNotesTemplateFactory extends AbstractTemplate implements ComponentNotesTemplateFactoryInterface {
	public getContent(): string {
		return '---\n' +
			'### SceneModel Notes\n' +
			' - \n\n' +
			'---\n';
	}
}

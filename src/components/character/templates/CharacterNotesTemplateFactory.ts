import {ComponentNotesTemplateFactoryInterface} from "../../../core/interfaces/ComponentNotesTemplateFactoryInterface";
import {AbstractTemplate} from "../../../core/abstracts/AbstractTemplate";

export class CharacterNotesTemplateFactory extends AbstractTemplate implements ComponentNotesTemplateFactoryInterface {
	public getContent(): string {
		return '---\n' +
			'### Player CharacterModel Notes\n' +
			' - \n\n' +
			'---\n';
	}
}

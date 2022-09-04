import {AbstractTemplate} from "../../../abstracts/AbstractTemplate";
import {RpgFunctions} from "../../../RpgFunctions";

export class EventTemplate extends AbstractTemplate {
	protected generateFrontmatterTags(
	): string {
		return 'tags: [' + RpgFunctions.settings.eventTag + '/' + this.campaignId + ']\n';
	}

	protected generateFrontmatterSynopsis(
	): string {
		return 'synopsis: ""\n';
	}

	protected generateFrontmatterRelationships(
	): string|null {
		return ' characters: \n' +
			' clues: \n' +
			' locations: \n';
	}

	protected generateFrontmatterDates(
	): string|null {
		return ' event: \n';
	}

	protected generateTemplate(
	): string {
		let response = this.getRpgManagerCodeblock('event');
		response += this.getAdditionalInformation();

		return response;
	}
}

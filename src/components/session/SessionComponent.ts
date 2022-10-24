import {ComponentInterface} from "../../api/componentManager/interfaces/ComponentInterface";
import {CampaignSetting} from "../campaign/enums/CampaignSetting";
import {NewModelClassInterface} from "../../api/factories/interfaces/NewModelClassInterface";
import {ComponentModelInterface} from "../../api/componentManager/interfaces/ComponentModelInterface";
import {ActModel} from "../act/models/ActModel";
import {ComponentType} from "../../core/enums/ComponentType";
import {NewViewClassInterface} from "../../api/factories/interfaces/NewViewClassInterface";
import {NewViewInterface} from "../../views/interfaces/NewViewInterface";
import {NewViewType} from "../../core/enums/NewViewType";
import {NewActHeaderView} from "../act/views/NewActHeaderView";
import {SessionModel} from "./models/SessionModel";
import {NewSessionHeaderView} from "./views/NewSessionHeaderView";

export class SessionComponent implements ComponentInterface {
	public get campaignSettings(): CampaignSetting {
		return CampaignSetting.Agnostic;
	}

	public get model(): NewModelClassInterface<ComponentModelInterface>{
		return SessionModel;
	}

	public get type(): ComponentType {
		return ComponentType.Session;
	}

	public get views(): Map<NewViewClassInterface<NewViewInterface>, NewViewType> {
		return new Map<NewViewClassInterface<NewViewInterface>, NewViewType>([
			[NewSessionHeaderView, NewViewType.Header],
		]);
	}
}

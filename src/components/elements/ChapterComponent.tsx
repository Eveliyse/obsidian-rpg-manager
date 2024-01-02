import { AttributeComponentType } from "@/data/enums/AttributeComponentType";
import { AttributeInterface } from "@/data/interfaces/AttributeInterface";
import * as React from "react";
import { AttributeType } from "src/data/enums/AttributeType";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import AttributeListComponent from "../attributes/AttributeListComponent";
import DescriptionAttributeComponent from "../attributes/types/DescriptionAttributeComponent";
import ParentAttributeComponent from "../attributes/types/ParentAttributeComponent";
import StoryCircleAttributeComponent from "../attributes/types/StoryCircleAttributeComponent";
import ConflictComponent from "../conflict/ConflictComponent";
import BannerComponent from "../headers/BannerComponent";
import HeaderComponent from "../headers/HeaderComponent";
import ImageCarouselComponent from "../images/ImageCarouselComponent";
import KishotenketsuComponent from "../kishotenketsu/KishotenketsuComponent";
import RelationshipsContainerComponent from "../relationships/RelationshipsContainerComponent";
import TasksContainerComponent from "../tasks/TasksContainerComponent";

export default function ChapterComponent({
	element,
	isInPopover,
}: {
	element: ElementInterface;
	isInPopover: boolean;
}): React.ReactElement {
	const storyCircle: AttributeInterface | undefined = element.attribute(AttributeComponentType.StoryCircle);
	const kishotenketsu: AttributeInterface | undefined = element.attribute(AttributeType.Kishotenketsu);
	const conflict: AttributeInterface | undefined = element.attribute(AttributeType.Conflict);

	return (
		<>
			<div className="space-y-3 p-3 bg-[--background-primary-alt] border border-[--background-modifier-border]">
				<HeaderComponent element={element} isInPopover={isInPopover} />
				{element.images.length > 0 && <BannerComponent image={element.images[0]} />}
				<div className={`grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-5 gap-3 !mb-3}`}>
					<div className={`col-span-5 sm:col-span-1 lg:col-span-5`}>
						<div className="rounded-lg border border-[--background-modifier-border] bg-[--background-primary] p-3 !mb-3">
							<DescriptionAttributeComponent
								element={element}
								attribute={element.attribute(AttributeType.Description)}
								isEditable={!isInPopover}
							/>
							<ParentAttributeComponent element={element} isEditable={!isInPopover} />
						</div>
						<AttributeListComponent element={element} isEditable={!isInPopover} />
					</div>
				</div>
				{element.images.length > 1 && (
					<div className="rounded-lg border border-[--background-modifier-border] bg-[--background-primary] p-3">
						<ImageCarouselComponent element={element} />
					</div>
				)}
				{conflict && conflict.isSet && (
					<div className="col-span-1 sm:col-span-1 lg:col-span-6">
						<ConflictComponent element={element} attribute={conflict} isEditable={!isInPopover} />
					</div>
				)}
				{kishotenketsu && kishotenketsu.isSet && (
					<div className="col-span-1 sm:col-span-1 lg:col-span-6">
						<KishotenketsuComponent element={element} attribute={kishotenketsu} isEditable={!isInPopover} />
					</div>
				)}
				{storyCircle && storyCircle.isSet && (
					<div className="col-span-1 sm:col-span-1 lg:col-span-6">
						<StoryCircleAttributeComponent element={element} attribute={storyCircle} isEditable={!isInPopover} />
					</div>
				)}
				{!isInPopover && <TasksContainerComponent element={element} />}
				{isInPopover === false && <RelationshipsContainerComponent element={element} /> }

			</div>
		</>
	);
}
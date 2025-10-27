import React, { useState } from "react";
import {
	Drawer,
	Text,
	Button,
	Group,
	Stack,
	Divider,
	Select,
	NumberInput,
	Card,
} from "@mantine/core";
import { activities } from "../data/activities";
import type {Activity} from "../types/activity.ts";
import SearchTagFilterDrawer from "./SearchTagFilterDrawer";

export default function SearchFilterDrawer(props: {
	opened: boolean;
	onClose: () => void;
	onApplyFilteredActivities?: (filtered: Activity[]) => void;
}) {
	// Collect unique tags
	const tags: string[] = [];
	activities.forEach((activity) => {
		activity.tags.forEach((tag) => {
			if (!tags.some((e) => e.toLowerCase() === tag.toLowerCase())) {
				tags.push(tag);
			}
		});
	});

	const categories = [
		"Any",
		"Kultur",
		"Sport",
		"Essen & Trinken",
		"Outdoor",
		"Indoor",
		"Entspannung",
		"Abenteuer",
		"Soziales",
		"Sonstige",
	];

	const locationTypes = ["Any", "Indoor", "Outdoor", "Both"];

	// Filter states
	const [category, setCategory] = useState<string | null>("Any");
	const [locationType, setLocationType] = useState<string | null>("Any");

	// Number filters
	const [minReqTime, setMinReqTime] = useState<number | null>(null);
	const [maxReqTime, setMaxReqTime] = useState<number | null>(null);
	const [minParticipants, setMinParticipants] = useState<number | null>(null);
	const [maxParticipants, setMaxParticipants] = useState<number | null>(null);
	const [minCost, setMinCost] = useState<number | null>(null);
	const [maxCost, setMaxCost] = useState<number | null>(null);

	// Tags
	const [tagFilters, setTagFilters] = useState<{ include: string[]; exclude: string[] }>({
		include: [],
		exclude: [],
	});

	// View state
	const [view, setView] = useState<"filter" | "filterTag">("filter");

	const backFilter = () => setView("filter");
	const openFilterTag = () => setView("filterTag");

	return (
		<Drawer
			offset={8}
			radius="md"
			opened={props.opened}
			onClose={props.onClose}
			title={<Text fw="bold" size="xl">Such-Filter anpassen</Text>}
			position="bottom"
			size="lg"
		>
			{view === "filter" && (
				<Card shadow="sm" radius="md" withBorder>
					<Stack gap="md">
						{/* Category and Location */}
						<Group grow>
							<Select
								label="Kategorie"
								data={categories}
								searchable
								clearable
								value={category}
								onChange={setCategory}
								placeholder="Wähle oder tippe..."
							/>
							<Select
								label="Ortstyp"
								data={locationTypes}
								searchable
								clearable
								value={locationType}
								onChange={setLocationType}
								placeholder="Wähle oder tippe..."
							/>
						</Group>

						<Divider label="Filter-Details" />

						{/* Time filters */}
						<Group grow>
							<NumberInput
								label="Min. benötigte Zeit (Minuten)"
								placeholder="Minimum"
								value={minReqTime}
								onChange={setMinReqTime}
								min={0}
							/>
							<NumberInput
								label="Max. benötigte Zeit (Minuten)"
								placeholder="Maximum"
								value={maxReqTime}
								onChange={setMaxReqTime}
								min={0}
							/>
						</Group>

						{/* Participants filters */}
						<Group grow>
							<NumberInput
								label="Min. Teilnehmer"
								placeholder="Minimum"
								value={minParticipants}
								onChange={setMinParticipants}
								min={0}
							/>
							<NumberInput
								label="Max. Teilnehmer"
								placeholder="Maximum"
								value={maxParticipants}
								onChange={setMaxParticipants}
								min={0}
							/>
						</Group>

						{/* Cost filters */}
						<Group grow>
							<NumberInput
								label="Min. Kosten (€)"
								placeholder="Minimum"
								value={minCost}
								onChange={setMinCost}
								min={0}
							/>
							<NumberInput
								label="Max. Kosten (€)"
								placeholder="Maximum"
								value={maxCost}
								onChange={setMaxCost}
								min={0}
							/>
						</Group>

						<Divider />

						<Group justify="space-between">
							<Button variant="outline" color="gray" onClick={props.onClose}>
								← Zurück
							</Button>
							<Button variant="light" onClick={openFilterTag}>
								Tags filtern
							</Button>
						</Group>
					</Stack>
				</Card>
			)}

			<Button
				fullWidth
				color="blue"
				mt="md"
				onClick={() => {
					let filtered = activities;

					// ✅ Apply tag filters
					if (tagFilters.include.length > 0) {
						filtered = filtered.filter((a) =>
							a.tags.some((tag) =>
								tagFilters.include.some((inc) => inc.toLowerCase() === tag.toLowerCase())
							)
						);
					}

					if (tagFilters.exclude.length > 0) {
						filtered = filtered.filter(
							(a) =>
								!a.tags.some((tag) =>
									tagFilters.exclude.some((exc) => exc.toLowerCase() === tag.toLowerCase())
								)
						);
					}

					// TODO: add cost/participants filtering here later

					props.onApplyFilteredActivities?.(filtered);
				}}
			>
				Filter anwenden
			</Button>
			{view === "filterTag" && (
				<div style={{ zIndex: 1001 }}>
					<SearchTagFilterDrawer
						onBack={backFilter}
						onApply={(filters) => {
							setTagFilters(filters);
							backFilter();
						}}
					/>
				</div>
			)}
		</Drawer>
	);
}

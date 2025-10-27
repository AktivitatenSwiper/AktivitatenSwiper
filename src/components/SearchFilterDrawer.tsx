import React, { useState, useEffect } from "react";
import {
	Drawer,
	Text,
	Stack,
	Group,
	Select,
	NumberInput,
	Button,
} from "@mantine/core";
import { activities } from "../data/activities";
import SearchTagFilterDrawer from "./SearchTagFilterDrawer";
import type { Activity } from "../types/activity";

interface Props {
	opened: boolean;
	onClose: () => void;
	onApplyFilteredActivities?: (filtered: Activity[]) => void;
}

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

export default function SearchFilterDrawer(props: Props) {
	const [view, setView] = useState<"filter" | "tag">("filter");

	// --- All filter state in one object ---
	const [filters, setFilters] = useState({
		category: "Any",
		locationType: "Any",
		minReqTime: null as number | null,
		maxReqTime: null as number | null,
		minParticipants: null as number | null,
		maxParticipants: null as number | null,
		minCost: null as number | null,
		maxCost: null as number | null,
		includeTags: [] as string[],
		excludeTags: [] as string[],
	});

	// --- Handle "Apply" button ---
	const handleApply = () => {
		let filtered = activities;

		// --- TAGS ---
		if (filters.includeTags.length > 0) {
			filtered = filtered.filter((a) =>
				a.tags.some((tag) =>
					filters.includeTags.some(
						(inc) => tag.toLowerCase() === inc.toLowerCase()
					)
				)
			);
		}
		if (filters.excludeTags.length > 0) {
			filtered = filtered.filter(
				(a) =>
					!a.tags.some((tag) =>
						filters.excludeTags.some(
							(exc) => tag.toLowerCase() === exc.toLowerCase()
						)
					)
			);
		}

		// --- CATEGORY ---
		if (filters.category && filters.category !== "Any") {
			filtered = filtered.filter((a) => a.category === filters.category);
		}

		// --- LOCATION TYPE ---
		if (filters.locationType && filters.locationType !== "Any") {
			filtered = filtered.filter((a) => {
				return a.location_type === filters.locationType;
			});
		}

		// --- REQUIRED TIME ---
		if (filters.minReqTime !== null) {
			filtered = filtered.filter((a) => a.min_required_time >= filters.minReqTime!);
		}
		if (filters.maxReqTime !== null) {
			filtered = filtered.filter((a) => a.max_required_time <= filters.maxReqTime!);
		}

		// --- PARTICIPANTS ---
		if (filters.minParticipants !== null) {
			filtered = filtered.filter(
				(a) => a.min_participants >= filters.minParticipants!
			);
		}
		if (filters.maxParticipants !== null) {
			filtered = filtered.filter(
				(a) => a.max_participants <= filters.maxParticipants!
			);
		}

		// --- COST ---
		if (filters.minCost !== null) {
			filtered = filtered.filter((a) => a.min_cost >= filters.minCost!);
		}
		if (filters.maxCost !== null) {
			filtered = filtered.filter((a) => a.max_cost <= filters.maxCost!);
		}

		// Send filtered activities back
		props.onApplyFilteredActivities?.(filtered);
	};

	// --- Handlers to switch views ---
	const openTagFilter = () => setView("tag");
	const backToFilter = () => setView("filter");

	useEffect(() => {
		if (props.opened) {
			setView("filter"); // reset to main filter view on open
		}
	}, [props.opened]);

	return (
		<Drawer
			offset={8}
			radius="md"
			opened={props.opened}
			onClose={props.onClose}
			title={<Text fw="bold" size="xl">Such-Filter anpassen</Text>}
			position="bottom"
			size="60%"
		>
			{view === "filter" && (
				<Stack spacing="md">
					{/* --- Category & Location --- */}
					<Group grow>
						<Select
							label="Kategorie"
							placeholder="Kategorie auswählen"
							data={categories}
							value={filters.category}
							onChange={(val) =>
								setFilters((f) => ({ ...f, category: val || "Any" }))
							}
							searchable
							clearable
						/>
						<Select
							label="Location Typ"
							placeholder="Location auswählen"
							data={locationTypes}
							value={filters.locationType}
							onChange={(val) =>
								setFilters((f) => ({ ...f, locationType: val || "Any" }))
							}
						/>
					</Group>

					{/* --- Required Time --- */}
					<Group grow>
						<NumberInput
							label="Min Zeit"
							placeholder="Min"
							value={filters.minReqTime}
							onChange={(val) =>
								setFilters((f) => ({ ...f, minReqTime: val ?? null }))
							}
						/>
						<NumberInput
							label="Max Zeit"
							placeholder="Max"
							value={filters.maxReqTime}
							onChange={(val) =>
								setFilters((f) => ({ ...f, maxReqTime: val ?? null }))
							}
						/>
					</Group>

					{/* --- Participants --- */}
					<Group grow>
						<NumberInput
							label="Min Teilnehmer"
							placeholder="Min"
							value={filters.minParticipants}
							onChange={(val) =>
								setFilters((f) => ({ ...f, minParticipants: val ?? null }))
							}
						/>
						<NumberInput
							label="Max Teilnehmer"
							placeholder="Max"
							value={filters.maxParticipants}
							onChange={(val) =>
								setFilters((f) => ({ ...f, maxParticipants: val ?? null }))
							}
						/>
					</Group>

					{/* --- Cost --- */}
					<Group grow>
						<NumberInput
							label="Min Kosten"
							placeholder="Min"
							value={filters.minCost}
							onChange={(val) =>
								setFilters((f) => ({ ...f, minCost: val ?? null }))
							}
						/>
						<NumberInput
							label="Max Kosten"
							placeholder="Max"
							value={filters.maxCost}
							onChange={(val) =>
								setFilters((f) => ({ ...f, maxCost: val ?? null }))
							}
						/>
					</Group>

					{/* --- Tag Filter Drawer Button --- */}
					<Button fullWidth onClick={openTagFilter}>
						Tags auswählen
					</Button>

					{/* --- Apply Button --- */}
					<Button fullWidth color="blue" mt="md" onClick={handleApply}>
						Filter anwenden
					</Button>

					{/* --- Close Button --- */}
					<Button fullWidth variant="outline" color="gray" onClick={props.onClose}>
						Schließen
					</Button>
				</Stack>
			)}

			{view === "tag" && (
				<SearchTagFilterDrawer
					onBack={backToFilter}
					onApply={(tags) => {
						setFilters((f) => ({
							...f,
							includeTags: tags.include,
							excludeTags: tags.exclude,
						}));
						backToFilter();
					}}
				/>
			)}
		</Drawer>
	);
}

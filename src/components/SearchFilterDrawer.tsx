import { useState } from "react";
import {
	Drawer,
	Text,
	Group,
	Select,
	NumberInput,
	Button,
	Grid,
	ActionIcon,
	MultiSelect,
	Divider,
} from "@mantine/core";
import { activities } from "../data/activities";
import type { Activity } from "../types/activity";
import { IconCategory, IconClock, IconCoinEuro, IconFilter, IconTags, IconTree, IconUsersGroup } from "@tabler/icons-react";

interface Props {
	opened: boolean;
	onClose: () => void;
	onApplyFilteredActivities?: (filtered: Activity[]) => void;
}

const categories = [
	"Abenteuer",
	"Entspannung",
	"Essen & Trinken",
	"Indoor",
	"Kultur",
	"Outdoor",
	"Soziales",
	"Sport",
	"Sonstige",
];

const locationTypes = ["Indoor", "Outdoor", "Both"];

export default function SearchFilterDrawer(props: Props) {
	// Collect unique tags from all activities
	const tags: string[] = [];
	activities.forEach((activity) => {
			activity.tags.forEach((tag) => {
					if (!tags.some((e) => e.toLowerCase() === tag.toLowerCase())) {
							tags.push(tag);
					}
			});
	});
	tags.sort()

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

	return (
		<Drawer
			offset={8}
			radius="md"
			opened={props.opened}
			onClose={props.onClose}
			title={<Text fw="bold" size="xl">Such-Filter anpassen</Text>}
			position="bottom"
			size="32rem"
		>

			<Grid gutter="sm" style={{'--group-wrap': 'nowrap'}}>
				<Grid.Col span={5}></Grid.Col>
				<Grid.Col span={7}>
					{/* --- Participants --- */}
					<Group grow>
						<Text fw="bold">Minimum</Text>
						<Text fw="bold">Maximum</Text>
					</Group>
				</Grid.Col>

				<Grid.Col span={5}>
					<Group>
						<ActionIcon color="gray">
							<IconUsersGroup />
						</ActionIcon>
						<Text c="gray" fw={700}>
							Teilnehmer
						</Text>
					</Group>
				</Grid.Col>
				<Grid.Col span={7}>
					{/* --- Participants --- */}
					<Group grow>
						<NumberInput
							aria-label="Min. Teilnehmer"
							placeholder="0 P."
							suffix=" P."
							step={1}
							min={1}
							allowDecimal={false}
							allowNegative={false}
							value={filters.minParticipants ?? undefined}
							onChange={(val) =>
								setFilters((f) => ({ ...f, minParticipants: val === "" ? null : ((val as number | undefined) ?? null) }))
							}
						/>
						<NumberInput
							aria-label="Max. Teilnehmer"
							placeholder="∞ P."
							suffix=" P."
							step={1}
							min={1}
							allowDecimal={false}
							allowNegative={false}
							value={filters.maxParticipants ?? undefined}
							onChange={(val) =>
								setFilters((f) => ({ ...f, maxParticipants: val === "" ? null : ((val as number | undefined) ?? null) }))
							}
						/>
					</Group>
				</Grid.Col>

				<Grid.Col span={5}>
					<Group>
						{<ActionIcon color="orange"><IconCoinEuro /></ActionIcon>}
						<Text c="orange" fw={700}>
							Kosten
						</Text>
					</Group>
				</Grid.Col>
				<Grid.Col span={7}>
					{/* --- Cost --- */}
					<Group grow>
						<NumberInput
							aria-label="Min. Kosten"
							placeholder="0 €"
							suffix=" €"
							decimalSeparator=","
							decimalScale={2}
							allowNegative={false}
							value={filters.minCost ?? undefined}
							onChange={(val) =>
								setFilters((f) => ({ ...f, minCost: val === "" ? null : ((val as number | undefined) ?? null) }))
							}
						/>
						<NumberInput
							aria-label="Max. Kosten"
							placeholder="∞ €"
							suffix=" €"
							decimalSeparator=","
							decimalScale={2}
							allowNegative={false}
							value={filters.maxCost ?? undefined}
							onChange={(val) =>
								setFilters((f) => ({ ...f, maxCost: val === "" ? null : ((val as number | undefined) ?? null) }))
							}
						/>
					</Group>
				</Grid.Col>

				<Grid.Col span={5}>
					<Group>
						<ActionIcon color="teal"><IconClock /></ActionIcon>
						<Text c="teal" fw={700}>
							Dauer
						</Text>
					</Group>
				</Grid.Col>
				<Grid.Col span={7}>
					{/* --- Required Time --- */}
					<Group grow>
						<NumberInput
							aria-label="Min. Dauer (Min.)"
							placeholder="0 min."
							suffix=" min."
							step={1}
							allowNegative={false}
							allowDecimal={false}
							value={filters.minReqTime ?? undefined}
							onChange={(val) =>
								setFilters((f) => ({ ...f, minReqTime: val === "" ? null : ((val as number | undefined) ?? null) }))
							}
						/>
						<NumberInput
							aria-label="Max. Dauer (Min.)"
							placeholder="∞ min."
							suffix=" min."
							step={1}
							allowNegative={false}
							allowDecimal={false}
							value={filters.maxReqTime ?? undefined}
							onChange={(val) =>
								setFilters((f) => ({ ...f, maxReqTime: val === "" ? null : ((val as number | undefined) ?? null) }))
							}
						/>
					</Group>
				</Grid.Col>

				<Grid.Col span={5}>
					<Group>
						<ActionIcon color="blue"><IconTree /></ActionIcon>
						<Text c="blue" fw={700}>
							Ort
						</Text>
					</Group>
				</Grid.Col>
				<Grid.Col span={7}>

					<Select
						aria-label="Aktivitäts-Ort"
						placeholder="Beliebiger Ort"
						data={locationTypes}
						value={filters.locationType}
						onChange={(val) =>
							setFilters((f) => ({ ...f, locationType: val || "Any" }))
						}
						clearable
					/>
				</Grid.Col>
				<Grid.Col span={5}>
					<Group>
						<ActionIcon color="pink"><IconCategory /></ActionIcon>
						<Text c="pink" fw={700}>
							Kategorie
						</Text>
					</Group>
				</Grid.Col>
				<Grid.Col span={7}>
					<Select
						aria-label="Kategorie"
						placeholder="Beliebige Kategorie"
						data={categories}
						value={filters.category}
						onChange={(val) =>
							setFilters((f) => ({ ...f, category: val || "Any" }))
						}
						searchable
						clearable
					/>
				</Grid.Col>

				<Grid.Col span={5}>
					<Group>
						<ActionIcon color="indigo"><IconTags /></ActionIcon>
						<Text c="indigo" fw={700}>
							Tags erzwingen
						</Text>
					</Group>
				</Grid.Col>
				<Grid.Col span={7}>
					<MultiSelect
						aria-label="Tags erzwingen (Min. 1)"
						placeholder="Tags auswählen"
						data={tags}
						clearable
						searchable
						value={filters.includeTags}
						onChange={(val) =>
							setFilters((f) => ({ ...f, includeTags: val || [] }))
						}
						/>
				</Grid.Col>
				<Grid.Col span={5}>
					<Group>
						<ActionIcon color="indigo"><IconTags /></ActionIcon>
						<Text c="indigo" fw={700}>
							~ ausschließen
						</Text>
					</Group>
				</Grid.Col>
				<Grid.Col span={7}>

					<MultiSelect
						aria-label="Tags ausschließen"
						placeholder="Tags auswählen"
						data={tags}
						clearable
						searchable
						value={filters.excludeTags}
						onChange={(val) =>
							setFilters((f) => ({ ...f, excludeTags: val || [] }))
						}
						/>
				</Grid.Col>
				<Grid.Col span={12}>
					<Divider />
				</Grid.Col>

				<Grid.Col span={5}>
					{/* --- Close Button --- */}
					<Button fullWidth variant="outline" color="gray" onClick={props.onClose}>
						Abbrechen
					</Button>
				</Grid.Col>
				<Grid.Col span={7}>
						{/* --- Apply Button --- */}
						<Button fullWidth color="blue" onClick={handleApply} leftSection={<IconFilter />}>
							Filter anwenden
						</Button>
				</Grid.Col>
			</Grid>
		</Drawer>
	);
}

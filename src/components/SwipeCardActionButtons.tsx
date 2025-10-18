import { ActionIcon, Group, Paper } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { IconArrowBackUp, IconCheck, IconFilter, IconInfoCircle, IconStar, IconStarFilled, IconX } from "@tabler/icons-react";

export default function SwipeCardActionButtons(props: { activityCount: number, doAction: (action: string) => () => void, highlight: string|null, currentId: number|null}) {
	const {activityCount, doAction, highlight} = props;
	const [starredCardIds, setStarredCardIds] = useLocalStorage<number[]>({
		key: 'star-list',
		defaultValue: [],
	});
	const isStarred = starredCardIds.includes(props.currentId as any)

	return (
		<Group justify="center" gap="sm">
			<ActionIcon radius="xl" variant={highlight !== "filter" ? "filled" : "light"}
				aria-label="Filter"
				color="gray"
				onClick={doAction("filter")}
			>
				<IconFilter style={{ width: '70%', height: '70%' }} stroke={1.5} />
			</ActionIcon>
			<Paper bg="white" radius="xl" shadow="lg" my="sm" style={{position: "relative"}} withBorder>
				<Group justify="center" p="xs" gap="sm">
					<ActionIcon radius="xl" size={45} variant={highlight === "dislike" ? "filled" : "light"} disabled={activityCount <= 0}
						aria-label="Kein Interesse"
						color="red"
						onClick={doAction("dislike")}
					>
						<IconX style={{ width: '70%', height: '70%' }} stroke={1.5} />
					</ActionIcon>
					<ActionIcon
						radius="xl"
						size={45}
						variant="light"
						disabled={activityCount <= 0}
						aria-label={isStarred ? "Favorit entfernen" : "Als Favorit hinzufügen"}
						color="orange"
						onClick={() => {
							if (isStarred) {
								setStarredCardIds(starredCardIds.filter((id: string | number) => id !== props.currentId));
							} else if(props.currentId !== null) {
								setStarredCardIds([...starredCardIds, props.currentId]);
							}
						}}
					>
						{isStarred ? (
							<IconStarFilled style={{ width: '70%', height: '70%' }} stroke={1.5} />
						) : (
							<IconStar style={{ width: '70%', height: '70%' }} stroke={1.5} />
						)}
					</ActionIcon>
					<ActionIcon radius="xl" size={45} variant={highlight === "info" ? "filled" : "light"} disabled={activityCount <= 0}
						aria-label="Alle Informationen anzeigen"
						color="blue"
						onClick={doAction("info")}
					>
						<IconInfoCircle style={{ width: '70%', height: '70%' }} stroke={1.5} />
					</ActionIcon>
					<ActionIcon radius="xl" size={45} variant={highlight === "like" ? "filled" : "light"} disabled={activityCount <= 0}
						aria-label="Interesse vorhanden"
						color="green"
						onClick={doAction("like")}
					>
						<IconCheck style={{ width: '70%', height: '70%' }} stroke={1.5} />
					</ActionIcon>
				</Group>
			</Paper>

			<ActionIcon radius="xl" variant={highlight !== "undo" ? "filled" : "light"}
				aria-label="Letzte Entscheidung rückgängig machen"
				color="gray"
				onClick={doAction("undo")}
			>
				<IconArrowBackUp style={{ width: '70%', height: '70%' }} stroke={1.5} />
			</ActionIcon>
		</Group>
	)
}
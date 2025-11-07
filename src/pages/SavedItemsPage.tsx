import {ActionIcon, Card, Container, Divider, Group, Image, Stack, Text, Title} from "@mantine/core";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import {IconBookmark, IconInfoCircle, IconStar, IconTrash} from "@tabler/icons-react";
import { activities } from "../data/activities.ts";
import type {Activity} from "../types/activity.ts";
import { useState } from "react";
import ActivityDetailsDrawer from "../components/ActivityDetailsDrawer.tsx";

function SavedActivityItem({ activity, removeFromList, showInfo } : { activity: Activity, removeFromList: (a: number) => void, showInfo: (a: Activity) => void }) {
	return (
		<Card shadow="lg" key={activity.id} p={0} withBorder>
			<Group justify="space-between" key={activity.id} style={{ flexWrap: 'nowrap' }}>
				<Image src={activity.image} h={90} w={70} alt=""/>
				<Stack gap={0} flex={"1 1 0px"} style={{ overflow: "hidden"}}>
					<Title fw="bold" size="xl" lh="sm">{activity.name}</Title>
					<Text size="sm" c="dimmed" truncate="end">{activity.description}</Text>
				</Stack>
				<Stack mr="md" gap={2}>
					<ActionIcon
						variant="light"
						size="lg"
						color="red"
						onClick={() => removeFromList(activity.id)}
						aria-label="Aktivität entfernen"
					>
						<IconTrash></IconTrash>
					</ActionIcon>
					<ActionIcon
						variant="light"
						size="lg"
						color="blue"
						onClick={() => showInfo(activity)}
						aria-label="Alle Informationen anzeigen"
					>
						<IconInfoCircle style={{ width: '70%', height: '70%' }} />
					</ActionIcon>
				</Stack>
			</Group>
		</Card>
	)
}
function NoSavedActivityFound({ title, description } : { title: string, description: string }) {
	return (
		<Card shadow="lg" withBorder>
			<Title fw="bold" size="xl" lh="sm">{title}</Title>
			<Text size="sm" c="dimmed">{description}</Text>
		</Card>
	);
}


export default function SavedItemsPage() {
	const [currentDrawerActivity, setCurrentDrawerActivity] = useState<Activity|null>(null);
	const [infoOpened, { open: openInfoDrawer, close: closeInfoDrawer }] = useDisclosure(false);
	const showActivity = (activity: Activity) => {
		setCurrentDrawerActivity(activity);
		openInfoDrawer()
	}

	const [starredCardIds, setStarredCardIds] = useLocalStorage<number[]>({
		key: 'star-list',
		defaultValue: [],
	});
	const [bookmarkedCardIds, setBookmarkedCardIds] = useLocalStorage<number[]>({
		key: 'like-list',
		defaultValue: [],
	});
	const favouriteActivities = activities.filter(
		(a) => starredCardIds.includes(a.id)
	);

	const bookmarkedActivities = activities.filter(
		(a) => bookmarkedCardIds.includes(a.id)
	);

	const removeFromFavorites = (id: number) => {
		setStarredCardIds((prev) => prev.filter((i) => i !== id));
	};

	const removeFromBookmarks = (id: number) => {
		setBookmarkedCardIds((prev) =>
			prev.filter((i) => i !== id)
		);
	};

	return (
		<Container p="md" w="100%">
			<Title mb="lg">Gespeicherte Aktivitäten</Title>

			<Title order={2} my="lg">
				<IconStar /> Meine Favoriten
			</Title>
			<Stack gap="sm">
				{favouriteActivities.length === 0 ? (
					<NoSavedActivityFound title="Du hast noch keine Favoriten." description="Markiere eine Aktivität mit einem Stern, um diese als Favorit zu speichern." />
				) : (
					favouriteActivities.map((activity) => (
						<SavedActivityItem activity={activity} key={activity.id} removeFromList={removeFromFavorites} showInfo={showActivity}/>
					))
				)}
			</Stack>

			<Divider my="xl" color="#999" />

			<Title order={2} my="lg">
				<IconBookmark /> Vorgemerkte Aktivitäten
			</Title>
			<Stack gap="sm">
				{bookmarkedActivities.length === 0 ? (
					<NoSavedActivityFound title="Du hast noch keine Vormerkungen." description="Nutze das Häkchen, um eine Aktivität vorzumerken." />
				) : (
					bookmarkedActivities.map((activity) => (
						<SavedActivityItem activity={activity} key={activity.id} removeFromList={removeFromBookmarks} showInfo={showActivity}/>
					))
				)}
			</Stack>

			<ActivityDetailsDrawer
				data={currentDrawerActivity}
				opened={infoOpened}
				onClose={closeInfoDrawer} />
		</Container>
	);
}
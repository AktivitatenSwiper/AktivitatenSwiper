import {ActionIcon, Card, Container, Group, Stack, Text, Title} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import {IconBookmark, IconStar, IconTrash} from "@tabler/icons-react";
import { activities } from "../data/activities.ts";

export default function SavedItemsPage() {
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
			<Text>TODO: Auf dieser Seite soll es mehrere Kategorien / Listen geben (z. B. "Favoriten" mit dem Stern-Symbol und "Vorgemerkt" mit dem Häckchen-Symbol)</Text>


			<Title order={2} my="lg">
				<IconStar /> Meine Favoriten
			</Title>
			<Stack gap="sm">
				{favouriteActivities.length === 0 ? (
					<Text>Keine favorisierten Aktivitäten gefunden.</Text>
				) : (
					favouriteActivities.map((activity) => (
						<Card>
							<Group justify="space-between" key={activity.id} >
								<Card>
									<Title size="sm">{activity.name}</Title>
									<Text>{activity.description}</Text>
								</Card>
								<ActionIcon
									size={"xl"}
									color="red"
									onClick={() => removeFromFavorites(activity.id)}
									aria-label="Button Entfernen Aktivität"
								>
									<IconTrash></IconTrash>
								</ActionIcon>
							</Group>
						</Card>
					))
				)}
			</Stack>


			<Title order={2} my="lg">
				<IconBookmark /> Vorgemerkte Aktivitäten
			</Title>
			<Stack gap="sm">
				{bookmarkedActivities.length === 0 ? (
					<Text>Keine vorgemerkten Aktivitäten gefunden.</Text>
				) : (
					bookmarkedActivities.map((activity) => (
						<Card>
							<Group justify="space-between" key={activity.id}>
								<Card>
									<Title size="sm">{activity.name}</Title>
									<Text>{activity.description}</Text>
								</Card>
								<ActionIcon
									size={"xl"}
									color="red"
									onClick={() => removeFromBookmarks(activity.id)}
									aria-label="Button Entfernen Aktivität"
								>
									<IconTrash></IconTrash>
								</ActionIcon>
							</Group>
						</Card>
					))
				)}
			</Stack>
		</Container>
	);
}
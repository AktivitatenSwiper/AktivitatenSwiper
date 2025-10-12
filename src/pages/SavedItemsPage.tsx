import { Container, Skeleton, Stack, Text, Title } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { IconBookmark, IconStar } from "@tabler/icons-react";

export default function SavedItemsPage() {
	const [starredCardIds] = useLocalStorage({
		key: 'star-list',
		defaultValue: [],
	});

	return (
		<Container p="md" w="100%">
			<Title mb="lg">Gespeicherte Aktivitäten</Title>
			<Text>TODO: Auf dieser Seite soll es mehrere Kategorien / Listen geben (z. B. "Favoriten" mit dem Stern-Symbol und "Vorgemerkt" mit dem Häckchen-Symbol)</Text>


			<Title order={2} my="lg">
				<IconStar /> Meine Favoriten
			</Title>
			<Stack>
				<p>Aktuelle Favoriten: {JSON.stringify(starredCardIds)}</p>
				<Skeleton>
					TODO!
				</Skeleton>
				<Skeleton>
					TODO!
				</Skeleton>
				<Skeleton>
					TODO!
				</Skeleton>
			</Stack>


			<Title order={2} my="lg">
				<IconBookmark /> Vorgemerkte Aktivitäten
			</Title>
			<Stack>
				<Skeleton>
					TODO!
				</Skeleton>
				<Skeleton>
					TODO!
				</Skeleton>
				<Skeleton>
					TODO!
				</Skeleton>
			</Stack>
		</Container>
	);
}
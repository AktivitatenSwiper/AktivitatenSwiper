import { Button, Stack, Text, Title } from "@mantine/core";
import { IconRefresh, IconSun } from "@tabler/icons-react";
import { activities } from "../data/activities";

export default function ActivityCardSwipeEnd() {
	return (
		<Stack align="center" justify="center" style={{ flexGrow: 1, height: "100%" }}>
			<IconSun size={40} stroke={1.5} />
			<Title>Keine weiteren Aktivitäten.</Title>
			<Text c="dimmed" size="lg" ta="center">
				Du hast alle Aktivitäten zugeordnet. Prüfe deine gespeicherten Aktivitäten, um die beste Aktivität zu finden.
			</Text>
			<Button
				leftSection={<IconRefresh />}
				onClick={() => {
					for (let i = 1; i <= activities.length; i++) {
						setTimeout(() => document.getElementById("undo-button")?.click?.(), 1000 * i/activities.length);
					}
				}}
			>
				Von vorne beginnen
			</Button>
		</Stack>
	);
}
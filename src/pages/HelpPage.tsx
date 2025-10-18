import { Container, Skeleton, Stack, Text, Title } from "@mantine/core";
import { IconEyeQuestion, IconHandMove } from "@tabler/icons-react";

export default function HelpPage() {
	return (
		<Container p="md" w="100%">
			<Title mb="lg">Hilfe</Title>
			<Text>TODO: Auf dieser Seite sollen alle Symbole des Swipers erklärt werden (Buttons)</Text>
			<Text>TODO: Zusätzlich soll auf die Navigation per Tastatur (Pfeiltasten), Trackpad (Swipe) und Touchscreen (Swipe) hingewiesen werden</Text>


			<Title order={2} my="lg">
				<IconEyeQuestion /> Symbol-Erklärung
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


			<Title order={2} my="lg">
				<IconHandMove /> Interaktions-Möglichkeiten
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
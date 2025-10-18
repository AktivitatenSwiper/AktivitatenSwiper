import { Drawer, Text } from "@mantine/core";

export default function SearchFilterDrawer(props: { opened: boolean, onClose: () => void }) {


	return (
		<Drawer
			offset={8}
			radius="md"
			opened={props.opened}
			onClose={props.onClose}
			title={
				<Text fw="bold" size="xl">Such-Filter anpassen</Text>
			}
			position="bottom"
		>
			// Hier kommen die ganzen Filter hin, vermutlich am besten mit
			// Mantine Komponenten: https://mantine.dev/core/multi-select/
		</Drawer>
	)
}
import { IconCalendarPlus, IconClock, IconCoinEuro, IconShare, IconTags, IconTemperatureSun, IconTool, IconUser, IconUsersGroup } from '@tabler/icons-react';
import type { Activity } from '../types/activity';
import { ActionIcon, Badge, Button, Divider, Drawer, Grid, Group, Text } from '@mantine/core';
import React from 'react';
export default function ActivityDetailsDrawer(props: { data: Activity|null, opened: boolean, onClose: () => void }) {
	if(!props.data) return <></>;

	const data = props.data;
  const numberOfParticipants =
    data.min_participants === data.max_participants
      ? data.min_participants
      : `${data.min_participants} - ${data.max_participants}`;

  const priceRange =
    data.min_cost === data.max_cost
      ? data.min_cost
      : `${data.min_cost} - ${data.max_cost}`;

			const dataRows = [
				{
					color: "gray",
					icon: data.max_participants === 1 ? <IconUser /> : <IconUsersGroup />,
					text: "Teilnehmer",
					value: <>{numberOfParticipants} Person(en)</>,
				},
				{
					color: "orange",
					icon: <IconCoinEuro />,
					text: "Kosten",
					value: <>{priceRange} €</>,
				},
				{
					color: "teal",
					icon: <IconClock />,
					text: "Dauer",
					value: <>
						{data.min_required_time % 60 === 0 && data.max_required_time % 60 === 0
							? (
								data.min_required_time === data.max_required_time
									? `${data.min_required_time / 60} h`
									: `${data.min_required_time / 60} - ${data.max_required_time / 60} h`
								)
							: (
								data.min_required_time === data.max_required_time
									? `${data.min_required_time} m`
									: `${data.min_required_time} - ${data.max_required_time} m`
								)
						}
					</>,
				},
				{
					color: "blue",
					icon: <IconTool />,
					text: "Ausrüstung",
					value: <>
						{data.required_equipment && data.required_equipment.length > 0
							? data.required_equipment.join(', ')
							: '-'}
					</>,
				},
				{
					color: "pink",
					icon: <IconTemperatureSun />,
					text: "Saison",
					value: <>{data.seasonal_suitability.join(', ')}</>,
				},
				{
					color: "indigo",
					icon: <IconTags />,
					text: "Tags",
					value: <>
						{data.tags.map(tag => (
							<Badge key={tag} color="indigo" variant="light" mr={4}>{tag}</Badge>
						))}
					</>,
				},
			];


	return (
		<Drawer
			offset={8}
			radius="md"
			opened={props.opened}
			onClose={props.onClose}
			size="36rem"
			title={
				<Group>
					<Text fw="bold" size="xl">{props.data.name}</Text>
					<Badge color="blue" variant="light">{data.category}</Badge>
				</Group>
			}
			position="bottom"
		>
			<Text c="dimmed">{data.description}</Text>
			<div style={{flexGrow: 1}}></div>
			<Divider my="lg" color="gray" />
			<Grid gutter="sm">
				{dataRows.map((row) => (
					<React.Fragment key={row.text}>
						<Grid.Col span={5}>
							<Group>
								{row.icon && <ActionIcon color={row.color}>{row.icon}</ActionIcon>}
								<Text c={row.color} fw={700}>{row.text}</Text>
							</Group>
						</Grid.Col>
						<Grid.Col span={7}>
							{row.value}
						</Grid.Col>
					</React.Fragment>
				))}
			</Grid>
			<Divider my="lg" color="gray" />

			<Button
				fullWidth
				color="blue"
				leftSection={<IconCalendarPlus />}
				onClick={() => {
					// Implement add to calendar functionality here
				}}
			>
				Zum Kalender hinzufügen
			</Button>
			<Button
				fullWidth
				color="blue"
				leftSection={<IconShare />}
				mt="sm"
				variant="light"
				onClick={() => {
					// Implement share functionality here
				}}
			>
				Teilen
			</Button>
		</Drawer>
	)
}
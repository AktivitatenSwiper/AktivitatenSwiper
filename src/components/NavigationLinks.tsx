import { IconBookmark, IconHelp, IconHome } from '@tabler/icons-react';
import classes from './NavigationLinks.module.css';
import { Button } from "@mantine/core";

const tabs = [
	{ link: '',      label: 'Finden',      icon: IconHome },
	{ link: 'saved', label: 'Gespeichert', icon: IconBookmark },
	{ link: 'help',  label: 'Hilfe',       icon: IconHelp },

]

import React from "react";

type NavigationLinksProps = {
	page: string;
	setPage: (page: string) => void;
};

export default function NavigationLinks({ page, setPage }: NavigationLinksProps): React.ReactElement[] {
	return tabs.map((item) => {
		const isActive = item.link === page

		return (
			<Button
				variant={isActive ? "subtle" : "subtle"}
				color={isActive ? "blue" : "black"}
				key={item.label}
				onClick={(event) => {
					event.preventDefault();
					setPage(item.link);
				}}
				leftSection={<item.icon className={classes.linkIcon} stroke={1.5} />}
			>
				{item.label}
			</Button>
		)
	});
}
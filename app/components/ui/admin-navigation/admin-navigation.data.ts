import { getAdminHomeUrl,getAdminUrl } from 'config/url.config'

import { INavItem } from './admin-navigation.interface'

export const navItems: INavItem[] = [
	{
		title: 'Stats',
		link: getAdminHomeUrl(),
	},
	{
		title: 'Users',
		link: getAdminUrl('users'),
	},
	{
		title: 'Фильмы',
		link: getAdminUrl('movies'),
	},
	{
		title: 'Актеры',
		link: getAdminUrl('actors'),
	},
	{
		title: 'Жанры',
		link: getAdminUrl('genres'),
	},
	{
		title: 'Тэги',
		link: getAdminUrl('tags'),
	},
]

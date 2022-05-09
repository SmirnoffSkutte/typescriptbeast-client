import { IMenu } from "./menu.interface";

export const firstMenu:IMenu={
    title:'',
    items:[
        {
			link: '/genres/collections',
			title: 'Категории',
		},
        {
			link: '/actorsPage',
			title: 'Актеры',
		},
        {
			link: '/tags/collections',
			title: 'Тэги',
		}
    ]
}

export const userMenu:IMenu={
    title:'Профиль',
    items:[]
}


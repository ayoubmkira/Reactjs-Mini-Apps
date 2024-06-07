const menuData = [
    {
        id: 1,
        label: 'Home',
        link: '/'
    },
    {
        id: 2,
        label: 'About',
        link: '/about',
        children: [
            {
                id: 3,
                label: 'Team',
                link: '/about/team',
                children: [
                    {
                        id: 4,
                        label: "Tech",
                        link: "/about/team/tech",
                        children: [
                            {
                                id: 5,
                                label: "Web",
                                link: "/about/team/tech/web"
                            },
                            {
                                id: 6,
                                label: "Mobile",
                                link: "/about/team/tech/mobile"
                            },
                            {
                                id: 7,
                                label: "Cloud",
                                link: "/about/team/tech/cloud"
                            }
                        ]
                    },
                    {
                        id: 8,
                        label: "Design",
                        link: "/about/team/design",
                    }
                ]
            },
            {
                id: 9,
                label: 'History',
                link: '/about/history'
            }
        ]
    },
    {
        id: 10,
        label: "Services",
        link: "/services",
        children: [
            {
                id: 11,
                label: "Marketing",
                link: "/services/merketing"
            },
            {
                id: 12,
                label: "Developement",
                link: "/services/developement"
            }
        ]
    },
    {
        id: 13,
        label: "Technologies",
        link: "/technologies",
        children: [
            {
                id: 14,
                label: "Web",
                link: "/technologies/web",
                children: [
                    {
                        id: 15,
                        label: "Html",
                        link: "/technologies/web/html"
                    },
                    {
                        id: 16,
                        label: "Css",
                        link: "/technologies/web/css"
                    },
                    {
                        id: 17,
                        label: "Javascript",
                        link: "/technologies/web/javascript"
                    }
                ]
            },
            {
                id: 18,
                label: "Cloud",
                link: "/technologies/cloud"
            },
            {
                id: 19,
                label: "Mobile",
                link: "/technologies/developement",
                children: [
                    {
                        id: 20,
                        label: "Android",
                        link: "/technologies/mobile/android"
                    },
                    {
                        id: 21,
                        label: "iOs",
                        link: "/technologies/mobile/ios"
                    }
                ]
            }
        ]
    },
    {
        id: 22,
        label: "Contact",
        link: "/contact"
    }
];

export default menuData;
// export default {
//     head: [
//         "name",
//         "type",
//         "parent",
//         "state"
//     ],
//     body: [
//         {
//             name: "bocchi-terminal",
//             type: "dir",
//             parent: "",
//             state: true,
//         },
//         {
//             name: "home",
//             type: "dir",
//             parent: "bocchi-terminal",
//             state: false
//         },
//         {
//             name: "desktop",
//             type: "dir",
//             parent: "bocchi-terminal",
//             state: true
//         },
//         {
//             name: "temp",
//             type: "dir",
//             parent: "bocchi-terminal",
//             state: false
//         },
//         {
//             name: "downloads",
//             type: "dir",
//             parent: "bocchi-terminal",
//             state: false
//         },
//         {
//             name: "scripts",
//             type: "dir",
//             parent: "bocchi-terminal",
//             state: false
//         },
//         {
//             name: "logs",
//             type: "dir",
//             parent: "bocchi-terminal",
//             state: false
//         },
//         {
//             name: "backups",
//             type: "dir",
//             parent: "bocchi-terminal",
//             state: false
//         },
//         {
//             name: "systems",
//             type: "dir",
//             parent: "bocchi-terminal",
//             state: false
//         },
//         {
//             name: "docs",
//             type: "dir",
//             parent: "bocchi-terminal",
//             state: false
//         },
//         {
//             name: "BTR",
//             type: "dir",
//             parent: "desktop",
//             state: true
//         },
//         {
//             name: "bocchi.mp4",
//             type: "video",
//             parent: "BTR",
//             state: false
//         },
//         {
//             name: "kessoku.mp4",
//             type: "video",
//             parent: "BTR",
//             state: false
//         },
//         {
//             name: "kita.mp4",
//             type: "video",
//             parent: "BTR",
//             state: false
//         },
//         {
//             name: "nijika.mp4",
//             type: "video",
//             parent: "BTR",
//             state: false
//         },
//         {
//             name: "ryo.mp4",
//             type: "video",
//             parent: "BTR",
//             state: false
//         }
//     ]
// }
export default {
    body: [
        {
            name: "bocchi-terminal",
            type: "dir",
            parent: null,
            state: true,
            children: [
                {
                    name: "home",
                    type: "dir",
                    parent: "bocchi-terminal",
                    state: false,
                    children: [
                        {
                            name: "dummy",
                            type: "dir",
                            parent: "home",
                            state: false,
                            children: [
                                {
                                    name: "dummy2",
                                    type: "dir",
                                    parent: "dummy",
                                    state: false,
                                    children: []
                                }
                            ]
                        },
                    ]
                },
                {
                    name: "desktop",
                    type: "dir",
                    parent: "bocchi-terminal",
                    state: true,
                    children: []
                },
                {
                    name: "temp",
                    type: "dir",
                    parent: "bocchi-terminal",
                    state: false,
                    children: []
                },
                {
                    name: "downloads",
                    type: "dir",
                    parent: "bocchi-terminal",
                    state: false,
                    children: []
                },
                {
                    name: "scripts",
                    type: "dir",
                    parent: "bocchi-terminal",
                    state: false,
                    children: []
                },
                {
                    name: "logs",
                    type: "dir",
                    parent: "bocchi-terminal",
                    state: false,
                    children: []
                },
                {
                    name: "backups",
                    type: "dir",
                    parent: "bocchi-terminal",
                    state: false,
                    children: []
                },
                {
                    name: "systems",
                    type: "dir",
                    parent: "bocchi-terminal",
                    state: false,
                    children: []
                },
                {
                    name: "docs",
                    type: "dir",
                    parent: "bocchi-terminal",
                    state: false,
                    children: []
                },
                {
                    name: "BTR",
                    type: "dir",
                    parent: "bocchi-terminal",
                    state: true,
                    children: [
                        {
                            name: "bocchi.mp4",
                            type: "video",
                            parent: "BTR",
                            state: false
                        },
                        {
                            name: "bocchi2.mp4",
                            type: "video",
                            parent: "BTR",
                            state: false
                        },
                        {
                            name: "bocchi3.mp4",
                            type: "video",
                            parent: "BTR",
                            state: false
                        },
                        {
                            name: "kita.mp4",
                            type: "video",
                            parent: "BTR",
                            state: false
                        },
                        {
                            name: "kita2.mp4",
                            type: "video",
                            parent: "BTR",
                            state: false
                        },
                        {
                            name: "nijika.mp4",
                            type: "video",
                            parent: "BTR",
                            state: false
                        },
                        {
                            name: "ryo.mp4",
                            type: "video",
                            parent: "BTR",
                            state: false
                        },
                        {
                            name: "ryo2.mp4",
                            type: "video",
                            parent: "BTR",
                            state: false
                        },
                        {
                            name: "kessoku.mp4",
                            type: "video",
                            parent: "BTR",
                            state: false
                        },
                    ]
                },
            ]
        }
    ]
}
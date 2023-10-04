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
//             state: 1,
//         },
//         {
//             name: "home",
//             type: "dir",
//             parent: "bocchi-terminal",
//             state: 0
//         },
//         {
//             name: "desktop",
//             type: "dir",
//             parent: "bocchi-terminal",
//             state: 1
//         },
//         {
//             name: "temp",
//             type: "dir",
//             parent: "bocchi-terminal",
//             state: 0
//         },
//         {
//             name: "downloads",
//             type: "dir",
//             parent: "bocchi-terminal",
//             state: 0
//         },
//         {
//             name: "scripts",
//             type: "dir",
//             parent: "bocchi-terminal",
//             state: 0
//         },
//         {
//             name: "logs",
//             type: "dir",
//             parent: "bocchi-terminal",
//             state: 0
//         },
//         {
//             name: "backups",
//             type: "dir",
//             parent: "bocchi-terminal",
//             state: 0
//         },
//         {
//             name: "systems",
//             type: "dir",
//             parent: "bocchi-terminal",
//             state: 0
//         },
//         {
//             name: "docs",
//             type: "dir",
//             parent: "bocchi-terminal",
//             state: 0
//         },
//         {
//             name: "BTR",
//             type: "dir",
//             parent: "desktop",
//             state: 1
//         },
//         {
//             name: "bocchi.mp4",
//             type: "video",
//             parent: "BTR",
//             state: 0
//         },
//         {
//             name: "kessoku.mp4",
//             type: "video",
//             parent: "BTR",
//             state: 0
//         },
//         {
//             name: "kita.mp4",
//             type: "video",
//             parent: "BTR",
//             state: 0
//         },
//         {
//             name: "nijika.mp4",
//             type: "video",
//             parent: "BTR",
//             state: 0
//         },
//         {
//             name: "ryo.mp4",
//             type: "video",
//             parent: "BTR",
//             state: 0
//         }
//     ]
// }
export default {
    body: [
        {
            name: "bocchi-terminal",
            type: "dir",
            parent: null,
            state: 1,
            children: [
                {
                    name: "home",
                    type: "dir",
                    parent: "bocchi-terminal",
                    state: 0,
                    children: [
                        {
                            name: "dummy",
                            type: "dir",
                            parent: "home",
                            state: 0
                        },
                    ]
                },
                {
                    name: "desktop",
                    type: "dir",
                    parent: "bocchi-terminal",
                    state: 1,
                    children: []
                },
                {
                    name: "temp",
                    type: "dir",
                    parent: "bocchi-terminal",
                    state: 0,
                    children: []
                },
                {
                    name: "downloads",
                    type: "dir",
                    parent: "bocchi-terminal",
                    state: 0,
                    children: []
                },
                {
                    name: "scripts",
                    type: "dir",
                    parent: "bocchi-terminal",
                    state: 0,
                    children: []
                },
                {
                    name: "logs",
                    type: "dir",
                    parent: "bocchi-terminal",
                    state: 0,
                    children: []
                },
                {
                    name: "backups",
                    type: "dir",
                    parent: "bocchi-terminal",
                    state: 0,
                    children: []
                },
                {
                    name: "systems",
                    type: "dir",
                    parent: "bocchi-terminal",
                    state: 0,
                    children: []
                },
                {
                    name: "docs",
                    type: "dir",
                    parent: "bocchi-terminal",
                    state: 0,
                    children: []
                },
                {
                    name: "BTR",
                    type: "dir",
                    parent: "bocchi-terminal",
                    state: 1,
                    children: [
                        {
                            name: "bocchi.mp4",
                            type: "video",
                            parent: "BTR",
                            state: 0
                        },
                        {
                            name: "kessoku.mp4",
                            type: "video",
                            parent: "BTR",
                            state: 0
                        },
                        {
                            name: "kita.mp4",
                            type: "video",
                            parent: "BTR",
                            state: 0
                        },
                        {
                            name: "nijika.mp4",
                            type: "video",
                            parent: "BTR",
                            state: 0
                        },
                        {
                            name: "ryo.mp4",
                            type: "video",
                            parent: "BTR",
                            state: 0
                        }
                    ]
                },
            ]
        }
    ]
}
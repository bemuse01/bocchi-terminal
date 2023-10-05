const root = 'bocchi-terminal'

const dirs = ['home', 'desktop', 'temp', 'backups', 'docs', 'systems', 'scripts', 'logs', 'downloads']
const chars = '0123456789abcdefghijklmnopqrstuvwxyz-_'

const createName = (min, max) => {
    const len = ~~(Math.random() * (max - min) + min)
    return Array.from({length: len}, _ => chars[~~(Math.random() * chars.length)]).join('')
}
const createChildren = (length, chance, parent, depth) => {
    if(!chance) return []
    if(depth > 2) return []

    depth++

    return Array.from({length}, _ => {
        const name = createName(4, 8)
        const type = 'dir'
        const chance = Math.random() < 0.5

        const obj = {
            name,
            type,
            parent,
            state: true,
            children: createChildren(1, chance, name, depth)
        }

        return obj
    })
}
const createDirs = () => {
    const temp = []
    dirs.forEach(dir => {
        const state = true
        const chance = Math.random() < 0.5
        const childrenCount = (Math.random() * 1 + 1)
        temp.push({
            name: dir,
            type: 'dir',
            parent: 'bocchi-terminal',
            state,
            children: createChildren(childrenCount, chance, dir, 0)
        })
    })
    return temp
}


export default {
    body: [
        {
            name: root,
            type: "dir",
            parent: null,
            state: true,
            children: [
                ...createDirs(),
                {
                    name: "BTR",
                    type: "dir",
                    parent: root,
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
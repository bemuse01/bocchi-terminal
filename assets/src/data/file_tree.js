import Data from './data.js'

const root = 'bocchi-terminal'
const dirs = ['home', 'desktop', 'temp', 'backups', 'docs', 'systems', 'scripts', 'logs', 'downloads']
const chars = '0123456789abcdefghijklmnopqrstuvwxyz-_'

const createName = (min, max) => {
    const len = ~~(Math.random() * (max - min) + min)
    return Array.from({length: len}, _ => chars[~~(Math.random() * chars.length)]).join('')
}
const createChildren = (length, chance, parent, depth) => {
    if(!chance) return []
    if(depth > 3) return []

    depth++

    return Array.from({length}, _ => {
        const name = createName(4, 8)
        const type = 'dir'
        const chance = Math.random() < 0.5
        const childrenCount = ~~(Math.random() * 1 + 1)

        const obj = {
            name,
            type,
            parent,
            state: true,
            children: createChildren(childrenCount, chance, name, depth)
        }

        return obj
    })
}
const createDirs = () => {
    const temp = []
    dirs.forEach(dir => {
        const state = true
        const chance = 1
        const childrenCount = ~~(Math.random() * 2 + 1)
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
const createBTR = () => {
    const name = 'BTR'
    const type = 'dir'
    const parent = root
    const state = true
    const children = Array.from(Data, e => ({
        name: e.filename,
        type: 'video',
        parent: name,
    }))

    return{
        name,
        type,
        parent,
        state,
        children
    }
}


export default {
    body: [
        {
            name: root,
            type: "dir",
            parent: null,
            state: true,
            children: [
                createBTR(),
                ...createDirs(),
            ]
        }
    ]
}
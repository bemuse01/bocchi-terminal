import Method from '../../method/method.js'

export default class{
    constructor(){
        this.dirs = ['home', 'desktop', 'temp', 'backups', 'docs', 'systems', 'scripts', 'logs', 'downloads']
        this.type = ['d']
        this.auth = ['r', 'w', 'x']
        this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        this.chars = 'abcdefghijklmnopqrstuvwxyz-_'
        this.numsOfDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        this.sizePadding = 5
    }


    // command
    createCommand(){
        const main = 'ls'
        const dir1 = this.dirs[~~(Math.random() * this.dirs.length)]
        const dir2 = Method.uuidv4()
        return `${main} -l /${dir1}/${dir2}`
    }


    // info
    createInfos(num){
        const temp = Array.from({length: num}, _ => this.createInfo())
        temp.unshift('')
        temp.push('')
        return temp
    }
    createInfo(){
        const auth = this.createAuths()
        const hardlink = this.createHardLink()
        const owner = 'user user'
        const size = this.createSize()
        const date = this.createDate()
        const name = this.createName()
        return [' ', auth, hardlink, owner, size, date, name].join('  ')
    }
    // auth
    createAuths(){
        const type = this.createAuth(this.type)
        const owner = this.createAuth(this.auth)
        const group = this.createAuth(this.auth)
        const other = this.createAuth(this.auth)
        return type + owner + group + other
    }
    createAuth(temp){
        return temp.map(e => Math.random() < 0.5 ? e : '-').join('')
    }
    // hard link
    createHardLink(){
        return ~~(Math.random() * 9 + 1)
    }
    // size
    createSize(){
        const size = (2 ** ~~(Math.random() * 17)).toString()

        const padding = Array.from({length: this.sizePadding - size.length}, _ => ' ').join('')

        return size + padding
    }
    // date
    createDate(){
        const idx = ~~(Math.random() * this.months.length)
        const month = this.months[idx]
        const rday = ~~(Math.random() * this.numsOfDay[idx])
        const day = rday < 10 ? '0' + rday : '' + rday
        const rhour = ~~(Math.random() * 24)
        const hour = rhour < 10 ? '0' + rhour : '' + rhour
        const rmin = ~~(Math.random() * 60)
        const min = rmin < 10 ? '0' + rmin : '' + rmin
        const time = `${hour}:${min}`
        return `${month} ${day} ${time}`
    }
    // name
    createName(){
        const len = ~~(Math.random() * 27 + 3)
        return Array.from({length: len}, _ => this.chars[~~(Math.random() * this.chars.length)]).join('')
    }
}
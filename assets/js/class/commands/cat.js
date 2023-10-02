import Method from '../../method/method.js'

export default class{
    constructor(){
        this.dirs = ['home', 'desktop', 'temp', 'backups', 'docs', 'systems', 'scripts', 'logs', 'downloads']
        this.hex = '0123456789abcdef'
        this.chars = 'abcdefghijklmnopqrstuvwxyz-_'
        this.hexCount = {min: 6, max: 30}
        this.uniCount = {min: 5, max: 15}
        this.uniMax = 1114111
        this.maxPadding = this.uniMax.toString().length
    }


    // command
    createCommand(){
        const main = 'cat'
        const dir1 = this.dirs[~~(Math.random() * this.dirs.length)]
        const dir2 = Method.uuidv4()
        const name = this.createName(5, 20)
        return `${main} /${dir1}/${dir2}/${name}`
    }
    createName(min, max){
        const len = ~~(Math.random() * (max - min) + min)
        return Array.from({length: len}, _ => this.chars[~~(Math.random() * this.chars.length)]).join('')
    }


    // info
    createInfos(num){
        const chance = ~~(Math.random() * 2)

        const temp = []

        switch(chance){
            case 0:
                temp.push(...Array.from({length: num}, _ => this.createHex()))
                break
            case 1:
                temp.push(...Array.from({length: num}, _ => this.createUnicode()))
                break
            default:
                break
        }

        temp.unshift('')
        temp.push('')

        return temp
    }

    
    // hex
    randHex(num){
        return Array.from({length: num}, _ => this.hex[~~(Math.random() * this.hex.length)]).join('')
    }
    createHex(){
        const {min, max} = this.hexCount
        const count = ~~(Math.random() * (max - min) + min)

        return ['  ', ...Array.from({length: count}, _ => this.randHex(2))].join('  ')
    }


    // unicode
    randUnicode(){
        const rand = Math.floor(Math.random() * this.uniMax).toString()
        const padding = Array.from({length: this.maxPadding - rand.length}, _ => ' ').join('')
        return padding + rand
    }
    createUnicode(){
        const {min, max} = this.uniCount
        const count = ~~(Math.random() * (max - min) + min)

        return ['  ', ...Array.from({length: count}, _ => this.randUnicode())].join('  ')
    }
}
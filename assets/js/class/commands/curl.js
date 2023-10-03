export default class{
    constructor(){
        this.chars = 'abcdefghijklmnopqrstuvwxyz-_'
        this.namePadding = 12
    }


    // command 
    createCommand(){
        const main = 'curl'
        const address = this.createName(5, 15)
        const domain = this.createName(3, 10)
        const name = this.createName(3, 20)
        return `${main} -O https://${address}.${domain}/${name}`
    }


    // dl list
    createDlList(){
        const count = ~~(Math.random() * 4 + 1)
        return Array.from({length: count}, _ => {

            const name = this.createName(5, this.namePadding)
            const padding = Array.from({length: this.namePadding - name.length}, _ => ' ').join('')

            return {
                done: 0,
                max: ~~(Math.random() * 70 + 30),
                name: name + padding,
                text: ''
            }
        })
    }


    // 
    createName(min, max){
        const len = ~~(Math.random() * (max - min) + min)
        return Array.from({length: len}, _ => this.chars[~~(Math.random() * this.chars.length)]).join('')
    }
}
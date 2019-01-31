import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faBell, faBellSlash } from '@fortawesome/free-regular-svg-icons'

export default class FontawesomeAdapter {
    constructor() {
        library.add(
            fab,
            faCheckSquare,
            faCoffee,
            faBell,
            faBellSlash
        );
    }
}
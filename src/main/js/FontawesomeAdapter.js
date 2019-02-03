import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faTrafficLight,
    faServer,
    faCheckCircle,
    faExclamationCircle,
    faTrashAlt,
    faPlus,
    faSave
} from "@fortawesome/free-solid-svg-icons";

export default class FontawesomeAdapter {
    constructor() {
        library.add(
            faTrafficLight,
            faServer,
            faCheckCircle,
            faExclamationCircle,
            faTrashAlt,
            faPlus,
            faSave
        );
    }
}
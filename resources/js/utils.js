import moment from "moment";
import "moment/locale/fr";

export function formatDateRelative(dateISO) {   
    moment.locale('fr');   
    return moment(dateISO).fromNow();
}
import {ref} from "vue";

export default {
    teleportTo: ref(null),
    SET_TELEPORT_TO(val) {
        this.teleportTo.value = val
    }
}

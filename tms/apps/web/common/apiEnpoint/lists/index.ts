import { TAG } from "../tag.api";
import { POSTS } from "../user.api";

export const ListQueryConfig = {
    USER: {
        key: ["User"],
        url: `${POSTS.LIST}`
    },
    TAG: {
        key: ["Tag"],
        url: `${TAG.LIST}`
    }
}
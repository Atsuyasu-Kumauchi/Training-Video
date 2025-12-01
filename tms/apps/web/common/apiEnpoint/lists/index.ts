import { TAG } from "../tag.api";
import { TEST_CREATION_LIST } from "../testCreation.api";
import { TRAINING_LIST } from "../training.api";
import { POSTS } from "../user.api";
import { VIDEO_LIST } from "../videoList.api";

export const ListQueryConfig = {
    USER: {
        key: ["User"],
        url: `${POSTS.LIST}`
    },
    TAG: {
        key: ["Tag"],
        url: `${TAG.LIST}`
    },
    VIDEO_LIST: {
        key: ["VideoList"],
        url: `${VIDEO_LIST.LIST}`
    },
    TRAINING_LIST: {
        key: ["TrainingList"],
        url: `${TRAINING_LIST.LIST}`
    },
    TEST_CREATION_LIST: {
        key: ["TestCreationList"],
        url: `${TEST_CREATION_LIST.LIST}`
    },
}
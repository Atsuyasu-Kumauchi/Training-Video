import { ASSIGNMENT_LIST } from "../assignmentList.api";
import { ASSIGNMENT_REVIEW } from "../assignmentReview.api";
import { DEPARTMENT } from "../department.api";
import { ROLE } from "../role.api";
import { MY_TRAINING_LIST } from "../student";
import { TAG } from "../tag.api";
import { TEST_CREATION_LIST } from "../testCreation.api";
import { TRAINING_LIST } from "../training.api";
import { USERS } from "../user.api";
import { VIDEO_LIST } from "../videoList.api";

export const ListQueryConfig = {
    USER: {
        key: ["UserList"],
        url: `${USERS.LIST}`
    },
    TAG_LIST: {
        key: ["TagList"],
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
    MY_TRAINING_LIST: {
        key: ["MyTrainingList"],
        url: `${MY_TRAINING_LIST.LIST}`
    },
    TEST_CREATION_LIST: {
        key: ["TestCreationList"],
        url: `${TEST_CREATION_LIST.LIST}`
    },
    ASSIGNMENT_LIST: {
        key: ["AssignmentList"],
        url: `${ASSIGNMENT_LIST.LIST}`
    },
    ASSIGNMENT_REVIEW_LIST: {
        key: ["AssignmentReview"],
        url: `${ASSIGNMENT_REVIEW.LIST}`
    },
    DEPARTMENT_LIST: {
        key: ["DepartmentList"],
        url: `${DEPARTMENT.LIST}`
    },
    ROLE_LIST: {
        key: ["RoleList"],
        url: `${ROLE.LIST}`
    },
}
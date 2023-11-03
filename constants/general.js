// constant for http status codes and its name
module.exports.HTTP_STATUS_CODE = {
    ACCEPTED: 202,
    BAD_GATEWAY: 502,
    BAD_REQUEST: 400,
    CONFLICT: 409,
    CONTINUE: 100,
    CREATED: 201,
    EXPECTATION_FAILED: 417,
    FAILED_DEPENDENCY: 424,
    FORBIDDEN: 403,
    GATEWAY_TIMEOUT: 504,
    GONE: 410,
    HTTP_VERSION_NOT_SUPPORTED: 505,
    IM_A_TEAPOT: 418,
    INSUFFICIENT_SPACE_ON_RESOURCE: 419,
    INSUFFICIENT_STORAGE: 507,
    INTERNAL_SERVER_ERROR: 500,
    LENGTH_REQUIRED: 411,
    LOCKED: 423,
    METHOD_FAILURE: 420,
    METHOD_NOT_ALLOWED: 405,
    MOVED_PERMANENTLY: 301,
    MOVED_TEMPORARILY: 302,
    MULTI_STATUS: 207,
    MULTIPLE_CHOICES: 300,
    NETWORK_AUTHENTICATION_REQUIRED: 511,
    NO_CONTENT: 204,
    NON_AUTHORITATIVE_INFORMATION: 203,
    NOT_ACCEPTABLE: 406,
    NOT_FOUND: 404,
    NOT_IMPLEMENTED: 501,
    NOT_MODIFIED: 304,
    OK: 200,
    PARTIAL_CONTENT: 206,
    PAYMENT_REQUIRED: 402,
    PERMANENT_REDIRECT: 308,
    PRECONDITION_FAILED: 412,
    PRECONDITION_REQUIRED: 428,
    PROCESSING: 102,
    PROXY_AUTHENTICATION_REQUIRED: 407,
    REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
    REQUEST_TIMEOUT: 408,
    REQUEST_TOO_LONG: 413,
    REQUEST_URI_TOO_LONG: 414,
    REQUESTED_RANGE_NOT_SATISFIABLE: 416,
    RESET_CONTENT: 205,
    SEE_OTHER: 303,
    SERVICE_UNAVAILABLE: 503,
    SWITCHING_PROTOCOLS: 101,
    TEMPORARY_REDIRECT: 307,
    TOO_MANY_REQUESTS: 429,
    UNAUTHORIZED: 401,
    UNAVAILABLE_FOR_LEGAL_REASONS: 451,
    UNPROCESSABLE_ENTITY: 422,
    UNSUPPORTED_MEDIA_TYPE: 415,
    USE_PROXY: 305,
    MISDIRECTED_REQUEST: 421,
};

// constant for error source and description
exports.errorSource = {
    INPUT_VALIDATION: {
        name: "input_validation",
        desc: "error thrown from api input validation",
        type: "validation error"
    },
    SCHEDULE_VALIDATION: {
        name: "schedule_validation",
        desc: "Schedule validation error",
        type: "validation error"
    }
}


exports.category = {
    JUICE: "juice",
    SMOOTHIE: "smoothie",
    MILKSHAKE: "milkshake",
    ICE_CREAM: "ice_cream",
    FRUIT_SALAD: "fruit_salad",
    FRUITS: "fruits",
    VEGETABLES: "food",
}


exports.plotTypes = {
    GODOWN: "godown",
    PLOT: "plot",
    VILLA: "villa",
    LEASE_SPACE: "lease_space",
    BUILDING: "building",
    COMMERCIAL_PLOT: "commercial_plot",
    NON_COMMERCIAL_PLOT: "non_commercial_plot",
    SINGLE_ShUTTER: "single_shutter",
    HOUSE_COMMERCIAL: "house_commercial",
    VILLA: "villa",
    PG: "pg",
    HOSTEL: "hostel",
}



exports.propertyTypes = {
    COMMERCIAL: "commercial",
    NON_COMMERCIAL: "non_commercial",
}
// User roles
exports.UserRoles = {
    SUPER_ADMIN: "super_admin",
    ADMIN: "admin",
    user: "user",
    guest: "guest"
}

// DEFAULT USER PRIVILEGES - ONE TIME INIT
exports.UserPrivilegesList = {

    SUPER_ADMIN: {
        userRole: "super_admin",
        privileges: ["create_admin", "create_post", "delete_post", "edit_post", "approve_post", "block_user", "delete_user"],
    },
    ADMIN: {
        userRole: "admin",
        privileges: ["create_post", "delete_post", "edit_post", "approve_post", "block_user"],
    },
    USER: {
        userRole: "user",
        privileges: ["create_post", "delete_post", "edit_post"]
    },
    // GUEST: []
}
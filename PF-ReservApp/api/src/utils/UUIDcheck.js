const UUIDcheck = function (str) {
    const regexExp =
        /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    // Regular expression to check if string is a valid UUID

    let aux = regexExp.test(str);

    return aux;
};

module.exports = {
    UUIDcheck: UUIDcheck,
};
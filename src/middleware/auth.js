
const auth = async function (req, res, next) {
    console.log("enter auth: ");
    next();
}

module.exports = {
    auth,
};


module.exports = {
    prettifyDate: (timestamp) => {
        let d = new Date(timestamp);
        return `${d.getFullYear()}/${d.getMonth()}/${d.getDay()}`;
    }
}
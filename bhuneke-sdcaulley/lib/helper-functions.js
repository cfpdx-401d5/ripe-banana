function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', data => body += data);
        req.on('error', err => reject(err));
        req.on('end', () => {
            const newData = JSON.parse(body);
            resolve(newData);
        });
    });
}

module.exports = {
    parseBody
};
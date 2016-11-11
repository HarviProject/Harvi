const mongoose = require('mongoose');


export class ProviderFactory {

    static connect(host: string) {
        mongoose.connect(host);
    }
}
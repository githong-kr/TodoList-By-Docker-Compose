"use strict";

import moment from 'moment';

const myDate = () => {
    const now = new Date();
    return moment(now).format('YYYY-MM-DD');
};

export { myDate };
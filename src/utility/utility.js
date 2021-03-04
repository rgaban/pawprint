export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const convertEpochToLocal = (timestamp) => {
    let options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short'
    };
    return new Date(timestamp).toLocaleString('en-US', options);
};

export const convertISOToEpoch = (timestamp) => {
    return new Date(timestamp).getTime();
};

export const getDateTime = (timestamp = Date.now()) => {
    let tzOffSet = (new Date()).getTimezoneOffset() * 60000;
    let localISOTime = (new Date(timestamp - tzOffSet)).toISOString().slice(0, -1);
    let updatedTime = localISOTime.replace(/:\d+\.\d+/, '');
    return updatedTime;
};

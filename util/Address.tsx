export const getProvinceName = (id: string, provinces: any) => {
    let result = '';

    for (let i : number = 0; i < provinces.length; i++) {
        if (provinces[i].value === id) {
            result = provinces[i].label;
            break;
        }
    }
    return result
}

export const getDistrictName = (id: string, districts: any) => {
    let result = '';

    for (let i : number = 0; i < districts.length; i++) {
        if (districts[i].value === id) {
            result = districts[i].label;
            break;
        }
    }
    return result
}

export const getDistrictPrefix = (id: string, districts: any) => {
    let result = '';

    for (let i : number = 0; i < districts.length; i++) {
        if (districts[i].value === id) {
            result = districts[i].prefix;
            break;
        }
    }
    return result
}

export const getDistrictId = (code: string, districts: any) => {
    let result = '';

    for (let i : number = 0; i < districts.length; i++) {
        if (districts[i].value === code) {
            result = districts[i]._id;
            break;
        }
    }
    return result
}

export const getStreetId = (code: string, streets: any) => {
    let result = '';

    for (let i : number = 0; i < streets.length; i++) {
        if (streets[i].value === code) {
            result = streets[i]._id;
            break;
        }
    }
    return result
}

export const getStreetName = (id: string, streets: any) => {
    let result = '';

    for (let i : number = 0; i < streets.length; i++) {
        if (streets[i].value === id) {
            result = streets[i].label;
            break;
        }
    }
    return result
}

export const getWardName = (id: string, wards: any) => {
    let result = '';

    for (let i : number = 0; i < wards.length; i++) {
        if (wards[i].value === id) {
            result = wards[i].label;
            break;
        }
    }
    return result
}

export const getWardPrefix = (id: string, wards: any) => {
    let result = '';

    for (let i : number = 0; i < wards.length; i++) {
        if (wards[i].value === id) {
            result = wards[i].prefix;
            break;
        }
    }
    return result
}

export const getWardId = (code: string, wards: any) => {
    let result = '';

    for (let i : number = 0; i < wards.length; i++) {
        if (wards[i].value === code) {
            result = wards[i]._id;
            break;
        }
    }
    return result
}
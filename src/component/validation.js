export const validation ={};

validation.validateBuffet = (value) =>{
    return value!== "";
};

validation.validateEmail = (value) =>{
    const emailRegex= /^\S+@\S+\.\S+$/;
    return emailRegex.test(value);
}

validation.validPlatecount = (value) =>{
    return value>0;
};

validation.validDate = (value) => {
    let formDate= new Date(value);
    let todayDate = new Date();
    return formDate > todayDate;
}
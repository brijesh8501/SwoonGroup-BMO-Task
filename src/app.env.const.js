export const MENU = [{
                        menuTitle: "Home",
                        hrefLink: "/",
                        additionalClass: "",
                        menuType: "single"      
                    }];
export const toTitleCase = (phrase) => {
    return phrase
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};
import { createScreenWidthMediaQuery } from "../../../../utils/styles/styles_utils";

export const styles = (theme) => ({
    icon: {
        marginRight: theme.miscellaneous.spacing,
        width: 14
    },
    translateIcon: {
        marginRight: theme.miscellaneous.spacing,
        width: 14,
        fill: theme?.palette?.light?.[500] ?? "#fff"
    },
    [createScreenWidthMediaQuery("max-width", theme.screenSizes.small)]: {
        translateIcon: {
            marginRight: "unset"
        }
    }
});

import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import { Button } from "@welovedevs/ui";

import { ReactComponent as TranslateIcon } from "../../../../assets/icons/translate.svg";
import { styles } from "./locale_button_styles";

const useStyles = createUseStyles(styles);

export const LocaleButton = ({ onClickHandler, locale }) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const handleClick = () => onClickHandler && onClickHandler();

    return (
        <Button variant="outlined" color="light" onClick={handleClick}>
            <TranslateIcon className={classes.translateIcon} />
            {locale && locale === "en" ? "Français" : "English"}
        </Button>
    );
};

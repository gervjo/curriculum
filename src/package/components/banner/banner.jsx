import React, { memo } from "react";
import cn from "classnames";
import { createUseStyles } from "react-jss";
import { animated, config, useTransition } from "react-spring";

import { UserInformations } from "./user_actions_row/user_informations/user_informations";
import { OPACITY_TRANSITIONS } from "../../utils/springs/common_transitions/opacity_transitions";
import { useReceivedGlobalClasses } from "../hooks/use_received_global_classes";
import { styles } from "./banner_styles";

const useStyles = createUseStyles(styles);

const BannerComponent = ({ customizationOptions }) => {
    const classes = useStyles();
    const [globalReceivedBannerClasses = {}] = useReceivedGlobalClasses("banner");

    const transitions = useTransition(customizationOptions?.imageHeader || null, (item) => `${item?.alt}_${item.url}`, {
        ...OPACITY_TRANSITIONS,
        unique: true,
        config: config.molasses
    });

    return (
        <div className={cn(classes.container, globalReceivedBannerClasses.container)}>
            <div className={cn(classes.overlay, globalReceivedBannerClasses.overlay)} />
            {transitions?.map(
                ({ item, key, props }) =>
                    item && (
                        <animated.img
                            key={key}
                            className={classes.image}
                            src={item?.url}
                            alt={item?.alt}
                            style={props}
                        />
                    )
            )}
            <div className={cn(classes.content, globalReceivedBannerClasses.content)}>
                <UserInformations />
            </div>
        </div>
    );
};

export const Banner = memo(BannerComponent);

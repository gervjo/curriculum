import React, { memo } from "react";
import cn from "classnames";
import { createUseStyles } from "react-jss";
import { animated, config, useTransition } from "react-spring";

import { UserInformations } from "./user_actions_row/user_informations/user_informations";
import { SocialActions } from "./user_actions_row/social_actions/social_actions";
import { EditButton } from "./user_actions_row/edit_button/edit_button";
import { CustomizeButton } from "./user_actions_row/customize_button/customize_button";
import { useAdditionalNodes } from "../hooks/use_additional_nodes";
import { useReceivedGlobalClasses } from "../hooks/use_received_global_classes";
import { OPACITY_TRANSITIONS } from "../../utils/springs/common_transitions/opacity_transitions";
import { useMode } from "../hooks/use_mode";
import { styles } from "./banner_styles";

const useStyles = createUseStyles(styles);

const BannerComponent = ({ customizationOptions }) => {
    const classes = useStyles();
    const [mode] = useMode();
    const [actionsButtons] = useAdditionalNodes("banner.actionsButtons", null);
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
                <SocialActions>
                    {actionsButtons}
                    {mode === "edit" && <EditButton />}
                    {mode === "edit" && <CustomizeButton customizationOptions={customizationOptions} />}
                </SocialActions>
            </div>
        </div>
    );
};

export const Banner = memo(BannerComponent);

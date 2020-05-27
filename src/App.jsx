import React, { useCallback, useState, useEffect } from "react";
import isArray from "lodash/isArray";
import mergeWith from "lodash/mergeWith";
import omit from "lodash/omit";
import cloneDeep from "lodash/cloneDeep";

import EnJsonStub from "./data/en_json_stub.json";
import FrJsonStub from "./data/fr_json_stub.json";
import DeveloperProfile from "./package";
import { LocaleButton } from "./package/components/banner/user_actions_row/locale_button/locale_button";

const mergeFunction = (objValue, srcValue) => {
    if (!objValue || isArray(objValue)) {
        return srcValue;
    }
    return undefined;
};

const mode = "readOnly";
const resumes = {
  fr: FrJsonStub,
  en: EnJsonStub
};

function App() {
    const [locale, setLocale] = useState("fr");
    const [data, setData] = useState(omit(resumes[locale], "resumeCustomization"));

    const onEdit = useCallback((newData) => setData(mergeWith(cloneDeep(data), newData, mergeFunction)), [
        JSON.stringify(data)
    ]);
    const [customization, setCustomization] = useState(resumes[locale].resumeCustomization || {});

    const onCustomizationChanged = useCallback(setCustomization, [data]);

    useEffect(() => {
        setData(resumes[locale]);
    }, [locale]);

    return (
        <DeveloperProfile
            mode={mode}
            data={data}
            onEdit={onEdit}
            onCustomizationChanged={onCustomizationChanged}
            options={{
                locale,
                apiKeys: {
                    giphy: process.env.REACT_APP_GIPHY
                },
                endpoints: {
                    devicons:
                        "https://firebasestorage.googleapis.com/v0/b/jechercheundev.appspot.com/o/technologies%2Ftechnologies_list.json?alt=media&token=459028ba-d9bc-4480-a3c4-88633afab7e2"
                },
                customization
            }}
            additionalNodes={{
            banner: {
                actionsButtons: (
                    <>
                        <LocaleButton locale={locale} onClickHandler={() => setLocale(locale !== "en" ? "en" : "fr")} />
                    </>
                )
            }
        }}
        />
    );
}

export default App;

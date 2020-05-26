import React, { useCallback, useState } from "react";
import isArray from "lodash/isArray";
import mergeWith from "lodash/mergeWith";
import omit from "lodash/omit";
import cloneDeep from "lodash/cloneDeep";

import JsonStub from "./data/json_stub.json";
import DeveloperProfile from "./package";

const mergeFunction = (objValue, srcValue) => {
    if (!objValue || isArray(objValue)) {
        return srcValue;
    }
    return undefined;
};

const mode = process.env.REACT_APP_MODE || "edit";

function App() {
    const [data, setData] = useState(omit(JsonStub, "resumeCustomization"));

    const onEdit = useCallback((newData) => setData(mergeWith(cloneDeep(data), newData, mergeFunction)), [
        JSON.stringify(data)
    ]);
    const [customization, setCustomization] = useState(JsonStub.resumeCustomization || {});

    const onCustomizationChanged = useCallback(setCustomization, [data]);

    return (
        <DeveloperProfile
            mode={mode}
            data={data}
            onEdit={onEdit}
            onCustomizationChanged={onCustomizationChanged}
            options={{
                locale: "en",
                apiKeys: {
                    giphy: process.env.REACT_APP_GIPHY
                },
                endpoints: {
                    devicons:
                        "https://firebasestorage.googleapis.com/v0/b/jechercheundev.appspot.com/o/technologies%2Ftechnologies_list.json?alt=media&token=459028ba-d9bc-4480-a3c4-88633afab7e2"
                },
                customization
            }}
        />
    );
}

export default App;

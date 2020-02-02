import React, {useCallback, useState, createContext, useContext, useMemo, forwardRef, useRef} from "react";
import { Manager, Reference, Popper } from "react-popper";
import {Arrow, PopperBox} from "./styles";
import cx from 'classnames';
import useOnClickOutside from "use-onclickoutside";

const PopupContext = createContext();

// problem 1 - how to easily pass ref to reference
// problem 2 - how to easily pass ref to popper

export function usePopup() {
    return useContext(PopupContext);
}

export default function Popup({ placement, inverted, size, referenceComponent: ReferenceComponent, popperComponent: PopperComponent }) {
    const [visible, setVisibility] = useState(false);

    const renderReference = useCallback(({ ref }) => {
        if (!ReferenceComponent) return null;
        return <ReferenceComponent ref={ref} />
    }, [ReferenceComponent]);

    const renderPopper = useCallback(({ ref, style, placement = '', arrowProps }) => {
        if (!PopperComponent) return null;
        return <PopperComponent ref={ref} placement={placement} style={style} arrowProps={arrowProps} inverted={inverted} size={size} />
    }, [PopperComponent, inverted, size])

    const ctx = useMemo(() => {
        return {
            visible,
            open: () => setVisibility(true),
            close: () => setVisibility(false),
        };
    }, [visible]);

    return (
        <PopupContext.Provider value={ctx}>
            <Manager>
                <Reference>
                    {renderReference}
                </Reference>
                {
                    visible && (
                        <Popper
                            placement={placement}
                            modifiers={{
                                preventOverflow: { enabled: true, boundariesElement: 'viewport' }
                            }}
                            eventsEnabled={true}
                        >
                            {renderPopper}
                        </Popper>
                    )
                }
            </Manager>
        </PopupContext.Provider>
    );
}
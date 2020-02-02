import React, {forwardRef, useCallback, useMemo, useRef} from 'react';
import Popup, {usePopup} from "./components/Popup";
import cx from "classnames";
import {Arrow, PopperBox} from "./components/Popup/styles";
import useOnClickOutside from "use-onclickoutside";

const Button = forwardRef((props, ref) => {
    const localRef = useRef(null);

    const { visible, open, close } = usePopup();

    const refHandler = useCallback((node) => {
        localRef.current = node;
        if (typeof ref === "function") {
            ref(localRef.current);
        } else {
            ref.current = localRef.current;
        }
    }, [ref]);

    const clickOutSideHandler = useCallback(() => {
        if (!visible) return;

        close();
    }, [close, visible])

    useOnClickOutside(localRef, clickOutSideHandler);

    return (
        <button ref={refHandler} onClick={visible ? close : open} type="button" className="ui primary large button">
            CLICK ME
        </button>
    )
});

const PopupComponent = forwardRef(({ arrowProps, placement, inverted, size, style }, ref) => {
    const [ placementPosition ] = useMemo(() => placement.split('-'), [placement]);

    const popperClasses = useMemo(() => {
        return cx('ui', [size || ''], {
            inverted,
            top: placementPosition === 'top',
            bottom: placementPosition === 'bottom',
            right: placementPosition === 'right',
            left: placementPosition === 'left'
        }, 'popup visible')
    }, [inverted, placementPosition, size]);

    return (
        <PopperBox className={popperClasses} ref={ref} style={style} placement={placementPosition} data-placement={placement}>
            <div className="header">
                Popper element
            </div>
            <div className="content">
                Popper content
            </div>
            <Arrow ref={arrowProps.ref} inverted={inverted} style={arrowProps.style} placement={placementPosition} />
        </PopperBox>
    );
});

function App() {
  return (
      <div className="ui padded center aligned middle aligned grid" style={{ minHeight: '200vh' }}>
        <div className="row">
          <div className="column">
            <Popup placement="left" referenceComponent={Button} popperComponent={PopupComponent} />
          </div>
        </div>
      </div>
  );
}

export default App;

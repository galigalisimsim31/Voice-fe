// GroupButton.jsx
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ButtonGroup from "@mui/material/ButtonGroup";
import MuiButton from "../button"; // your wrapper Button
import styles from "./index.module.css";

/**
 * Behavior:
 * - Each button object may include:
 *   - btnType: "filled" | "outlined" (initial visual type)
 *   - toggleOnClick: boolean (when true and exclusive===false, clicking toggles that button's btnType)
 * - exclusive (default false): when true, clicking a button makes it the single selected "filled" button,
 *   and all others become "outlined". Selection is tracked via selectedIndex/defaultIndex.
 * - non-exclusive: clicking can toggle a single button's state if toggleOnClick is true, otherwise the button's
 *   btnType remains what the caller set (unless caller updates props).
 *
 * - MUI variant: uses "contained" for filled, "outlined" for outlined (so MUI visuals match CSS).
 */

export default function GroupButton({
  buttons = [],
  orientation = "horizontal",
  exclusive = false,
  selectedIndex: controlledSelectedIndex,
  defaultIndex = null,
  onChange = () => {},
  size = "small",
  variant = "outlined",
  className = "",
}) {
  // local selection index state (used when exclusive and uncontrolled)
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);

  // local button-state copy to manage per-button btnType when non-controlled toggles are needed
  const [localButtons, setLocalButtons] = useState(
    () =>
      buttons.map((b) => ({
        ...b,
        btnType: b.btnType || "outlined",
      }))
  );

  // keep localButtons in sync when parent updates the buttons prop
  useEffect(() => {
    setLocalButtons(
      buttons.map((b) => ({
        ...b,
        btnType: b.btnType || "outlined",
      }))
    );
  }, [buttons]);

  const isControlled =
    controlledSelectedIndex !== undefined && controlledSelectedIndex !== null;
  const currentIndex = isControlled ? controlledSelectedIndex : Number(selectedIndex);

  const handleClick = (index, btn) => (e) => {
    // EXCLUSIVE MODE: clicking selects that as the only filled button
    if (exclusive) {
      const next = currentIndex === index ? null : index;
      if (!isControlled) setSelectedIndex(next);

      // update localButtons so visuals follow selection (filled for selected, outlined for others)
      setLocalButtons((prev) =>
        prev.map((p, i) => ({
          ...p,
          btnType: i === next ? "filled" : "outlined",
        }))
      );

      onChange(next, btn);
    } else {
      // NON-EXCLUSIVE MODE: if caller requested toggleOnClick, flip that button's btnType
      if (btn.toggleOnClick) {
        setLocalButtons((prev) =>
          prev.map((p, i) =>
            i === index
              ? { ...p, btnType: p.btnType === "filled" ? "outlined" : "filled" }
              : p
          )
        );
        // report state change: return new btn def and index
        const newBtnDef = {
          ...(btn || {}),
          btnType:
            (localButtons[index] && localButtons[index].btnType) === "filled"
              ? "outlined"
              : "filled",
        };
        onChange(index, newBtnDef);
      } else {
        // not toggling — respect caller's btn.onClick only
        onChange(index, btn);
      }
    }

    // always call the button's own onClick if provided
    if (typeof btn.onClick === "function") btn.onClick(e);
  };

  return (
    <ButtonGroup
      orientation={orientation}
      aria-label="grouped buttons"
      className={`${styles.groupButton} ${className}`}
    >
      {localButtons.map((btn, idx) => {
        const isSelected = exclusive && currentIndex === idx;

        // position classes (rounded left/right/middle)
        let positionClass = "";
        if (idx === 0) positionClass = styles.firstBtn;
        else if (idx === localButtons.length - 1)
          positionClass = styles.lastBtn;
        else positionClass = styles.middleBtn;

        // effective btnType:
        // - if exclusive and this index is the selected one => filled
        // - else use the localButtons' btnType
        const effectiveBtnType = isSelected ? "filled" : (btn.btnType || "outlined");

        // typeClass derives CSS look (your CSS has .filledDefault and .outlinedDefault)
        const typeClass =
          effectiveBtnType === "filled" ? styles.filledDefault : styles.outlinedDefault;

        const externalClass = btn.className || "";

        // combine classes as before
        const btnClass = [
          styles.baseBtn,
          positionClass,
          typeClass,
          externalClass,
        ]
          .filter(Boolean)
          .join(" ");

        // MUI variant should match visual type
        const muiVariant = effectiveBtnType === "filled" ? "contained" : "outlined";

        return (
          <MuiButton
            key={btn.key ?? idx}
            text={btn.text}
            className={btnClass}
            startIcon={btn.startIcon || null}
            endIcon={btn.endIcon || null}
            handleOnClick={handleClick(idx, btn)}
            variant={btn.variant || muiVariant}
            size={btn.size || size}
            fullWidth={btn.fullWidth || false}
            isDisabled={btn.isDisabled || false}
            type={btn.type || "button"}
          />
        );
      })}
    </ButtonGroup>
  );
}

GroupButton.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.object),
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
  exclusive: PropTypes.bool,
  selectedIndex: PropTypes.number,
  defaultIndex: PropTypes.number,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  variant: PropTypes.oneOf(["text", "outlined", "contained"]),
  className: PropTypes.string,
};

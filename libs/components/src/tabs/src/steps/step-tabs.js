import React from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import {
  useGmailTabsStyles,
  useGmailTabItemStyles,
  // @ts-ignore
} from "@mui-treasury/styles/tabs/gmail";

export const GmailTabItem = ({
  color,
  label,
  subLabel,
  tag,
  ...props
}) => {
  const tabItemStyles = useGmailTabItemStyles({ ...props, color });
  return (
    <Tab
      disableTouchRipple
      {...props}
      classes={tabItemStyles}
      label={
        <div className={"MuiTabItem-labelGroup"}>
          <div className={"MuiTabItem-label"}>
            {label}{" "}
            {tag && <span className={"MuiTabItem-tag"}>{tag}</span>}
          </div>
          {subLabel && (
            <div className={"MuiTabItem-subLabel"}>{subLabel}</div>
          )}
        </div>
      }
    />
  );
};

export const GmailTabs = ({
  indicatorColors = ["#d93025", "#1a73e8", "#188038", "#e37400"],
  ...props
}) => {
  const tabsStyles = useGmailTabsStyles({ ...props, indicatorColors });
  return (
    // @ts-ignore
    <Tabs
      {...props}
      children={React.Children.map(props.children, (child, index) =>
        React.cloneElement(child, {
          color: indicatorColors[index],
        })
      )}
      classes={tabsStyles}
      TabIndicatorProps={{
        ...props.TabIndicatorProps,
        children: <div className={`MuiIndicator-${props.value}`} />,
      }}
    />
  );
};

const StepTabs = {
  Tabs: GmailTabs,
  Tab: GmailTabItem,
};

export default StepTabs;

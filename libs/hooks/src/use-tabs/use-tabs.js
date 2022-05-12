import React from 'react';

export default function useTabs(tabList = []) {
  const [tabs, setTabs] = React.useState(tabList);
  const [currentTab, setCurrentTab] = React.useState(0);

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return {
    tabs,
    setTabs,
    currentTab,
    onChangeTab: handleChangeTab,
  };
}

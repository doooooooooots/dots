import React, { useCallback } from 'react';
import { Divider, Button } from '@mui/material';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import { useStore } from '../../context/useStore';

function TabPopperChangeButton(props) {
  const { name } = props;
  const store = useStore();

  const handleDeleteButtonClick = useCallback(() => {
    store.setRelatedData(name, {});
    if (name === 'project') store.setRelatedData('roof', {});
  }, [store, name]);

  return (
    <>
      <Divider />
      <Button
        onClick={handleDeleteButtonClick}
        startIcon={<CompareArrowsOutlinedIcon fontSize="small" />}
        fullWidth
        sx={{
          color: 'grey.500',
          borderColor: 'grey.500',
        }}
      >
        {`Changer de ${name}`}
      </Button>
    </>
  );
}

export default TabPopperChangeButton;

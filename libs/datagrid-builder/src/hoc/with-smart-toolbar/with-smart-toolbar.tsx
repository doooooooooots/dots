import { GridSelectionModel } from '@mui/x-data-grid-pro';
import React, { FunctionComponent, useCallback, useState } from 'react';

const withSmartToolbar = (
  Component: FunctionComponent<any>
): FunctionComponent<any> => {
  const TollbarableComponent = (props: any) => {
    const [open, setOpen] = useState('');
    const [selectionModel, setSelectionModel] =
      React.useState<GridSelectionModel>([]);

    const handleOpen = useCallback((action) => {
      setOpen(action);
    }, []);

    const handleClose = useCallback(() => {
      setOpen('');
    }, []);

    return (
      <Component
        {...props}
        open={open}
        onOpenDialog={handleOpen}
        onCloseDialog={handleClose}
        selectionModel={selectionModel}
        onSelectionModelChange={setSelectionModel}
        withToolbar
      />
    );
  };
  return TollbarableComponent;
};

export default withSmartToolbar;

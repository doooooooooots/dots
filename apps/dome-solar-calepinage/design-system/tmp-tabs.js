const StyledTabs = styled(TabList)({
  minHeight: 'auto',
  button: {
    color: '#999',
    padding: '8px 12px',
    minHeight: 'auto',
    '&.Mui-selected': {
      color: '#333'
    }
  },
  '& .MuiTabs-indicator': {
    backgroundColor: '#333'
  }
});

const TabWithIcon = (props) => {
  const { title, icon: Icon } = props;
  return (
    <Stack direction='row' alignItems='center' spacing={1}>
      <Icon fontSize={'small'} />
      <Typography variant='body2' fontWeight={500}>
        {title}
      </Typography>
    </Stack>
  );
};

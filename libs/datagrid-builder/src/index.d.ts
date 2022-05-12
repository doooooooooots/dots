interface onActionClickPropsType {
  path: string;
  title: string;
  component: React.ReactNode;
  componentProps: actionComponentPropsType;
}

interface actionComponentPropsType {
  onSubmitCallback: () => void;
}
interface actionSuccessType {
  onSubmitCallback: () => void;
}

interface actionPropsType {
  title: string;
  path: string;
}

interface MainFilterbar {
  filterList: string[];
  actionText: string;
  actionProps: actionPropsType;
  ActionComponent: React.ReactNode;
  actionComponentProps: actionComponentPropsType;
  onActionClick: (props: onActionClickPropsType) => void;
  onActionSuccess: actionSuccessType;
}

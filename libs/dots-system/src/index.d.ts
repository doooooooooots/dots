export interface onActionClickPropsType {
  path: string;
  title: string;
  component: React.ReactNode;
  componentProps: actionComponentPropsType;
}

export interface actionComponentPropsType {
  onSubmitCallback: () => void;
}
export interface actionSuccessType {
  onSubmitCallback: () => void;
}

export interface actionPropsType {
  title: string;
  path: string;
}

export interface MainFilterbarType {
  filterList: string[];
  actionText: string;
  actionProps: actionPropsType;
  ActionComponent: React.ReactNode;
  actionComponentProps: actionComponentPropsType;
  onActionClick: (props: onActionClickPropsType) => void;
  onActionSuccess: actionSuccessType;
}

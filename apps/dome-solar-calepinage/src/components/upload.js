import { gql, useMutation } from '@apollo/client';
import React from 'react';

const UPLAOAD_FILE = gql`
  mutation createMedia($file: Upload!) {
    createMediaObject(
      data: {
        name: "Adrien-001"
        url: "http://hello.col"
        avatar: { upload: $file }
      }
    ) {
      id
      url
      avatar {
        id
        filesize
      }
    }
  }
`;

const UploadFile = () => {
  const [mutate, { loading, error }] = useMutation(UPLAOAD_FILE);

  const onChange = ({
    target: {
      validity,
      files: [file],
    },
  }) => validity.valid && mutate({ variables: { file: file } });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{JSON.stringify(error, null, 2)}</div>;

  return (
    <React.Fragment>
      <input type="file" required onChange={onChange} />
    </React.Fragment>
  );
};

export default UploadFile;

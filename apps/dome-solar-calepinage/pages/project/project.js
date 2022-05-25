import React from 'react';
import dynamic from 'next/dynamic';
import Layout from '../../src/components/layout';
import { observer } from 'mobx-react';

const DynamicStep = dynamic(
  () => import('../../src/components/steps/StepTemplate'),
  { ssr: false }
);

const Project = () => {
  return <DynamicStep />;
};

Project.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default observer(Project);

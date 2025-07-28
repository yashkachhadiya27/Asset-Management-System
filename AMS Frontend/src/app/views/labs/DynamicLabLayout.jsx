import React, { Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';

const DynamicLabLayout = () => {
  const { labId } = useParams();
  const LabLayout = lazy(() => import(`../labs/${labId}LabLayout.jsx`));

  return (
    <Suspense fallback={<div>Loading...</div>}>
     {/* <h1>Yovan chheta</h1> */}
      <LabLayout />
    </Suspense>
  );
};

export default DynamicLabLayout;


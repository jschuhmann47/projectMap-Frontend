import React, { useEffect } from 'react';
import LayoutContainer from 'containers/LayoutContainer';
import { useParams } from 'react-router';
import OKRView from 'views/OKRView/indexv2';
import { Grid } from '@mui/material';
import {
  onAddKeyResult,
  onDeleteKeyResult,
  onEditKeyResult,
  onEditTool,
  onGetOneTool,
} from 'redux/actions/okr.actions';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Loading from 'components/commons/Loading';
import { frequencyOptions } from 'helpers/enums/okr';

const OKRContainer = () => {
  const { okrToolId, id } = useParams();
  const dispatch = useDispatch();
  const { loading, data: okrData } = useSelector((state) => state.okr);
  const [isEditOkrModalOpen, setIsEditOkrModalOpen] = useState(false);
  const [isAddKrModalOpen, setIsAddKrModalOpen] = useState(false);

  useEffect(() => {
    dispatch(onGetOneTool(okrToolId));
  }, []);

  function editObjective({ description, area }) {
    const formData = {
      description,
      area,
      horizon: okrData.horizon,
      keyResults: okrData.keyResults,
      projectId: okrData.projectId,
    };
    dispatch(onEditTool(okrToolId, formData));
    setIsEditOkrModalOpen(false);
  };

  function addKr({ description, frequency, responsible }) {
    const formData = {
      description,
      frequency: +(Object.entries(frequencyOptions).find((kv) => kv[1] === frequency)[0]),
      responsible,
      baseline: 0,
      goal: 0,
      priority: 0,
    };
    dispatch(onAddKeyResult(okrToolId, formData));
    setIsAddKrModalOpen(false);
  };

  return (
    <LayoutContainer>
      <Grid item sx={{ height: '100%', width: '100%' }}>
        <OKRView
          okrData={okrData}
          openEditOkrModal={() => setIsEditOkrModalOpen(true)}
          closeEditOkrModal={() => setIsEditOkrModalOpen(false)}
          isEditOkrModalOpen={isEditOkrModalOpen}
          editObjective={editObjective}
          openAddKrModal={() => setIsAddKrModalOpen(true)}
          closeAddKrModal={() => setIsAddKrModalOpen(false)}
          isAddKrModalOpen={isAddKrModalOpen}
          addKr={addKr}
        />
      </Grid>
      {loading && <Loading isModalMode message="Cargando OKR" />}
    </LayoutContainer>
  );
};

export default OKRContainer;
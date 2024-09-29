import React, { useEffect } from 'react';
import LayoutContainer from 'containers/LayoutContainer';
import { useParams } from 'react-router';
import OKRView from 'views/OKRView/indexv2';
import { Grid } from '@mui/material';
import {
  onAddKeyResult,
  onDeleteKeyResult,
  onEditKeyResult,
  onGetOneTool,
} from 'redux/actions/okr.actions';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Loading from 'components/commons/Loading';
import { frequencyOptions } from 'helpers/enums/okr';
import KeyResultModal from 'views/OKRView/components/KeyResult/indexv2';

const OKRContainer = () => {
  const { okrToolId, id } = useParams();
  const dispatch = useDispatch();
  const { loading, data: okrData } = useSelector((state) => state.okr);
  const [isAddKrModalOpen, setIsAddKrModalOpen] = useState(false);
  const [krToDelete, setKrToDelete] = useState(null);
  const [confirmDeleteError, setConfirmDeleteError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentKrForModal, setCurrentKrForModal] = useState({})
  useEffect(() => {
    dispatch(onGetOneTool(okrToolId));
  }, []);

  function addKr({ description, frequency, responsible, goal, priority, baseline }) {
    const formData = {
      description,
      frequency: +(Object.entries(frequencyOptions).find((kv) => kv[1] === frequency)[0]),
      responsible,
      baseline,
      goal,
      priority,
    };
    dispatch(onAddKeyResult(okrToolId, formData));
    setIsAddKrModalOpen(false);
  };
  
  function editKr({
    baseline,
    description,
    frequency,
    goal,
    keyStatus,
    priority,
    responsible,
    _id
  }) {
    handleCloseModal()
    const formData = {
      description,
      responsible,
      priority,
      baseline,
      goal,
      frequency,
      keyStatus,
    };
    dispatch(onEditKeyResult(okrToolId, _id, formData));
  };

  function deleteKr(keyResultId) {
    dispatch(onDeleteKeyResult(okrToolId, keyResultId));
  };

  function submitConfirmDeleteModal({ name }) {
    if (name !== krToDelete?.description) {
      setConfirmDeleteError('Nombre del Key Result incorrecto.');
      return;
    }
    deleteKr(krToDelete?._id);
    setConfirmDeleteError('');
    setKrToDelete(null);
  }

  const handleOpenModal = (event) => {
    setCurrentKrForModal(event)
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <LayoutContainer>
      <Grid item sx={{ height: '100%', width: '100%' }}>
        <OKRView
          okrData={okrData}
          openAddKrModal={() => setIsAddKrModalOpen(true)}
          closeAddKrModal={() => setIsAddKrModalOpen(false)}
          isAddKrModalOpen={isAddKrModalOpen}
          addKr={addKr}
          editKr={editKr}
          openConfirmDeleteModal={(kr) => setKrToDelete(kr)}
          closeConfirmDeleteModal={() => setKrToDelete(null)}
          isConfirmDeleteModalOpen={!!krToDelete}
          submitConfirmDeleteModal={submitConfirmDeleteModal}
          confirmDeleteModalError={confirmDeleteError}
          openKrEditModal={handleOpenModal}
        />
        <KeyResultModal onSubmit={editKr} data={currentKrForModal} isOpen={isModalOpen} onClose={handleCloseModal}></KeyResultModal>
      </Grid>
      {loading && <Loading isModalMode message="Cargando OKR" />}
    </LayoutContainer>
  );
};

export default OKRContainer;

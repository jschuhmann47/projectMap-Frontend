import React, { useEffect, useState } from 'react';
import LayoutContainer from 'containers/LayoutContainer';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import BalancedView from 'views/BalancedView/indexv2';
import {
  onAddObjective,
  onGetOne,
  onUpdateObjective,
  onDeleteObjective,
} from 'redux/actions/balanceScorecard.actions';
import {
  areaObjectivesSelector,
  titleSelector,
} from 'redux/selectors/balanced.selector';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuItem } from '@mui/material';
import { COLORS } from 'helpers/enums/colors';
import Comments from 'components/comments/Comments';
import Loading from 'components/commons/Loading';
import { frequencyOptions } from 'helpers/enums/balanced';
import { StageByTool, Tools } from 'helpers/enums/steps';

const BalancedContainer = () => {
  const { balancedId, id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const objectives = useSelector(areaObjectivesSelector);
  const { title, horizon } = useSelector(titleSelector);
  const { loading } = useSelector((state) => state.balanceScorecard);
  const [anchorElement, setAnchorElement] = useState(null);
  const [isAddObjModalOpen, setIsAddObjModalOpen] = useState(false);
  const [objToDelete, setObjToDelete] = useState(null);
  const [confirmDeleteError, setConfirmDeleteError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentObjForModal, setCurrentObjForModal] = useState({})

  useEffect(() => {
    dispatch(onGetOne(balancedId));
  }, []);

  const onSubmitObjective = (category, { action, frequency, responsible, goal, baseline, measure }) => {
    dispatch(
      onAddObjective(balancedId, {
        action,
        category,
        responsible,
        frequency: +(Object.entries(frequencyOptions).find((kv) => kv[1] === frequency)[0]),
        measure,
        goal,
        baseline,
        progress: 0,
      })
    );
    setIsAddObjModalOpen(false);
  };

  const onEditObjective = ({
    action,
    frequency,
    _id,
    responsible, 
    baseline, 
    goal, 
    checkpoints,
    measure,
    category,
  }) => {
    const formData = {
      action,
      frequency,
      responsible, 
      baseline, 
      goal, 
      checkpoints,
      measure,
      category,
    }
    dispatch(onUpdateObjective(balancedId, _id, formData));
    handleCloseModal();
  };

  function deleteObjective(objectiveId) {
    dispatch(onDeleteObjective(balancedId, objectiveId));
  }

  function submitConfirmDeleteModal({ name }) {
    if (name !== objToDelete?.action) {
      setConfirmDeleteError('Nombre del objetivo incorrecto.');
      return;
    }
    deleteObjective(objToDelete?._id);
    setConfirmDeleteError('');
    setObjToDelete(null);
  }

  const handleOpenModal = (event) => {
    setCurrentObjForModal(event)
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  const onClickResultsButtonGoBack = () => {
    const stage = StageByTool[Tools.BalacedScorecard];
    navigate(`/projects/${id}/stage/${stage}`)
  };
  
  return (
    <LayoutContainer>
      <BalancedView
        onSubmitObjective={onSubmitObjective}
        objectives={objectives}
        onEditObjective={onEditObjective}
        title={title}
        onClickButtonGoBack={onClickResultsButtonGoBack}
        isAddObjModalOpen={isAddObjModalOpen}
        openAddObjModal={()=> setIsAddObjModalOpen(true)}
        closeAddObjModal={() => setIsAddObjModalOpen(false)}
        horizon={horizon}
        openConfirmDeleteModal={setObjToDelete}
        closeConfirmDeleteModal={() => setObjToDelete(null)}
        isConfirmDeleteModalOpen={!!objToDelete}
        submitConfirmDeleteModal={submitConfirmDeleteModal}
        confirmDeleteModalError={confirmDeleteError}
        openObjEditModal={handleOpenModal}
        closeObjEditModal={handleCloseModal}
        isObjEditModalOpen={isModalOpen}
        currentObj={currentObjForModal}
      />
      <Menu
        anchorEl={anchorElement}
        onClose={() => setAnchorElement(null)}
        open={!!anchorElement}
        PaperProps={{
          style: {
            width: 500,
          },
        }}
        sx={{
          '& .MuiMenu-list': {
            background: COLORS.AthensGray,
          },
        }}
      >
        <MenuItem key={1} disableRipple>
          <Comments
            show
            tool="BALANCED_SCORECARD"
            toolId={balancedId}
            projectId={id}
          />
        </MenuItem>
      </Menu>
      {loading && <Loading isModalMode message="Cargando Balanced Scorecard" />}
    </LayoutContainer>
  );
};

export default BalancedContainer;

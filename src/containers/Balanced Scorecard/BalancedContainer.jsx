import React, { useEffect, useState } from 'react';
import LayoutContainer from 'containers/LayoutContainer';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import BalancedView from 'views/BalancedView';
import {
  onAddObjective,
  onGetOne,
  onUpdateObjective,
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
import { onGetAll as onGetAllComments } from 'redux/actions/comments.actions';
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(onGetOne(balancedId));
    dispatch(onGetAllComments('BALANCED_SCORECARD', balancedId));
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
    setIsModalOpen(false);
  };

  const onEditObjective = (objectiveId, formData) => {
    dispatch(onUpdateObjective(balancedId, objectiveId, formData));
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
        openComments={(target) => setAnchorElement(target)}
        isModalOpen={isModalOpen}
        openModal={() => setIsModalOpen(true)}
        closeModal={() => setIsModalOpen(false)}
        horizon={horizon}
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

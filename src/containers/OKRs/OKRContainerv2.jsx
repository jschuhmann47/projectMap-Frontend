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
import { okrToolSelector } from 'redux/selectors/okr.selector';
import { useNavigate } from 'react-router-dom';
import Loading from 'components/commons/Loading';

const OKRContainer = () => {
  const { okrToolId, id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, data: okrData } = useSelector((state) => state.okr);

  const [anchorElement, setAnchorElement] = useState(null);

  useEffect(() => {
    dispatch(onGetOneTool(okrToolId));
  }, []);

  return (
    <LayoutContainer>
      <Grid item sx={{ height: '100%', width: '100%' }}>
        <OKRView
          okrData={okrData}
        />
      </Grid>
      {loading && <Loading isModalMode message="Cargando OKR" />}
    </LayoutContainer>
  );
};

export default OKRContainer;

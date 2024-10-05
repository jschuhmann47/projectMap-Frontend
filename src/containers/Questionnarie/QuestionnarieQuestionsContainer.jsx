import Container from '@mui/system/Container/Container';
import { Menu } from 'components/inputs/SelectMenu/styles';
import LayoutContainer from 'containers/LayoutContainer';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { COLORS } from 'helpers/enums/colors';
import { MenuItem } from '@mui/material';
import Comments from 'components/comments/Comments';
import QuestionnaireQuestionsView from 'views/QuestionnaireQuestionsView';
import { useDispatch, useSelector } from 'react-redux';
import {
  onGetQuestions,
  onInsert,
  onGetOne,
} from 'redux/actions/questionnarie.actions';
import { initialValuesSelector } from 'redux/selectors/questionnaire.selector';
import Loading from 'components/commons/Loading';
import { onGetOne as onGetProject } from 'redux/actions/projects.actions';
import permission from 'helpers/permissions';

const QuestionnarieQuestionsContainer = () => {
  const { questionnaireId, id } = useParams();
  const navigate = useNavigate();
  const onClickButtonGoBack = () =>
    navigate(`/projects/${id}/questionnaire/${questionnaireId}`);
  const onClickNextButton = () =>
    navigate(`/projects/${id}/questionnaire/${questionnaireId}/results`);

  const [anchorElement, setAnchorElement] = useState(null);

  const data = useSelector((state) => {
    const data = state.questionnaire?.data || [];
    const dataList = [];
    Object.entries(data)?.map(([_key, value]) => dataList.push(value));
    return dataList;
  });

  const root = useSelector((state) => state);
  const userPermission = permission(root, 'transformationPlans');

  const loading = useSelector((state) => state.questionnaire.loading);
  const initialValues = useSelector(initialValuesSelector);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(onGetQuestions());
    dispatch(onGetOne(questionnaireId));
    dispatch(onGetProject(id));
  }, []);

  const handleSubmit = (formData) => {
    const submit = [];
    const formDataList = [];

    Object.entries(formData)?.forEach(([chapterId, chapter]) => {
      formDataList.push({ chapterId, chapter })
    });
    formDataList?.map(({ chapterId, chapter }) => {
      Object.entries(chapter)?.map(([questionId, question]) => {
        Object.entries(question)?.map(([question, answer]) => {
          const _chapter = data?.find(
            (x) => x.chapterId?.toString() === chapterId
          );
          const _question = _chapter?.questions?.find(
            (x) => x.questionId?.toString() === questionId
          );
          const answerId = _question?.answers?.find(
            (x) => x.answer === answer
          )?.answerId;

          if (chapterId && questionId && answerId)
            submit.push({
              chapterId: +chapterId,
              questionId: +questionId,
              answerId: +answerId,
            });
        });
      });
    });

    dispatch(onInsert(submit, questionnaireId));
    onClickNextButton();
  };

  return !loading ? (
    <>
      <LayoutContainer>
        <Container>
          <QuestionnaireQuestionsView
            title="Preguntas"
            onClickButtonGoBack={onClickButtonGoBack}
            onClickNextButton={onClickNextButton}
            openComments={(target) => setAnchorElement(target)}
            questions={data}
            handleSubmit={handleSubmit}
            initialValues={initialValues}
            userPermission={userPermission}
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
                tool="QUESTIONNAIRE"
                toolId={questionnaireId}
                projectId={id}
              />
            </MenuItem>
          </Menu>
        </Container>
      </LayoutContainer>
    </>
  ) : (
    <Loading isModalMode message="Cargando" />
  );
};

export default QuestionnarieQuestionsContainer;

import { createSelector } from 'reselect';

const getFodaLoading = (state) => state.foda.loading;
const getPestelLoading = (state) => state.pestel.loading;
const getPorterLoading = (state) => state.porter.loading;
const getAnsoffLoading = (state) => state.ansoff.loading;
const getMcKinseyLoading = (state) => state.mckinsey.loading;
const getOkrLoading = (state) => state.okr.loading;
const getBSLoading = (state) => state.balanceScorecard.loading;
const getQuestionnaireLoading = (state) => state.questionnaire.loading;

export const toolsLoadingSelector = createSelector(
  [getFodaLoading, getPestelLoading, getPorterLoading, getAnsoffLoading, getMcKinseyLoading, getOkrLoading, getBSLoading, getQuestionnaireLoading],
  (fodaLoading, pestelLoading, porterLoading, ansoffLoading, mcKinseyLoading, okrLoading, bsLoading, questionnaireLoading) =>
    fodaLoading || pestelLoading || porterLoading || mcKinseyLoading || okrLoading || bsLoading || questionnaireLoading
);

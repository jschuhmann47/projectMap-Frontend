import { Area } from 'helpers/enums/balanced';
import { createSelector } from 'reselect';

const getBalancedSelected = (state) => state.balanceScorecard.data;

export const areaObjectivesSelector = createSelector(
  [getBalancedSelected],
  (balanced) => {
    let objectivesPerArea = {};
    Object.values(Area)?.forEach((area) => {
      objectivesPerArea = {
        ...objectivesPerArea,
        [area]:
          balanced?.objectives?.filter(
            (objective) => objective.area === area
          ) || [],
      };
    });
    return objectivesPerArea;
  }
);

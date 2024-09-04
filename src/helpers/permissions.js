export default function permission(rootState, stepId) {
  const user = rootState.user.data;
  const projectInfo = rootState.projects.data;

  const hasFullPermissions =
    user?.isAdmin ||
    projectInfo?.coordinators.find((u) => u.email === user?.email)
  if (hasFullPermissions) return 'edit';

  const stepPermissions = projectInfo?.participants
    .find((u) => u.user.email === user?.email)?.stages;
  if (!stepPermissions) return 'hide';
  return stepPermissions.find((p) => p.id === stepId).permission;
}
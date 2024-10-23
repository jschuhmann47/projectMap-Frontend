import Loading from 'components/commons/Loading';
import ModalV2 from 'components/commons/ModalV2';
import LayoutContainer from 'containers/LayoutContainer';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { onCreate, onDelete, onGetAll } from 'redux/actions/projects.actions';
import { getUser } from 'redux/actions/user.actions';
import DashboardView from 'views/DashboardView';
import ProjectForm from 'views/DashboardView/ProjectForm';

const DashboardContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAddNewOpen, setAddNew] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 5;
  const debounceTime = 500;

  const { items, loading, total } = useSelector((state) => state.projects);
  const user = useSelector((state) => state.user.data);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProjects();
    }, debounceTime);

    return () => clearTimeout(delayDebounceFn);
  }, [dispatch, currentPage, searchText]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const fetchProjects = () => {
    const limit = projectsPerPage;
    const offset = (currentPage - 1) * projectsPerPage;

    dispatch(onGetAll({ limit, offset, search: searchText }));
  };

  const onSubmit = (formData) => {
    function randomHSLA() {
      return `hsla(${~~(360 * Math.random())}, 70%, 72%, 0.8)`;
    }
    const color = randomHSLA();

    dispatch(onCreate({ ...formData, color }));
    setAddNew(false);
  };

  const onClickProject = (projectId) => navigate(`/projects/${projectId}`);

  const onClickDelete = (id) => {
    dispatch(onDelete(id));
  };

  const isAdmin = user && user.isAdmin;

  const clearSearch = () => {
    setSearchText('');
    fetchProjects();
  };

  const onPageChange = (event, value) => {
    setCurrentPage(value);
  }

  return (
    <LayoutContainer>
      <DashboardView
        onAddNew={() => setAddNew(true)}
        onClickProject={onClickProject}
        items={items}
        onClickDelete={onClickDelete}
        isAdmin={isAdmin}
        searchText={searchText}
        onChangeSearchText={(e) => setSearchText(e.target.value)}
        onClearSearch={clearSearch}
        userId={user?._id}
        totalProjects={total}
        currentPage={currentPage}
        projectsPerPage={projectsPerPage}
        onPageChange={onPageChange}
      />
      <ModalV2 isOpen={isAddNewOpen} onClose={() => setAddNew(false)} title='Nuevo proyecto'>
        <ProjectForm onSubmit={onSubmit} />
      </ModalV2>
      {loading && <Loading isModalMode message="Cargando proyectos" />}
    </LayoutContainer>
  );
};

export default DashboardContainer;

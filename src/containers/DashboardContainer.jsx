import Loading from 'components/commons/Loading';
import Modal from 'components/commons/Modal';
import ModalV2 from 'components/commons/ModalV2';
import LayoutContainer from 'containers/LayoutContainer';
import { getRandomInt } from 'helpers/randomNumber';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { onCreate, onDelete, onGetAll, onSearch } from 'redux/actions/projects.actions';
import { getUser } from 'redux/actions/user.actions';
import DashboardView from 'views/DashboardView';
import ProjectForm from 'views/DashboardView/ProjectForm';

const DashboardContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAddNewOpen, setAddNew] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { items, loading } = useSelector((state) => state.projects);
  const user = useSelector((state) => state.user.data);

  useEffect(() => {
    dispatch(onGetAll());
    dispatch(getUser());
  }, [dispatch]);

  const onSubmit = (formData) => {
    function randomHSLA() {
      return `hsla(${~~(360 * Math.random())}, 70%,  72%, 0.8)`;
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

  function search() {
    dispatch(onSearch(searchText));
  }

  function clearSearch() {
    setSearchText("");
    dispatch(onGetAll());
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
        onSearch={search}
        onClearSearch={clearSearch}
        userId={user?._id}
      />
      <ModalV2 isOpen={isAddNewOpen} onClose={() => setAddNew(false)} title='Nuevo proyecto'>
        <ProjectForm onSubmit={onSubmit} />
      </ModalV2>
      {loading && <Loading isModalMode message="Cargando proyectos" />}
    </LayoutContainer>
  );
};

export default DashboardContainer;

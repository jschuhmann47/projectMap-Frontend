import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { onGetOne } from "redux/actions/pdca.actions";

export default function PdcaContainer() {
  const { id, pdcaId } = useParams()
  const dispatch = useDispatch()
  const { loading, data } = useSelector((state) => state.pdca)

  useEffect(() => {
    dispatch(onGetOne(pdcaId))
  }, [])

  return <span>{loading ? 'Cargando' : data.name}</span>
}
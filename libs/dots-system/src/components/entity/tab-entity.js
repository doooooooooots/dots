import { isEmpty } from 'lodash';
import InputRelationWithFetch from './input/input-relationship-with-fetch';
import Entity from '../entity/entity';

const TabEntity = (props) => {
  const {
    select,
    query,
    value,
    where,
    take = 10,
    skip = 0,
    onChange,
    onLoadSuccess,
    onUpdateSuccess,
  } = props;

  // const [entity, setEntity] = useState(value);

  // const handleChange = useCallback((data) => {
  //   setEntity(data);
  // }, []);

  return isEmpty(value) ? (
    <InputRelationWithFetch
      options={select}
      onChange={onChange}
      where={where}
      take={take}
      skip={skip}
      placeholder="Rechercher ..."
    />
  ) : (
    <Entity
      select={select}
      where={{ id: value.id }}
      query={query}
      onLoadSuccess={onLoadSuccess}
      onUpdateSuccess={onUpdateSuccess}
    />
  );
};

export default TabEntity;

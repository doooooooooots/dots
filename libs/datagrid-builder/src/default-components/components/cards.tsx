import { isEmpty } from 'lodash';

function Cards(props) {
  const { rows } = props;

  if (isEmpty(rows)) return null;

  return (
    <>
      {rows.map((item) => {
        return <code key={item.id}>{JSON.stringify(item)}</code>;
      })}
    </>
  );
}

export default Cards;

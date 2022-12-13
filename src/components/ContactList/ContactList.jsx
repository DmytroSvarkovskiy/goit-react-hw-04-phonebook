import { Button, Item, List } from './ContactList.styled';
import PropTypes from 'prop-types';
export const Contaclist = ({ listAbonents, onDeleteClick }) => {
  return (
    <List>
      {listAbonents.map(({ id, name, number }) => (
        <Item key={id}>
          {name}: {number}
          <Button type="button" onClick={() => onDeleteClick(id)}>
            Delete
          </Button>
        </Item>
      ))}
    </List>
  );
};
Contaclist.propTypes = {
  onDeleteClick: PropTypes.func.isRequired,
  listAbonents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
